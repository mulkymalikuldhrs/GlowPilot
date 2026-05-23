import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Function to get a random API key from the list for a given environment variable.
 * Enables dynamic key rotation across requests.
 */
const getApiKey = (envVarName: string): string => {
  const apiKeys = process.env[envVarName]?.split(',').filter((k) => k.trim()) || [];

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
      apiKey: () => getApiKey('GEMINI_API_KEY'),
    } as any),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
      models: [
        {
          name: 'nvidia/llama-3.1-nemotron-70b-instruct',
          label: 'NVIDIA Llama 3.1 Nemotron 70B Instruct',
        },
        {
          name: 'meta/llama-3.2-90b-vision-instruct',
          label: 'NVIDIA Meta Llama 3.2 90B Vision Instruct',
          supports: { multimodal: true },
        },
      ],
    } as any),
  ],
});
