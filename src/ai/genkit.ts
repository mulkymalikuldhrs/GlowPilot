import {genkit} from 'genkit';
import {openAI} from 'genkitx-openai';

export const ai = genkit({
  plugins: [
    openAI({
      apiKey: 'unused',
      baseURL: 'https://api.llm7.io/v1',
    }),
  ],
  model: 'openai/gpt-3.5-turbo',
});
