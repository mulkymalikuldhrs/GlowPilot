
'use server';

/**
 * @fileOverview Diagnoses skin conditions based on a photo and description, providing skincare recommendations.
 *
 * - diagnoseSkinCondition - A function that handles the skin condition diagnosis process.
 */

import {ai} from '@/ai/genkit';
import type { SkinConditionDiagnosisInput, SkinConditionDiagnosisOutput } from '@/ai/schemas/skin-condition-diagnosis-schemas';
import { SkinConditionDiagnosisInputSchema, SkinConditionDiagnosisOutputSchema } from '@/ai/schemas/skin-condition-diagnosis-schemas';


export async function diagnoseSkinCondition(input: SkinConditionDiagnosisInput): Promise<SkinConditionDiagnosisOutput> {
  return skinConditionDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skinConditionDiagnosisPrompt',
  input: {schema: SkinConditionDiagnosisInputSchema},
  output: {schema: SkinConditionDiagnosisOutputSchema},
  prompt: `You are GlowPilot Copilot, a non-medical virtual dermatology assistant. Your task is to analyze user input to provide a preliminary skin diagnosis, a detailed skincare routine, and specific product recommendations.

User Information:
Description: {{{description}}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}

Your tasks:
1.  **Analyze and Diagnose:** Based on the user's description and photo (if provided), provide a possible skin diagnosis (e.g., hormonal acne, sensitivity, dullness, dehydration). Frame this as a non-medical observation.
2.  **Create Skincare Routines:** Design a detailed AM (morning) and PM (evening) skincare routine tailored to the diagnosis. List the steps clearly.
3.  **Recommend Products:** Suggest 3-5 specific, well-known, and generally accessible product examples that fit the recommended routine. For each product, provide its name, category (e.g., Cleanser, Serum, Moisturizer), and a brief, clear reason why it's suitable.
4.  **Add Lifestyle Tips:** Include a few relevant lifestyle tips (e.g., diet, hydration, sun protection).
5.  **Disclaimer:** Always include a disclaimer that you are an AI and not a substitute for a professional medical doctor.

Output the entire response in Bahasa Indonesia.
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
