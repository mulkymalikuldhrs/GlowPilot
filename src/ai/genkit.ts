
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Returns a function that retrieves a random API key from a comma-separated environment variable.
 * This ensures dynamic key rotation on each request.
 */
const getApiKey = (envVar: string): (() => string) => {
  return () => {
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
      // The apiKey property accepts a function for dynamic key rotation.
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      // NVIDIA NIM integration via OpenAI plugin
      // Cast as any to support dynamic key retrieval function if types are restrictive
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
