
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

/**
 * A higher-order function that returns a function to retrieve a random API key
 * from a comma-separated list in the specified environment variable.
 */
const getApiKey = (envVarName: string) => {
  return () => {
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
};

export const ai = genkit({
  plugins: [
    googleAI({
      // The apiKey property now accepts a function that will be called
      // on each request, allowing for dynamic key rotation.
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      // Configure NVIDIA NIM integration via OpenAI-compatible plugin
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
