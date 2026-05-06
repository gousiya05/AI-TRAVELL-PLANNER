import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { destinationName } = req.body;

  if (!destinationName) {
    return res.status(400).json({ error: 'Destination name is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable not set' });
  }

  try {
    const prompt = `Generate a comprehensive travel guide for a tourist visiting ${destinationName}, India. Provide a detailed description, key highlights, practical travel tips, weather information, a sample 3-day itinerary, must-try local foods, and interesting cultural facts.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Using 2.0 flash as it's stable and fast
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    return res.status(200).json(parsedData);

  } catch (error: any) {
    console.error("Error fetching destination details from Gemini API:", error);
    return res.status(500).json({ error: 'Failed to generate travel information' });
  }
}
