
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Function to get an API key from a comma-separated list in an environment variable.
 * Supports basic key rotation by returning a random key from the list.
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
      // Provide a function for dynamic key rotation
      apiKey: () => getApiKey('GEMINI_API_KEY'),
    }),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      // Provide a function for dynamic key rotation
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
    }),
  ],
});
