
'use server';
/**
 * @fileOverview An AI agent specializing in skin nutrition.
 *
 * - getSkinNutritionAdvice - A function that provides nutritional advice for skin health.
 */

import {ai} from '@/ai/genkit';
import type { SkinNutritionInput, SkinNutritionOutput } from '@/ai/schemas/skin-nutrition-schemas';
import { SkinNutritionInputSchema, SkinNutritionOutputSchema } from '@/ai/schemas/skin-nutrition-schemas';


export async function getSkinNutritionAdvice(input: SkinNutritionInput): Promise<SkinNutritionOutput> {
  return skinNutritionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skinNutritionPrompt',
  input: {schema: SkinNutritionInputSchema},
  output: {schema: SkinNutritionOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an AI nutritionist specializing in skin health. Based on the user's diet and skin concerns, provide a detailed analysis and actionable recommendations in Bahasa Indonesia.

User's Diet: {{{currentDiet}}}
Skin Concerns: {{{skinConcerns}}}

Analyze the user's diet and explain how it could be related to their skin problems. Then, provide a list of recommended foods to add to their diet and a list of foods to avoid. Also, give some general, easy-to-follow tips for improving skin through nutrition.`,
});

const skinNutritionFlow = ai.defineFlow(
  {
    name: 'skinNutritionFlow',
    inputSchema: SkinNutritionInputSchema,
    outputSchema: SkinNutritionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
