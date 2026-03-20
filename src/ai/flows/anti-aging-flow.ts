
'use server';
/**
 * @fileOverview An AI agent specializing in anti-aging skincare.
 *
 * - getAntiAgingAdvice - A function that provides anti-aging skincare advice.
 */

import {ai} from '@/ai/genkit';
import type { AntiAgingInput, AntiAgingOutput } from '@/ai/schemas/anti-aging-schemas';
import { AntiAgingInputSchema, AntiAgingOutputSchema } from '@/ai/schemas/anti-aging-schemas';


export async function getAntiAgingAdvice(input: AntiAgingInput): Promise<AntiAgingOutput> {
  return antiAgingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'antiAgingPrompt',
  input: {schema: AntiAgingInputSchema},
  output: {schema: AntiAgingOutputSchema},
  model: 'openai/nvidia/llama-3.1-nemotron-70b-instruct',
  prompt: (input) => {
    const primaryConcerns = input.primaryConcerns?.join(', ') || '';
    return [{
      text: `You are an AI anti-aging specialist. Based on the user's age, skin type, concerns, and current routine, provide a comprehensive anti-aging plan in Bahasa Indonesia.

User's Age: ${input.age}
Skin Type: ${input.skinType}
Primary Concerns: ${primaryConcerns}
Current Routine: ${input.currentRoutine}

Analyze the user's situation and provide a detailed, personalized AM and PM skincare routine. Suggest specific types of products (e.g., 'serum vitamin C', 'krim retinol'). Also, provide a list of key anti-aging ingredients to look for and some actionable lifestyle tips.`
    }];
  },
});

const antiAgingFlow = ai.defineFlow(
  {
    name: 'antiAgingFlow',
    inputSchema: AntiAgingInputSchema,
    outputSchema: AntiAgingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
