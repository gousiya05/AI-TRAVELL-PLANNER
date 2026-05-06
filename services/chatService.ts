// In-memory cache for phrase translations
const phraseTranslationCache = new Map<string, { english: string; local: string; transliteration: string; }>();

export const getPhraseTranslation = async (userMessage: string, destinationName: string): Promise<{ english: string; local: string; transliteration: string; }> => {
  // Check cache first
  const cacheKey = `${destinationName.toLowerCase()}:${userMessage.toLowerCase()}`;
  if (phraseTranslationCache.has(cacheKey)) {
    console.log(`Returning cached translation for "${userMessage}" in ${destinationName}`);
    return phraseTranslationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage, destinationName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to translate');
    }

    const parsedData = await response.json();

    // Store result in cache before returning
    phraseTranslationCache.set(cacheKey, parsedData);

    return parsedData;

  } catch (error: any) {
    console.error("Error fetching phrase translation:", error);
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
        throw new Error("We're experiencing high traffic. Please try again in a few moments.");
    }
    throw new Error(error.message || "Failed to translate the phrase. Please try again.");
  }
};
