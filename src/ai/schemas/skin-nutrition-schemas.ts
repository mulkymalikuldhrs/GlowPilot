/**
 * @fileOverview Schemas and types for the skin nutrition flow.
 *
 * - SkinNutritionInputSchema - The Zod schema for the input of the getSkinNutritionAdvice function.
 * - SkinNutritionInput - The TypeScript type for the input of the getSkinNutritionAdvice function.
 * - SkinNutritionOutputSchema - The Zod schema for the output of the getSkinNutritionAdvice function.
 * - SkinNutritionOutput - The TypeScript type for the output of the getSkinNutritionAdvice function.
 */
import {z} from 'genkit';

export const SkinNutritionInputSchema = z.object({
  currentDiet: z
    .string()
    .describe("A description of the user's current daily diet."),
  skinConcerns: z
    .string()
    .describe("The user's primary skin concerns (e.g., acne, dryness, dullness)."),
});
export type SkinNutritionInput = z.infer<typeof SkinNutritionInputSchema>;

export const SkinNutritionOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'An analysis of how the current diet might be affecting the skin concerns.'
    ),
  recommendations: z.object({
    foodsToEat: z
      .array(z.string())
      .describe(
        'A list of specific foods that can help improve the skin condition.'
      ),
    foodsToAvoid: z
      .array(z.string())
      .describe(
        'A list of specific foods that might be worsening the skin condition.'
      ),
    generalTips: z
      .string()
      .describe('General nutritional tips for better skin health.'),
  }),
});
export type SkinNutritionOutput = z.infer<typeof SkinNutritionOutputSchema>;
