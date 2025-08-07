
import { config } from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Function to get a random API key from the list
const getApiKey = (): string => {
  // Read the environment variable every time the function is called.
  const apiKeys = process.env.GEMINI_API_KEY?.split(',').filter(k => k.trim()) || [];
  
  if (apiKeys.length === 0) {
    // This will now throw an error only when an actual API call is attempted without keys.
    throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
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
      apiKey: getApiKey,
    }),
  ],
});
