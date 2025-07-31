
'use server';
/**
 * @fileOverview An AI agent specializing in skin nutrition.
 *
 * - getSkinNutritionAdvice - A function that provides nutritional advice for skin health.
 * - SkinNutritionInput - The input type for the getSkinNutritionAdvice function.
 * - SkinNutritionOutput - The return type for the getSkinNutritionAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SkinNutritionInputSchema = z.object({
  currentDiet: z.string().describe('A description of the user\'s current daily diet.'),
  skinConcerns: z.string().describe('The user\'s primary skin concerns (e.g., acne, dryness, dullness).'),
});
export type SkinNutritionInput = z.infer<typeof SkinNutritionInputSchema>;

export const SkinNutritionOutputSchema = z.object({
  analysis: z.string().describe('An analysis of how the current diet might be affecting the skin concerns.'),
  recommendations: z.object({
    foodsToEat: z.array(z.string()).describe('A list of specific foods that can help improve the skin condition.'),
    foodsToAvoid: z.array(z.string()).describe('A list of specific foods that might be worsening the skin condition.'),
    generalTips: z.string().describe('General nutritional tips for better skin health.'),
  }),
});
export type SkinNutritionOutput = z.infer<typeof SkinNutritionOutputSchema>;

export async function getSkinNutritionAdvice(input: SkinNutritionInput): Promise<SkinNutritionOutput> {
  return skinNutritionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skinNutritionPrompt',
  input: {schema: SkinNutritionInputSchema},
  output: {schema: SkinNutritionOutputSchema},
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
