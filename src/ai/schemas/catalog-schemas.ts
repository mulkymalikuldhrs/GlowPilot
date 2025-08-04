
/**
 * @fileOverview Schemas and types for the product catalog flow.
 *
 * - CatalogInputSchema - The Zod schema for the input of the getCatalogProducts function.
 * - CatalogInput - The TypeScript type for the input of the getCatalogProducts function.
 * - CatalogOutputSchema - The Zod schema for the output of the getCatalogProducts function.
 * - CatalogOutput - The TypeScript type for the output of the getCatalogProducts function.
 */
import {z} from 'genkit';

export const CatalogInputSchema = z.object({
  productQuery: z.string().describe('The search query for the product.'),
  platform: z.string().optional().default('Shopee').describe('The e-commerce platform to search on.'),
});
export type CatalogInput = z.infer<typeof CatalogInputSchema>;

export const ProductSchema = z.object({
  title: z.string().describe('The name of the product.'),
  price: z.string().describe('The price of the product.'),
  description: z.string().describe('A short description of the product.'),
  image_url: z.string().describe('The URL for the product image.'),
  rating: z.string().describe('The product rating, must be 4.7 or higher.'),
  affiliate_link: z.string().describe('The generated affiliate link for the product.'),
});

export const CatalogOutputSchema = z.array(ProductSchema);
export type CatalogOutput = z.infer<typeof CatalogOutputSchema>;
