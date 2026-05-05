
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Gets a random API key from a comma-separated environment variable.
 * This enables dynamic key rotation across requests.
 *
 * @param keyName The name of the environment variable (e.g., 'GEMINI_API_KEY' or 'NVIDIA_API_KEY').
 * @returns A single API key string.
 */
const getApiKey = (keyName: string): string => {
  const apiKeys = process.env[keyName]?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    throw new Error(`${keyName} environment variable is not set or empty.`);
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
      // Provide apiKey as a function for dynamic key rotation
      apiKey: (() => getApiKey('GEMINI_API_KEY')) as any,
    }),
    openAI({
      // NVIDIA NIM integration using genkitx-openai
      apiKey: (() => getApiKey('NVIDIA_API_KEY')) as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    } as any),
  ],
});
