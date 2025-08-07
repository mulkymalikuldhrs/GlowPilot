
/**
 * @fileOverview Schemas and types for the conversational diagnosis flow.
 *
 * - DiagnosisConversationInputSchema - The Zod schema for the input of the conductDiagnosis function.
 * - DiagnosisConversationInput - The TypeScript type for the input of the conductDiagnosis function.
 * - DiagnosisConversationOutputSchema - The Zod schema for the output of the conductDiagnosis function.
 * - DiagnosisConversationOutput - The TypeScript type for the output of the conductDiagnosis function.
 */
import {z} from 'genkit';
import {SkinConditionDiagnosisOutputSchema} from '@/ai/schemas/skin-condition-diagnosis-schemas';

export const DiagnosisConversationInputSchema = z.object({
  currentHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .describe('The current conversation history.'),
  photoDataUri: z
    .string()
    .nullable()
    .describe(
      "An optional photo of the skin issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  systemPrompt: z.string().describe('The system prompt that defines the AI\'s persona and specialization.'),
});
export type DiagnosisConversationInput = z.infer<
  typeof DiagnosisConversationInputSchema
>;

export const DiagnosisConversationOutputSchema = z.object({
  response: z.string().describe('The next message from the AI assistant.'),
  isComplete: z
    .boolean()
    .describe('Whether the diagnosis process is complete.'),
  diagnosisResult: SkinConditionDiagnosisOutputSchema.nullable().describe(
    'The final diagnosis result, provided only when isComplete is true.'
  ),
});
export type DiagnosisConversationOutput = z.infer<
  typeof DiagnosisConversationOutputSchema
>;
