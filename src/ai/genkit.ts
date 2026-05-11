
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Function to get a random API key from the list provided in environment variables.
 * Supports dynamic key rotation by splitting comma-separated strings.
 *
 * @param envVarName The name of the environment variable (e.g., 'GEMINI_API_KEY' or 'NVIDIA_API_KEY')
 * @returns A single API key string
 */
export const getApiKey = (envVarName: string): string => {
  const apiKeys = process.env[envVarName]?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    throw new Error(`${envVarName} environment variable is not set or empty.`);
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
      apiKey: () => getApiKey('GEMINI_API_KEY'),
    } as any),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
    } as any),
  ],
});
