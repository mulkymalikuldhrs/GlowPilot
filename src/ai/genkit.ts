
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Get the comma-separated API keys from the environment variable
const apiKeys = process.env.GEMINI_API_KEY?.split(',').filter(k => k.trim()) || [];

if (apiKeys.length === 0) {
  throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
}

// Function to get a random API key from the list
const getApiKey = () => {
  if (typeof window !== 'undefined') {
    // This logic should not run on the client, return a placeholder or handle appropriately.
    // However, given flows run on the server, this should be safe.
    return apiKeys[0]; 
  }
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};

export const ai = genkit({
  plugins: [
    googleAI({
      // Provide a single, randomly selected API key at initialization time.
      // This will be used for the lifetime of this server instance.
      // For a per-request key, a custom plugin or middleware would be needed.
      apiKey: getApiKey(), 
    }),
  ],
});
