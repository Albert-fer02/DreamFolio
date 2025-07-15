"use server";

import {
  suggestPortfolioUpdates,
  type SuggestPortfolioUpdatesInput,
} from "@/ai/flows/suggest-portfolio-updates";

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
