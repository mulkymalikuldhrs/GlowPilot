import {genkit} from 'genkit';
import {openai} from 'genkit-plugin-openai';

export const ai = genkit({
  plugins: [
    openai({
      apiKey: 'unused',
      baseURL: 'https://api.llm7.io/v1',
    }),
  ],
  model: 'llm7/gpt-3.5-turbo',
});
