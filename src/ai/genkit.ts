
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Utility to get a random API key from a comma-separated list in an environment variable.
 * @param envVar The name of the environment variable (e.g., 'NVIDIA_API_KEY').
 * @returns A single API key string.
 */
export const getApiKey = (envVar: string): string => {
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
      // Pass as a string to satisfy TypeScript validation in this project.
      apiKey: getApiKey('GEMINI_API_KEY'),
    }),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: getApiKey('NVIDIA_API_KEY'),
    }),
  ],
});
