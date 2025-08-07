/**
 * @fileOverview Schemas and types for the skin condition diagnosis flow.
 *
 * - SkinConditionDiagnosisInputSchema - The Zod schema for the input of the diagnoseSkinCondition function.
 * - SkinConditionDiagnosisInput - The TypeScript type for the input of the diagnoseSkinCondition function.
 * - SkinConditionDiagnosisOutputSchema - The Zod schema for the output of the diagnoseSkinCondition function.
 * - SkinConditionDiagnosisOutput - The TypeScript type for the output of the diagnoseSkinCondition function.
 */
import {z} from 'genkit';

export const SkinConditionDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .nullable()
    .describe(
      "An optional photo of the skin issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the skin issue.'),
});
export type SkinConditionDiagnosisInput = z.infer<
  typeof SkinConditionDiagnosisInputSchema
>;

export const SkinConditionDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the skin condition.'),
  recommendations: z
    .object({
      amRoutine: z.string().describe('The recommended morning skincare routine.'),
      pmRoutine: z.string().describe('The recommended evening skincare routine.'),
    })
    .describe('Personalized skincare routine recommendations'),
  productRecommendations: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended product.'),
        category: z
          .string()
          .describe('The category of the product (e.g., Cleanser, Moisturizer, Serum).'),
        reason: z
          .string()
          .describe(
            "The reason why this product is recommended for the user's condition."
          ),
      })
    )
    .describe('A list of specific product recommendations.'),
  lifestyleTips: z.array(z.string()).optional().describe("A list of relevant lifestyle tips."),
  disclaimer: z.string().optional().describe("A disclaimer that the AI is not a medical professional."),
  progressGoal: z.object({
    title: z.string().describe("A concise, actionable title for the user's progress goal (e.g., 'Mengurangi Jerawat Hormonal')."),
    targetDate: z.string().describe("A realistic target date for the goal, formatted as 'DD MMM YYYY' (e.g., '30 Sep 2024').")
  }).optional().describe("A new progress goal to be added to the user's tracking page.")
});
export type SkinConditionDiagnosisOutput = z.infer<
  typeof SkinConditionDiagnosisOutputSchema
>;
