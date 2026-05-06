import { GoogleGenAI, Type } from "@google/genai";
import { AIGeneratedDetails } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// In-memory cache for destination details
const destinationDetailsCache = new Map<string, AIGeneratedDetails>();

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A captivating and detailed description of the travel destination, highlighting its main appeal in about 80-100 words."
    },
    highlights: {
      type: Type.ARRAY,
      description: "A list of 3-4 key attractions or highlights of the destination.",
      items: { type: Type.STRING }
    },
    travelTips: {
      type: Type.ARRAY,
      description: "A list of 3-4 essential travel tips for visitors.",
      items: { type: Type.STRING }
    },
    weatherInfo: {
      type: Type.STRING,
      description: "A summary of the typical weather and the best time to visit."
    },
    threeDayItinerary: {
      type: Type.ARRAY,
      description: "A sample 3-day itinerary with a title and activities for each day.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number (1, 2, or 3)." },
          title: { type: Type.STRING, description: "A catchy title for the day's plan." },
          activities: { type: Type.STRING, description: "A summary of the activities for the day." },
        },
        required: ["day", "title", "activities"]
      }
    },
    localFoods: {
      type: Type.ARRAY,
      description: "A list of 3-4 must-try local foods or dishes.",
      items: { type: Type.STRING }
    },
    culturalFacts: {
      type: Type.ARRAY,
      description: "A list of 2-3 interesting cultural facts about the destination.",
      items: { type: Type.STRING }
    }
  },
  required: ["description", "highlights", "travelTips", "weatherInfo", "threeDayItinerary", "localFoods", "culturalFacts"]
};


export const fetchDestinationDetails = async (destinationName: string): Promise<AIGeneratedDetails> => {
  // Check cache first
  const cacheKey = destinationName.toLowerCase();
  if (destinationDetailsCache.has(cacheKey)) {
    console.log(`Returning cached details for ${destinationName}`);
    return destinationDetailsCache.get(cacheKey)!;
  }

  try {
    const prompt = `Generate a comprehensive travel guide for a tourist visiting ${destinationName}, India. Provide a detailed description, key highlights, practical travel tips, weather information, a sample 3-day itinerary, must-try local foods, and interesting cultural facts.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Store result in cache before returning
    destinationDetailsCache.set(cacheKey, parsedData);

    return parsedData as AIGeneratedDetails;

  } catch (error) {
    console.error("Error fetching destination details from Gemini API:", error);
    if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
        throw new Error("We're experiencing high traffic and have exceeded our API quota. Please try again in a few moments.");
    }
    throw new Error("Failed to generate travel information. Please try again.");
  }
};
