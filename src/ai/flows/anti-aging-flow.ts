
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
  model: 'googleai/gemini-pro',
  prompt: `You are an AI anti-aging specialist. Based on the user's age, skin type, concerns, and current routine, provide a comprehensive anti-aging plan in Bahasa Indonesia.

User's Age: {{{age}}}
Skin Type: {{{skinType}}}
Primary Concerns: {{#each primaryConcerns}}{{{this}}}{{/each}}
Current Routine: {{{currentRoutine}}}

Analyze the user's situation and provide a detailed, personalized AM and PM skincare routine. Suggest specific types of products (e.g., 'serum vitamin C', 'krim retinol'). Also, provide a list of key anti-aging ingredients to look for and some actionable lifestyle tips.`,
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
