
'use server';
/**
 * @fileOverview An AI agent specializing in anti-aging skincare.
 *
 * - getAntiAgingAdvice - A function that provides anti-aging skincare advice.
 * - AntiAgingInput - The input type for the getAntiAgingAdvice function.
 * - AntiAgingOutput - The return type for the getAntiAgingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AntiAgingInputSchema = z.object({
  age: z.number().describe('The user\'s age.'),
  skinType: z.string().describe('The user\'s skin type (e.g., oily, dry, combination, sensitive).'),
  primaryConcerns: z.array(z.string()).describe('The user\'s primary anti-aging concerns (e.g., fine lines, wrinkles, loss of elasticity, age spots).'),
  currentRoutine: z.string().describe('A description of the user\'s current skincare routine.'),
});
export type AntiAgingInput = z.infer<typeof AntiAgingInputSchema>;

export const AntiAgingOutputSchema = z.object({
  analysis: z.string().describe('An analysis of the user\'s current routine and concerns.'),
  recommendations: z.object({
    amRoutine: z.string().describe('A recommended morning anti-aging skincare routine, including specific product types.'),
    pmRoutine: z.string().describe('A recommended evening anti-aging skincare routine, including specific product types.'),
    lifestyleTips: z.array(z.string()).describe('Lifestyle tips to help combat aging (e.g., sun protection, diet, sleep).'),
    keyIngredients: z.array(z.string()).describe('A list of key anti-aging ingredients the user should look for in products.'),
  }),
});
export type AntiAgingOutput = z.infer<typeof AntiAgingOutputSchema>;

export async function getAntiAgingAdvice(input: AntiAgingInput): Promise<AntiAgingOutput> {
  return antiAgingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'antiAgingPrompt',
  input: {schema: AntiAgingInputSchema},
  output: {schema: AntiAgingOutputSchema},
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
