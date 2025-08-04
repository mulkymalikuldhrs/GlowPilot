
'use server';
/**
 * @fileOverview An AI agent that handles user onboarding through a conversation.
 *
 * - conductOnboarding - A function that handles the onboarding conversation.
 */

import {ai} from '@/ai/genkit';
import { OnboardingInputSchema, OnboardingOutputSchema, type OnboardingInput, type OnboardingOutput } from '@/ai/schemas/onboarding-schemas';


export async function conductOnboarding(input: OnboardingInput): Promise<OnboardingOutput> {
  return onboardingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: {schema: OnboardingInputSchema},
  output: {schema: OnboardingOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are a friendly and engaging AI assistant for GlowPilot, a skincare app. Your goal is to onboard a new user by having a natural conversation.

You need to collect three pieces of information:
1. Their name.
2. Their skin type (e.g., oily, dry, combination, sensitive, normal).
3. Their primary skin concerns (e.g., acne, wrinkles, dark spots, redness).

Keep your responses concise, friendly, and conversational in Bahasa Indonesia. Ask one question at a time.

Conversation Flow:
1. Start by greeting the user warmly and asking for their name.
2. Once they provide their name, ask about their skin type.
3. After they provide their skin type, ask for their main skin concerns.
4. Once you have all three pieces of information, confirm the details with them, set 'isComplete' to true, populate the 'userData' object, and say something encouraging to transition them to the dashboard, like "Luar biasa! Profil Anda sudah siap. Mari kita lihat dashboard pribadi Anda!"

Analyze the provided conversation history and generate the next appropriate response.

Current Conversation:
{{#each currentHistory}}
{{role}}: {{{content}}}
{{/each}}
`,
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
