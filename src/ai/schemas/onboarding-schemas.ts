
/**
 * @fileOverview Schemas and types for the user onboarding flow.
 *
 * - OnboardingInputSchema - The Zod schema for the input of the conductOnboarding function.
 * - OnboardingInput - The TypeScript type for the input of the conductOnboarding function.
 * - OnboardingOutputSchema - The Zod schema for the output of the conductOnboarding function.
 * - OnboardingOutput - The TypeScript type for the output of the conductOnboarding function.
 */
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
      currentRoutine: z.string().optional().describe("The user's current skincare routine."),
      lifestyleFactors: z.string().optional().describe("The user's lifestyle factors (sun, sleep, stress)."),
    }).optional().describe('The collected user data once onboarding is complete.'),
    routineAnalysis: z.string().optional().describe("A brief, one-sentence analysis of the user's routine and lifestyle."),
  });
export type OnboardingOutput = z.infer<typeof OnboardingOutputSchema>;
  
