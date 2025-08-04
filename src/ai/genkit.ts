import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Get the comma-separated API keys from the environment variable
const apiKeys = process.env.GEMINI_API_KEY?.split(',').filter(k => k.trim()) || [];

if (apiKeys.length === 0) {
  throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
}

// Function to get a random API key from the list
const getApiKey = () => {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};

export const ai = genkit({
  plugins: [
    googleAI({
      // Use a function to provide the API key dynamically for each request
      apiKey: getApiKey,
    }),
  ],
});
