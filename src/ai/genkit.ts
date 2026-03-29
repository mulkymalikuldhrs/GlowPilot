
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Returns a function that retrieves a random API key from a comma-separated environment variable.
 * This allows for dynamic key rotation on each request.
 *
 * @param envVar The name of the environment variable containing the API key(s).
 */
const getApiKey = (envVar: string) => (): string => {
  const apiKeys = process.env[envVar]?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    throw new Error(`${envVar} environment variable is not set or empty.`);
  }

  if (apiKeys.length === 1) {
    return apiKeys[0];
  }
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};

export const ai = genkit({
  plugins: [
    googleAI({
      // @ts-ignore - Genkit types might only expect string, but runtime supports function
      apiKey: getApiKey('GEMINI_API_KEY'),
    }),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      // NVIDIA NIM requires casting as any because the plugin's TS definition
      // might strictly expect a string, but the plugin supports dynamic retrieval.
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
    }),
  ],
});
