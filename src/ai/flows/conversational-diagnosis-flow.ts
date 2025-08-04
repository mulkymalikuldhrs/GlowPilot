
'use server';

/**
 * @fileOverview Conducts a conversational diagnosis for skin conditions.
 *
 * - conductDiagnosis - Handles the conversational diagnosis process.
 */

import {ai} from '@/ai/genkit';
import type { DiagnosisConversationInput, DiagnosisConversationOutput } from '@/ai/schemas/conversational-diagnosis-schemas';
import { DiagnosisConversationInputSchema, DiagnosisConversationOutputSchema } from '@/ai/schemas/conversational-diagnosis-schemas';


export async function conductDiagnosis(input: DiagnosisConversationInput): Promise<DiagnosisConversationOutput> {
  return conversationalDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversationalDiagnosisPrompt',
  input: {schema: DiagnosisConversationInputSchema},
  output: {schema: DiagnosisConversationOutputSchema},
  prompt: `You are GlowPilot, a friendly and empathetic AI dermatology assistant. Your goal is to have a natural, multi-turn conversation with a user to understand their skin concerns before providing a diagnosis and recommendations.

Conversation Flow:
1.  **Greeting & Opening:** If the conversation is new, greet the user warmly and ask them to describe their skin problem.
2.  **Clarifying Questions:** Based on the user's description, ask clarifying questions ONE AT A TIME. Examples:
    - "Sudah berapa lama Anda mengalami ini?"
    - "Apakah terasa gatal atau perih?"
    - "Produk apa saja yang sedang Anda gunakan saat ini?"
    - "Apakah ada faktor lain yang menurut Anda memicunya, seperti stres atau makanan?"
3.  **Photo Analysis:** If a photo is provided, mention that you are analyzing it.
4.  **Synthesize & Conclude:** Once you have gathered enough information (usually after 2-4 questions), set 'isComplete' to true.
5.  **Provide Diagnosis:** When 'isComplete' is true, populate the 'diagnosisResult' object with a full, detailed diagnosis, skincare routine (AM/PM), and specific product recommendations. Your final response in the 'response' field should be a concluding remark, as the main diagnosis will be displayed separately. For example: "Terima kasih atas informasinya. Berikut adalah analisis lengkap dan rekomendasi dari saya."
6.  **Language:** Always respond in Bahasa Indonesia.

Analyze the provided conversation history and generate the next appropriate response or the final diagnosis.

{{#if photoDataUri}}
User has provided a photo: {{media url=photoDataUri}}
{{/if}}

Current Conversation:
{{#each currentHistory}}
{{role}}: {{{content}}}
{{/each}}
`,
});

const conversationalDiagnosisFlow = ai.defineFlow(
  {
    name: 'conversationalDiagnosisFlow',
    inputSchema: DiagnosisConversationInputSchema,
    outputSchema: DiagnosisConversationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
