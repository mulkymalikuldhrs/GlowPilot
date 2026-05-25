
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Round-robin API key rotation for even distribution across keys
let currentKeyIndex = 0;

const getApiKey = (): string => {
  // Read the environment variable every time the function is called.
  const apiKeys = process.env.GEMINI_API_KEY?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
  }

  if (apiKeys.length === 1) {
    return apiKeys[0];
  }

  // Round-robin rotation: cycles through keys sequentially for even distribution
  const key = apiKeys[currentKeyIndex % apiKeys.length];
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  return key;
};

export const ai = genkit({
  plugins: [
    googleAI({
      // The apiKey property accepts a function that will be called
      // on each request, allowing for dynamic key rotation.
      apiKey: getApiKey,
    }),
  ],
});
