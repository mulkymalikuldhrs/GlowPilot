/**
 * @fileOverview Schemas and types for the product comparison flow.
 *
 * - ProductComparisonInputSchema - The Zod schema for the input of the compareProducts function.
 * - ProductComparisonInput - The TypeScript type for the input of the compareProducts function.
 * - ProductComparisonOutputSchema - The Zod schema for the output of the compareProducts function.
 * - ProductComparisonOutput - The TypeScript type for the output of the compareProducts function.
 */
import {z} from 'genkit';

export const ProductComparisonInputSchema = z.object({
  product1: z.string().describe('Name of the first product.'),
  product2: z.string().describe('Name of the second product.'),
});
export type ProductComparisonInput = z.infer<
  typeof ProductComparisonInputSchema
>;

export const ProductComparisonOutputSchema = z.object({
  comparison: z
    .string()
    .describe(
      'A detailed comparison of the two products, covering price, rating, and key ingredients.'
    ),
  bestValue: z
    .string()
    .optional()
    .describe("The name of the product identified as the 'Best Value'."),
  dermatologistPick: z
    .string()
    .optional()
    .describe("The name of the product identified as the 'Dermatologist Pick'."),
  cheapest: z
    .string()
    .optional()
    .describe("The name of the product identified as the 'Cheapest'."),
});
export type ProductComparisonOutput = z.infer<
  typeof ProductComparisonOutputSchema
>;
