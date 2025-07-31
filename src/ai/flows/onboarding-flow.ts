'use server';
/**
 * @fileOverview An AI agent that handles user onboarding through a conversation.
 *
 * - conductOnboarding - A function that handles the onboarding conversation.
 * - OnboardingInput - The input type for the conductOnboarding function.
 * - OnboardingOutput - The return type for the conductOnboarding function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const OnboardingInputSchema = z.object({
  currentHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The current conversation history.'),
});
export type OnboardingInput = z.infer<typeof OnboardingInputSchema>;

export const OnboardingOutputSchema = z.object({
  response: z.string().describe('The next message from the AI assistant.'),
  isComplete: z.boolean().describe('Whether the onboarding process is complete.'),
  userData: z.object({
    name: z.string().optional().describe("The user's name."),
    skinType: z.string().optional().describe("The user's skin type."),
    skinConcerns: z.string().optional().describe("The user's primary skin concerns."),
  }).optional().describe('The collected user data once onboarding is complete.'),
});
export type OnboardingOutput = z.infer<typeof OnboardingOutputSchema>;

export async function conductOnboarding(input: OnboardingInput): Promise<OnboardingOutput> {
  return onboardingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: {schema: OnboardingInputSchema},
  output: {schema: OnboardingOutputSchema},
  prompt: `You are a friendly and engaging AI assistant for GlowPilot, a skincare app. Your goal is to onboard a new user by having a natural conversation.

You need to collect three pieces of information:
1. Their name.
2. Their skin type (e.g., oily, dry, combination, sensitive, normal).
3. Their primary skin concerns (e.g., acne, wrinkles, dark spots, redness).

Keep your responses concise, friendly, and conversational. Ask one question at a time.

Conversation Flow:
1. Start by greeting the user and asking for their name.
2. Once they provide their name, ask about their skin type.
3. After they provide their skin type, ask for their main skin concerns.
4. Once you have all three pieces of information, confirm the details with them, set 'isComplete' to true, populate the 'userData' object, and say something encouraging to transition them to the dashboard, like "Great, we're all set! Let's head to your personalized dashboard."

Analyze the provided conversation history and generate the next appropriate response.

Current Conversation:
{{#each currentHistory}}
{{#if (eq role 'user')}}
User: {{{content}}}
{{else}}
AI: {{{content}}}
{{/if}}
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
