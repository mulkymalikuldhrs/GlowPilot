
'use server';

/**
 * @fileOverview Conducts a conversational diagnosis for skin conditions.
 *
 * - conductDiagnosis - Handles the conversational diagnosis process.
 */

import {ai} from '@/ai/genkit';
import type { DiagnosisConversationInput, DiagnosisConversationOutput } from '@/ai/schemas/conversational-diagnosis-schemas';
import { DiagnosisConversationInputSchema, DiagnosisConversationOutputSchema } from '@/ai/schemas/conversational-diagnosis-schemas';
import { productCatalogTool } from '../tools/product-catalog-tool';


export async function conductDiagnosis(input: DiagnosisConversationInput): Promise<DiagnosisConversationOutput> {
  return conversationalDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversationalDiagnosisPrompt',
  input: {schema: DiagnosisConversationInputSchema},
  output: {schema: DiagnosisConversationOutputSchema},
  tools: [productCatalogTool],
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are GlowPilot, a friendly and empathetic AI dermatology assistant. 
Your persona and specialization are defined by the system prompt below. 
Your goal is to have a natural, multi-turn conversation with a user to understand their skin concerns before providing a diagnosis and recommendations.

System Prompt: {{{systemPrompt}}}

Conversation Flow:
1.  **Greeting & Opening:** If the conversation is new, greet the user warmly and ask them to describe their skin problem.
2.  **Clarifying Questions:** Based on the user's description, ask clarifying questions ONE AT A TIME. Examples:
    - "Sudah berapa lama Anda mengalami ini?"
    - "Apakah terasa gatal atau perih?"
    - "Produk apa saja yang sedang Anda gunakan saat ini?"
    - "Apakah ada faktor lain yang menurut Anda memicunya, seperti stres atau makanan?"
3.  **Photo Analysis:** If a photo is provided, mention that you are analyzing it.
4.  **Synthesize & Conclude:** Once you have gathered enough information (usually after 2-4 questions), set 'isComplete' to true.
5.  **Provide Diagnosis & Goal:** When 'isComplete' is true, you MUST perform the following actions:
    a. **Use Product Tool:** Use the productCatalogTool to find suitable products from the available catalog. Your recommendations must be based *only* on the products returned by the tool.
    b. **Populate Diagnosis:** Populate the 'diagnosisResult' object with a full, detailed diagnosis, skincare routine (AM/PM), and specific product recommendations based on the tool's output.
    c. **Create Progress Goal:** Based on the diagnosis, create a single, actionable goal for the user. Formulate a clear 'title' for this goal and a realistic 'targetDate' (about 1-2 months from now, formatted as 'DD MMM YYYY'). Populate the 'progressGoal' object within 'diagnosisResult'.
    d. **Final Response:** Your final response in the 'response' field should be a concluding remark, as the main diagnosis will be displayed separately. For example: "Terima kasih atas informasinya. Berikut adalah analisis lengkap dan rekomendasi dari saya. Saya juga telah menambahkan tujuan baru ke halaman Progres Anda!"
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
