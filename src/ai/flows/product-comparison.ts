// ProductComparison flow compares skincare products based on price, rating, and ingredients.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductComparisonInputSchema = z.object({
  product1: z.string().describe('Name of the first product.'),
  product2: z.string().describe('Name of the second product.'),
});
export type ProductComparisonInput = z.infer<typeof ProductComparisonInputSchema>;

const ProductComparisonOutputSchema = z.object({
  comparison: z.string().describe('Comparison of the two products, including price, rating, ingredients, and labels like \'Best Value\' or \'Dermatologist Pick\'.'),
  bestValue: z.string().optional().describe('The product that is the best value.'),
  dermatologistPick: z.string().optional().describe('The product that is the dermatologist pick.'),
  cheapest: z.string().optional().describe('The product that is the cheapest.'),
});
export type ProductComparisonOutput = z.infer<typeof ProductComparisonOutputSchema>;

export async function compareProducts(input: ProductComparisonInput): Promise<ProductComparisonOutput> {
  return productComparisonFlow(input);
}

const productComparisonPrompt = ai.definePrompt({
  name: 'productComparisonPrompt',
  input: {schema: ProductComparisonInputSchema},
  output: {schema: ProductComparisonOutputSchema},
  prompt: `Bandingkan dua produk perawatan kulit berikut berdasarkan harga, peringkat, dan bahan-bahannya. Berikan perbandingan terperinci, lalu beri label pada salah satunya sebagai 'Nilai Terbaik', 'Pilihan Dermatologis', atau 'Paling Murah' jika berlaku.\n\nProduk 1: {{{product1}}}\nProduk 2: {{{product2}}}`,
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
