
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * Higher-order function to get an API key retrieval function for Genkit plugins.
 * Supports comma-separated API keys in environment variables for dynamic rotation.
 *
 * @param envVarName - The name of the environment variable (e.g., 'GEMINI_API_KEY', 'NVIDIA_API_KEY').
 * @returns A function that returns a random API key from the list.
 */
const getApiKey = (envVarName: string) => {
  return (): string => {
    const apiKeys = process.env[envVarName]?.split(',').filter(k => k.trim()) || [];

    if (apiKeys.length === 0) {
      // Return empty string if no keys are found
      return '';
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
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
