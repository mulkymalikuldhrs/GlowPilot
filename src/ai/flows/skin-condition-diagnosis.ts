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
    .describe(
      "A photo of the skin issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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
});
export type SkinConditionDiagnosisOutput = z.infer<typeof SkinConditionDiagnosisOutputSchema>;

export async function diagnoseSkinCondition(input: SkinConditionDiagnosisInput): Promise<SkinConditionDiagnosisOutput> {
  return skinConditionDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skinConditionDiagnosisPrompt',
  input: {schema: SkinConditionDiagnosisInputSchema},
  output: {schema: SkinConditionDiagnosisOutputSchema},
  prompt: `You are an AI dermatologist that will provide a diagnosis of the skin condition and provide personalized skincare routine recommendations. Ensure your diagnosis is detailed, but easy to understand.

  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}

  Format your output as a JSON object with "diagnosis" and "recommendations" fields.  The "recommendations" field should itself be a JSON object containing the "amRoutine" and "pmRoutine" fields.
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
