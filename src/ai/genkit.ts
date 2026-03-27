
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAI } from 'genkitx-openai';

/**
 * Function to get a random API key from a list of keys stored in an environment variable.
 * Returns a function that returns a single API key string.
 */
const getApiKey = (envVar: string) => {
  return () => {
    // Read the environment variable every time the function is called.
    const apiKeys = process.env[envVar]?.split(',').filter(k => k.trim()) || [];

    if (apiKeys.length === 0) {
      // This will throw an error only when an actual API call is attempted without keys.
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
      // Cast as any because the type definition might only expect a string,
      // but Genkit plugins often support a function for dynamic key retrieval.
      apiKey: getApiKey('GEMINI_API_KEY') as any,
    }),
    openAI({
      apiKey: getApiKey('NVIDIA_API_KEY') as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
