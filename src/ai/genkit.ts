
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Retrieves an API key from an environment variable.
 * Supports comma-separated keys for basic rotation.
 *
 * @param envVar The name of the environment variable (e.g., 'NVIDIA_API_KEY').
 * @returns A single API key string.
 */
const getApiKey = (envVar: string): string => {
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
      apiKey: () => getApiKey('GEMINI_API_KEY'),
    } as any),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
    } as any),
  ],
});
