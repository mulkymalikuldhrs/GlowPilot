
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

// Function to get a random API key from the list
const getApiKey = (envVar: string): string => {
  // Read the environment variable every time the function is called.
  const apiKeys = process.env[envVar]?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    // Return empty string if no keys, the plugin will handle the error if it needs it
    return '';
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
      apiKey: getApiKey('GEMINI_API_KEY'),
    }),
    openAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: getApiKey('NVIDIA_API_KEY'),
    })
  ],
});
