
'use server';
/**
 * @fileOverview An AI agent for onboarding users and collecting initial skin information.
 *
 * - onboardUser - A function that handles the onboarding conversation.
 */

import {ai} from '@/ai/genkit';
import type { OnboardingInput, OnboardingOutput } from '@/ai/schemas/onboarding-schemas';
import { OnboardingInputSchema, OnboardingOutputSchema } from '@/ai/schemas/onboarding-schemas';


export async function onboardUser(input: OnboardingInput): Promise<OnboardingOutput> {
  return onboardingFlow(input);
}

export async function conductOnboarding(input: OnboardingInput): Promise<OnboardingOutput> {
  return onboardingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: {schema: OnboardingInputSchema},
  output: {schema: OnboardingOutputSchema},
  model: 'openai/nvidia/llama-3.1-nemotron-70b-instruct',
  prompt: (input) => [
    {
      text: `You are GlowPilot Onboarding Assistant. Your goal is to collect essential skin information from a new user through a friendly conversation in Bahasa Indonesia.

Information to Collect:
1. User's name.
2. Their skin type (e.g., oily, dry, combination, sensitive, normal).
3. Their primary skin concerns (e.g., acne, wrinkles, dark spots, redness).
4. Their current skincare routine (what products they use for cleansing, treatment, and moisturizing).
5. Key lifestyle factors (sun exposure, sleep patterns, stress levels).

Conversation Flow & Persona:
- **Tone:** Be encouraging, empathetic, and professional, like a knowledgeable friend.
- **Language:** Always respond in Bahasa Indonesia.
- **Pacing:** Ask ONE question at a time. Keep it concise.
- **Question Order:**
    1. Start by greeting the user warmly and asking for their name.
    2. Once you have their name, ask about their skin type.
    3. After skin type, ask for their main skin concerns.
    4. Then, ask about their current skincare routine (cleanser, serum/treatment, moisturizer).
    5. Finally, ask about their lifestyle (sun exposure, sleep, stress).
- **Completion:**
    1. Once you have ALL the information, you MUST set \`isComplete\` to true.
    2. Populate the \`userData\` object with ALL the collected details.
    3. Provide a brief, one-sentence \`routineAnalysis\` based on their answers (e.g., "Rutinitas Anda tampaknya bagus, tetapi mungkin kita bisa menambahkan perlindungan matahari." or "Kurang tidur dan stres bisa jadi pemicu masalah kulit Anda.").
    4. Your final \`response\` should be encouraging and transition them to the dashboard, like "Luar biasa! Profil Anda sudah siap dengan analisis awal. Mari kita lihat dashboard pribadi Anda!"

Analyze the provided conversation history and generate the next appropriate response or the final profile summary.

Current Conversation:
${input.currentHistory.map((h: any) => `- ${h.role}: ${h.content}`).join('\n')}
`
    }
  ],
});

const onboardingFlow = ai.defineFlow(
  {
    name: 'onboardingFlow',
    inputSchema: OnboardingInputSchema,
    outputSchema: OnboardingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
