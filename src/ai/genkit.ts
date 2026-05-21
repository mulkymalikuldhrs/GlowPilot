
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Function to get a random API key from the list for a given environment variable.
 * Supports dynamic key rotation by splitting comma-separated environment variables.
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
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
      models: [
        { name: 'nvidia/llama-3.1-nemotron-70b-instruct' },
        { name: 'meta/llama-3.2-90b-vision-instruct' },
      ],
    } as any),
  ],
});
