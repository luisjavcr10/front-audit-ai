
import {
    TranslateClient,
    TranslateTextCommand,
    TranslateTextCommandOutput,
  } from "@aws-sdk/client-translate";
  
  //AZURE
  const key_translator =
    process.env.NEXT_PUBLIC_AZURE_ACCESS_KEY! 
  interface TranslationResult {
    translations: Array<{ text: string; to: string }>;
  }
  
  // AWS 
  const translateClient = new TranslateClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-2",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
  });
  
  
  //AZURE
  export async function translateText(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
    const route = `/translate?api-version=3.0&to=${targetLanguage}`;
    const subscriptionKey = key_translator;
  
    try {
      const response = await fetch(`${endpoint}${route}`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Region": "eastus",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Content-Type": "application/json",
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
  
  // AWS - Versión corregida
  export async function translateTextAws(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    try {
      const command = new TranslateTextCommand({
        Text: text,
        SourceLanguageCode: "auto",
        TargetLanguageCode: targetLanguage,
      });
  
      const response: TranslateTextCommandOutput = await translateClient.send(
        command
      );
  
      // Asegura que TranslatedText nunca sea undefined
      if (!response.TranslatedText) {
        throw new Error("AWS Translate returned undefined text");
      }
  
      return response.TranslatedText;
    } catch (error) {
      console.error("Error en traducción (AWS):", error);
      return text;
    }
  }