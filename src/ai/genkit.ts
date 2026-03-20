
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openAI} from 'genkitx-openai';

// Function to get a random API key from the list for Gemini
const getGeminiApiKey = (): string => {
  const apiKeys = process.env.GEMINI_API_KEY?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
  }

  if (apiKeys.length === 1) {
    return apiKeys[0];
  }
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};

// Function to get a random API key from the list for NVIDIA
const getNvidiaApiKey = (): string => {
  const apiKeys = process.env.NVIDIA_API_KEY?.split(',').filter(k => k.trim()) || [];

  if (apiKeys.length === 0) {
    throw new Error('NVIDIA_API_KEY environment variable is not set or empty.');
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
      apiKey: getGeminiApiKey as any,
    }),
    openAI({
      apiKey: getNvidiaApiKey as any,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    }),
  ],
});
