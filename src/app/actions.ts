"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  suggestPortfolioUpdates,
  type SuggestPortfolioUpdatesInput,
} from "@/ai/flows/suggest-portfolio-updates";
import { supabase } from 'lib/supabase/config';

// Schema for portfolio updates
const portfolioUpdateSchema = z.object({
  id: z.string().optional(),
  section: z.string().min(1, 'Section is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  version: z.number().default(1),
  tags: z.array(z.string()).optional(),
});

// Server Action for updating portfolio content
export async function updatePortfolio(formData: FormData) {
  try {
    // Parse form data
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = portfolioUpdateSchema.parse(rawData);

    // TODO: Add authentication check here
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.role === 'admin') {
    //   throw new Error('Unauthorized');
    // }

    // Update portfolio in Supabase
    const { data, error } = await supabase
      .from('portfolio_content')
      .upsert({
        section: validatedData.section,
        title: validatedData.title,
        content: validatedData.content,
        version: validatedData.version,
        tags: validatedData.tags || [],
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'section'
      });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to update portfolio');
    }

    // Revalidate the portfolio page cache
    revalidatePath('/portfolio');
    revalidatePath('/');

    return {
      success: true,
      message: `Portfolio section '${validatedData.section}' updated successfully`,
      data: validatedData
    };

  } catch (error) {
    console.error('Portfolio update error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error.errors
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Server Action for getting portfolio suggestions
export async function getPortfolioSuggestions(
  input: SuggestPortfolioUpdatesInput
) {
  try {
    const result = await suggestPortfolioUpdates(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get suggestions." };
  }
}
