interface TranslationResult {
    translations: Array<{ text: string; to: string }>;
}

export async function translateText(text: string, targetLanguage: string): Promise<string> {
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
    const route = `/translate?api-version=3.0&to=${targetLanguage}`;
    const subscriptionKey = "1CXeNzicnRMFzutJ5BSHKDF5CmQwS0uwxQK3HtfOi0XK2jxrvlwZJQQJ99BEACYeBjFXJ3w3AAAbACOGHICJ";

    try {
        const response = await fetch(`${endpoint}${route}`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Region': 'eastus',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ Text: text }]),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: TranslationResult[] = await response.json();
        return data[0].translations[0].text;
    } catch (error) {
        console.error("Error en traducción:", error);
        return text; 
    }
}
