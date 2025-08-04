/**
 * @fileOverview Schemas and types for the text-to-speech flow.
 *
 * - TextToSpeechInputSchema - The Zod schema for the input of the textToSpeech function.
 * - TextToSpeechInput - The TypeScript type for the input of the textToSpeech function.
 * - TextToSpeechOutputSchema - The Zod schema for the output of the textToSpeech function.
 * - TextToSpeechOutput - The TypeScript type for the output of the textToSpeech function.
 */
import { z } from 'genkit';

export const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  voice: z
    .enum(['nova', 'shimmer', 'echo'])
    .describe('The voice to use for the speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

export const TextToSpeechOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'."
    ),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;
