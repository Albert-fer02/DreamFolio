'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VectorSearch } from '../../../lib/vector/search';
import { OptimizedImage } from '../ui/optimized-image';
import { Search, Filter, Grid, List } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: number;
  featured: boolean;
}

interface PortfolioSectionProps {
  searchQuery?: string;
  category?: string;
  userId?: string;
}

/**
 * Portfolio Section Micro-Frontend Component
 * Exposed via Module Federation for independent deployment
 */
export default function PortfolioSection({
  searchQuery = '',
  category = 'all',
  userId
}: PortfolioSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState(category);

  // Initialize vector search
  const vectorSearch = new VectorSearch();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Mock project data (would come from Supabase in production)
        const mockProjects: Project[] = [
          {
            id: '1',
            title: 'AI-Powered Analytics Dashboard',
            description: 'Real-time analytics platform with machine learning insights and predictive modeling.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            tags: ['React', 'Python', 'Machine Learning', 'Analytics'],
            category: 'web',
            year: 2024,
            featured: true,
          },
          {
            id: '2',
            title: 'Blockchain Voting System',
            description: 'Secure, transparent voting platform built on Ethereum with zero-knowledge proofs.',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
            tags: ['Solidity', 'Web3', 'Security', 'Ethereum'],
            category: 'blockchain',
            year: 2024,
            featured: true,
          },
          {
            id: '3',
            title: 'IoT Smart Home Hub',
            description: 'Centralized control system for smart home devices with AI automation and energy optimization.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
            tags: ['IoT', 'React Native', 'Node.js', 'AI'],
            category: 'mobile',
            year: 2023,
            featured: false,
          },
          {
            id: '4',
            title: 'Cybersecurity Training Platform',
            description: 'Interactive learning platform for cybersecurity professionals with hands-on simulations.',
            image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
            tags: ['Vue.js', 'Cybersecurity', 'Education', 'Docker'],
            category: 'web',
            year: 2023,
            featured: true,
          },
        ];

        setProjects(mockProjects);
        setFilteredProjects(mockProjects);

        // Index projects for vector search
        for (const project of mockProjects) {
          await vectorSearch.indexContent({
            id: project.id,
            section: 'portfolio',
            title: project.title,
            content: project.description,
            tags: project.tags,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }

      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const results = await vectorSearch.semanticSearch(searchQuery, {
          limit: 10,
          useQueryExpansion: true,
        });

        setSearchResults(results);

        // Log search for analytics
        await vectorSearch.logSearch(searchQuery, results, userId);

      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    };

    performSearch();
  }, [searchQuery, userId]);

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Search results filter
    if (searchResults.length > 0) {
      const resultIds = searchResults.map(r => r.content.id);
      filtered = filtered.filter(project => resultIds.includes(project.id));
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchResults]);

  const categories = ['all', 'web', 'mobile', 'blockchain', 'ai'];

  if (loading) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-700 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-800 rounded-lg p-6">
                  <div className="h-48 bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-slate-700 rounded w-16"></div>
                    <div className="h-6 bg-slate-700 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest work in web development, blockchain, AI, and innovative technologies.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              layout
              className={`bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Project Image */}
              <div className={viewMode === 'list' ? 'w-1/3' : 'relative h-48'}>
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  width={viewMode === 'list' ? 300 : 400}
                  height={viewMode === 'list' ? 200 : 300}
                  className="w-full h-full object-cover"
                  enableWebAssembly={true}
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700 text-gray-400 rounded text-sm">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Year */}
                <div className="text-sm text-gray-400">{project.year}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-lg mb-4">No projects found</div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchResults([]);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Export for Module Federation
export { PortfolioSection };