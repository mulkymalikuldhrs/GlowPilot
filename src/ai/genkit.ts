
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Higher-order function that returns a function to get a random API key from a list.
 * This is used for dynamic key rotation in Genkit plugins.
 *
 * @param envVarName The name of the environment variable containing comma-separated API keys.
 * @returns A function that returns a random API key from the list.
 */
const getApiKey = (envVarName: string) => {
  return (): string => {
    const apiKeys = process.env[envVarName]?.split(',').filter(k => k.trim()) || [];

    if (apiKeys.length === 0) {
      // This will throw an error only when an actual API call is attempted without keys.
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
      // The apiKey property accepts a function that will be called
      // on each request, allowing for dynamic key rotation.
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
