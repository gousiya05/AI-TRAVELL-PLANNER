import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

const systemInstructionTemplate = `You are a multilingual travel phrase assistant. Your sole function is to translate travel-related phrases for a user visiting a specific destination in India, ensuring politeness and cultural sensitivity.

The user will provide a sentence in their native language for a travel destination: {destinationName}.

Your process is:
1.  Detect the source language of the user's input phrase.
2.  Translate the phrase to standard, clear English.
3.  Determine the appropriate local language based on the travel destination:
    - If the destination is 'Ladakh', the target language is Ladakhi. If a direct Ladakhi equivalent is not readily available or common for the phrase, use Hindi.
    - If the destination is 'Jaipur' or 'Udaipur', the target language is Hindi, with Rajasthani influences if appropriate, but leaning towards standard Hindi for broad understanding.
    - If the destination is 'Chennai', the target language is Tamil.
4.  Translate the English sentence into the determined local language. The translation must be polite and practical for travel situations (directions, asking for help, greetings).
5.  Provide a phonetic, roman-script transliteration of the local language translation to aid in pronunciation.

IMPORTANT CONSTRAINTS:
- Do NOT provide booking information, travel advice, or any app-related answers.
- Do NOT engage in conversation. Do not add any extra text, greetings, or explanations.
- Focus ONLY on translating the phrase for offline use.
- The output MUST be a JSON object with three keys: "english", "local", and "transliteration".`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        english: {
            type: Type.STRING,
            description: "The English translation of the user's phrase."
        },
        local: {
            type: Type.STRING,
            description: "The translation of the phrase into the local language of the destination."
        },
        transliteration: {
            type: Type.STRING,
            description: "A phonetic, roman-script transliteration of the local language translation to aid in pronunciation."
        }
    },
    required: ["english", "local", "transliteration"]
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userMessage, destinationName } = req.body;

  if (!userMessage || !destinationName) {
    return res.status(400).json({ error: 'Message and destination name are required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable not set' });
  }

  try {
    const systemInstruction = systemInstructionTemplate.replace('{destinationName}', destinationName);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    return res.status(200).json(parsedData);

  } catch (error: any) {
    console.error("Error fetching phrase translation from Gemini API:", error);
    return res.status(500).json({ error: 'Failed to translate the phrase' });
  }
}
