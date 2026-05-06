import { AIGeneratedDetails } from '../types';

// In-memory cache for destination details
const destinationDetailsCache = new Map<string, AIGeneratedDetails>();

export const fetchDestinationDetails = async (destinationName: string): Promise<AIGeneratedDetails> => {
  // Check cache first
  const cacheKey = destinationName.toLowerCase();
  if (destinationDetailsCache.has(cacheKey)) {
    console.log(`Returning cached details for ${destinationName}`);
    return destinationDetailsCache.get(cacheKey)!;
  }

  try {
    const response = await fetch('/api/destination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinationName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch details');
    }

    const parsedData = await response.json();
    
    // Store result in cache before returning
    destinationDetailsCache.set(cacheKey, parsedData);

    return parsedData as AIGeneratedDetails;

  } catch (error: any) {
    console.error("Error fetching destination details:", error);
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
        throw new Error("We're experiencing high traffic. Please try again in a few moments.");
    }
    throw new Error(error.message || "Failed to generate travel information. Please try again.");
  }
};
