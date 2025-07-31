
'use server';

/**
 * @fileOverview Diagnoses skin conditions based on a photo and description, providing skincare recommendations.
 *
 * - diagnoseSkinCondition - A function that handles the skin condition diagnosis process.
 * - SkinConditionDiagnosisInput - The input type for the diagnoseSkinCondition function.
 * - SkinConditionDiagnosisOutput - The return type for the diagnoseSkinCondition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkinConditionDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the skin issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the skin issue.'),
});
export type SkinConditionDiagnosisInput = z.infer<typeof SkinConditionDiagnosisInputSchema>;

const SkinConditionDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the skin condition.'),
  recommendations: z.object({
    amRoutine: z.string().describe('The recommended morning skincare routine.'),
    pmRoutine: z.string().describe('The recommended evening skincare routine.'),
  }).describe('Personalized skincare routine recommendations'),
  productRecommendations: z.array(z.object({
    name: z.string().describe('The name of the recommended product.'),
    category: z.string().describe('The category of the product (e.g., Cleanser, Moisturizer, Serum).'),
    reason: z.string().describe('The reason why this product is recommended for the user\'s condition.'),
  })).describe('A list of specific product recommendations.'),
});
export type SkinConditionDiagnosisOutput = z.infer<typeof SkinConditionDiagnosisOutputSchema>;

export async function diagnoseSkinCondition(input: SkinConditionDiagnosisInput): Promise<SkinConditionDiagnosisOutput> {
  return skinConditionDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skinConditionDiagnosisPrompt',
  input: {schema: SkinConditionDiagnosisInputSchema},
  output: {schema: SkinConditionDiagnosisOutputSchema},
  prompt: `You are an AI dermatologist. Provide a diagnosis of the skin condition, personalized skincare routine recommendations, and a list of 3-5 specific (but generic, well-known) product recommendations. For each product, explain why it's suitable.

  Description: {{{description}}}
  {{#if photoDataUri}}
  Photo: {{media url=photoDataUri}}
  {{/if}}

  Base your diagnosis on the provided description, and the photo if available. If no photo is provided, rely solely on the description.

  Format your output as a JSON object with "diagnosis", "recommendations", and "productRecommendations" fields.
  `,
});

const skinConditionDiagnosisFlow = ai.defineFlow(
  {
    name: 'skinConditionDiagnosisFlow',
    inputSchema: SkinConditionDiagnosisInputSchema,
    outputSchema: SkinConditionDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
