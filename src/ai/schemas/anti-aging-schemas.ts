/**
 * @fileOverview Schemas and types for the anti-aging flow.
 *
 * - AntiAgingInputSchema - The Zod schema for the input of the getAntiAgingAdvice function.
 * - AntiAgingInput - The TypeScript type for the input of the getAntiAgingAdvice function.
 * - AntiAgingOutputSchema - The Zod schema for the output of the getAntiAgingAdvice function.
 * - AntiAgingOutput - The TypeScript type for the output of the getAntiAgingAdvice function.
 */
import {z} from 'genkit';

export const AntiAgingInputSchema = z.object({
  age: z.number().describe("The user's age."),
  skinType: z
    .string()
    .describe('The user\'s skin type (e.g., oily, dry, combination, sensitive).'),
  primaryConcerns: z
    .array(z.string())
    .describe(
      "The user's primary anti-aging concerns (e.g., fine lines, wrinkles, loss of elasticity, age spots)."
    ),
  currentRoutine: z
    .string()
    .describe("A description of the user's current skincare routine."),
});
export type AntiAgingInput = z.infer<typeof AntiAgingInputSchema>;

export const AntiAgingOutputSchema = z.object({
  analysis: z
    .string()
    .describe("An analysis of the user's current routine and concerns."),
  recommendations: z.object({
    amRoutine: z
      .string()
      .describe(
        'A recommended morning anti-aging skincare routine, including specific product types.'
      ),
    pmRoutine: z
      .string()
      .describe(
        'A recommended evening anti-aging skincare routine, including specific product types.'
      ),
    lifestyleTips: z
      .array(z.string())
      .describe(
        'Lifestyle tips to help combat aging (e.g., sun protection, diet, sleep).'
      ),
    keyIngredients: z
      .array(z.string())
      .describe(
        'A list of key anti-aging ingredients the user should look for in products.'
      ),
  }),
});
export type AntiAgingOutput = z.infer<typeof AntiAgingOutputSchema>;
