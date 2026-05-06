
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

// Function to get a random API key from the list
export const getApiKey = (envVarName: string): string => {
  // Read the environment variable every time the function is called.
  const apiKeys = process.env[envVarName]?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    // This will now throw an error only when an actual API call is attempted without keys.
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
      // The apiKey property now accepts a function that will be called
      // on each request, allowing for dynamic key rotation.
      apiKey: () => getApiKey('GEMINI_API_KEY'),
    } as any),
    openAI({
      apiKey: () => getApiKey('NVIDIA_API_KEY'),
      baseURL: 'https://integrate.api.nvidia.com/v1',
    } as any),
  ],
});
