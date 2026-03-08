
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Utility function to retrieve an API key from an environment variable.
 * Supports comma-separated keys for dynamic rotation.
 *
 * @param envVar The name of the environment variable (e.g., 'GEMINI_API_KEY', 'NVIDIA_API_KEY').
 * @returns A function that returns a randomly selected API key from the available pool.
 */
const getApiKey = (envVar: string) => {
  return (): string => {
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
};

export const ai = genkit({
  plugins: [
    googleAI({
      // Dynamic key rotation for Google AI
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      // NVIDIA NIM integration using the OpenAI-compatible plugin
      apiKey: getApiKey('NVIDIA_API_KEY') as any, // Cast to any to support dynamic key function if types are strict
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
