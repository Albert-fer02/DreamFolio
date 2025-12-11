/**
 * Vector Search Implementation
 * Provides semantic search capabilities using Supabase pgvector
 */

import { supabase } from '../supabase/config';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';

export interface PortfolioContent {
  id: string;
  section: string;
  title: string;
  content: string;
  tags: string[];
  embedding?: number[];
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  content: PortfolioContent;
  similarity: number;
  metadata: any;
}

/**
 * Vector Search Class for Semantic Search
 */
export class VectorSearch {
  private supabase = supabase;
  private embeddings: OpenAIEmbeddings;
  private llm: OpenAI;

  constructor() {
    // Initialize OpenAI embeddings
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small', // More efficient for search
    });

    // Initialize OpenAI LLM for query enhancement
    this.llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.1,
    });
  }

  /**
   * Index content by generating embeddings and storing in Supabase
   */
  async indexContent(content: PortfolioContent): Promise<void> {
    try {
      // Generate embedding for the content
      const textToEmbed = `${content.title} ${content.content} ${content.tags.join(' ')}`;
      const embedding = await this.embeddings.embedQuery(textToEmbed);

      // Store in Supabase with vector extension
      const { error } = await this.supabase
        .from('portfolio_embeddings')
        .upsert({
          content_id: content.id,
          section: content.section,
          title: content.title,
          content: content.content,
          tags: content.tags,
          embedding: embedding,
          metadata: {
            wordCount: content.content.split(' ').length,
            tagCount: content.tags.length,
            section: content.section,
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'content_id'
        });

      if (error) {
        console.error('Error indexing content:', error);
        throw error;
      }

      console.log(`Indexed content: ${content.title}`);
    } catch (error) {
      console.error('Failed to index content:', error);
      throw error;
    }
  }

  /**
   * Perform semantic search
   */
  async semanticSearch(
    query: string,
    options: {
      limit?: number;
      threshold?: number;
      section?: string;
      tags?: string[];
      useQueryExpansion?: boolean;
    } = {}
  ): Promise<SearchResult[]> {
    const {
      limit = 5,
      threshold = 0.7,
      section,
      tags,
      useQueryExpansion = true,
    } = options;

    try {
      // Enhance query with AI if enabled
      let searchQuery = query;
      if (useQueryExpansion) {
        searchQuery = await this.expandQuery(query);
      }

      // Generate embedding for the search query
      const queryEmbedding = await this.embeddings.embedQuery(searchQuery);

      // Build the search query with filters
      let searchQueryBuilder = this.supabase.rpc('similar_projects', {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit,
      });

      // Apply section filter if specified
      if (section) {
        searchQueryBuilder = searchQueryBuilder.eq('section', section);
      }

      // Apply tag filter if specified
      if (tags && tags.length > 0) {
        searchQueryBuilder = searchQueryBuilder.contains('tags', tags);
      }

      const { data, error } = await searchQueryBuilder;

      if (error) {
        console.error('Error performing semantic search:', error);
        throw error;
      }

      // Transform results
      const results: SearchResult[] = data.map((item: any) => ({
        content: {
          id: item.content_id,
          section: item.section,
          title: item.title,
          content: item.content,
          tags: item.tags,
          created_at: item.created_at,
          updated_at: item.updated_at,
        },
        similarity: item.similarity,
        metadata: item.metadata,
      }));

      return results;

    } catch (error) {
      console.error('Semantic search failed:', error);
      throw error;
    }
  }

  /**
   * Expand search query using AI for better results
   */
  private async expandQuery(originalQuery: string): Promise<string> {
    try {
      const prompt = `
        Expand this search query for a portfolio website to include related terms and concepts.
        Original query: "${originalQuery}"

        Provide an expanded query that includes synonyms, related technologies, and broader concepts.
        Keep it concise but comprehensive. Return only the expanded query text.
      `;

      const response = await this.llm.call(prompt);
      return response.trim();
    } catch (error) {
      console.warn('Query expansion failed, using original query:', error);
      return originalQuery;
    }
  }

  /**
   * Find similar content
   */
  async findSimilar(
    contentId: string,
    limit: number = 5
  ): Promise<SearchResult[]> {
    try {
      // Get the embedding for the source content
      const { data: sourceData, error: fetchError } = await this.supabase
        .from('portfolio_embeddings')
        .select('embedding')
        .eq('content_id', contentId)
        .single();

      if (fetchError || !sourceData) {
        throw new Error('Source content not found');
      }

      // Search for similar content
      const { data, error } = await this.supabase.rpc('similar_projects', {
        query_embedding: sourceData.embedding,
        match_threshold: 0.6,
        match_count: limit + 1, // +1 to exclude the source itself
      });

      if (error) {
        throw error;
      }

      // Filter out the source content and transform results
      const results: SearchResult[] = data
        .filter((item: any) => item.content_id !== contentId)
        .slice(0, limit)
        .map((item: any) => ({
          content: {
            id: item.content_id,
            section: item.section,
            title: item.title,
            content: item.content,
            tags: item.tags,
            created_at: item.created_at,
            updated_at: item.updated_at,
          },
          similarity: item.similarity,
          metadata: item.metadata,
        }));

      return results;

    } catch (error) {
      console.error('Find similar failed:', error);
      throw error;
    }
  }

  /**
   * Get search analytics
   */
  async getSearchAnalytics(timeframe: 'day' | 'week' | 'month' = 'week'): Promise<{
    totalSearches: number;
    popularQueries: Array<{ query: string; count: number }>;
    averageResults: number;
    topSections: Array<{ section: string; searches: number }>;
  }> {
    try {
      const now = new Date();
      const timeframeMap = {
        day: 1,
        week: 7,
        month: 30,
      };

      const startDate = new Date(now.getTime() - (timeframeMap[timeframe] * 24 * 60 * 60 * 1000));

      const { data, error } = await this.supabase
        .from('search_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString());

      if (error) {
        throw error;
      }

      // Process analytics data
      const totalSearches = data.length;
      const queryCounts: Record<string, number> = {};
      const sectionCounts: Record<string, number> = {};
      let totalResults = 0;

      data.forEach((item: any) => {
        // Count queries
        queryCounts[item.query] = (queryCounts[item.query] || 0) + 1;

        // Count sections
        if (item.top_result_section) {
          sectionCounts[item.top_result_section] = (sectionCounts[item.top_result_section] || 0) + 1;
        }

        // Sum results
        totalResults += item.result_count || 0;
      });

      const popularQueries = Object.entries(queryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([query, count]) => ({ query, count }));

      const topSections = Object.entries(sectionCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([section, searches]) => ({ section, searches }));

      return {
        totalSearches,
        popularQueries,
        averageResults: totalSearches > 0 ? totalResults / totalSearches : 0,
        topSections,
      };

    } catch (error) {
      console.error('Search analytics failed:', error);
      throw error;
    }
  }

  /**
   * Log search query for analytics
   */
  async logSearch(
    query: string,
    results: SearchResult[],
    userId?: string
  ): Promise<void> {
    try {
      await this.supabase
        .from('search_analytics')
        .insert({
          query,
          result_count: results.length,
          top_result_section: results[0]?.content.section,
          user_id: userId,
          created_at: new Date().toISOString(),
        });
    } catch (error) {
      console.warn('Failed to log search:', error);
      // Don't throw - logging failure shouldn't break search
    }
  }
}

export default VectorSearch;