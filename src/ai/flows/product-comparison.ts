
'use server';

/**
 * @fileOverview Compares two skincare products and provides a detailed analysis with labels.
 *
 * - compareProducts - A function that handles the product comparison.
 * - ProductComparisonInput - The input type for the compareProducts function.
 * - ProductComparisonOutput - The return type for the compareProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ProductComparisonInputSchema = z.object({
  product1: z.string().describe('Name of the first product.'),
  product2: z.string().describe('Name of the second product.'),
});
export type ProductComparisonInput = z.infer<typeof ProductComparisonInputSchema>;

export const ProductComparisonOutputSchema = z.object({
  comparison: z.string().describe('A detailed comparison of the two products, covering price, rating, and key ingredients.'),
  bestValue: z.string().optional().describe('The name of the product identified as the \'Best Value\'.'),
  dermatologistPick: z.string().optional().describe('The name of the product identified as the \'Dermatologist Pick\'.'),
  cheapest: z.string().optional().describe('The name of the product identified as the \'Cheapest\'.'),
});
export type ProductComparisonOutput = z.infer<typeof ProductComparisonOutputSchema>;

export async function compareProducts(input: ProductComparisonInput): Promise<ProductComparisonOutput> {
  return productComparisonFlow(input);
}

const productComparisonPrompt = ai.definePrompt({
  name: 'productComparisonPrompt',
  input: {schema: ProductComparisonInputSchema},
  output: {schema: ProductComparisonOutputSchema},
  prompt: `You are a skincare comparison copilot. Your task is to compare two skincare products based on their potential price range, user ratings, and key ingredients.
Provide a detailed comparison in a paragraph. Then, analyze the comparison and label one of the products as 'Nilai Terbaik', 'Pilihan Dermatologis', or 'Paling Murah' where appropriate.
If a product is a clear winner in terms of price-to-ingredients ratio, label it 'Nilai Terbaik'.
If a product contains more clinically-proven or sought-after ingredients, label it 'Pilihan Dermatologis'.
If one product is significantly cheaper, label it 'Paling Murah'.
Only provide the labels that are clearly applicable. Output the result in Bahasa Indonesia.

Product 1: {{{product1}}}
Product 2: {{{product2}}}`,
});

const productComparisonFlow = ai.defineFlow(
  {
    name: 'productComparisonFlow',
    inputSchema: ProductComparisonInputSchema,
    outputSchema: ProductComparisonOutputSchema,
  },
  async input => {
    const {output} = await productComparisonPrompt(input);
    return output!;
  }
);
