
'use server';
/**
 * @fileOverview An AI agent for fetching products from e-commerce sites and generating affiliate links.
 *
 * - getCatalogProducts - A function that fetches product data based on a query.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  CatalogInputSchema,
  CatalogOutputSchema,
  type CatalogInput,
  type CatalogOutput,
} from '@/ai/schemas/catalog-schemas';

// This prompt is dynamically generated based on user input.
const catalogPromptTemplate = (productQuery: string, platform: string = "Shopee") => `
You are GlowPilot Catalog Agent, an expert AI that adds skincare products from ${platform} to GlowPilot's catalog.

# Goal:
Fetch skincare products that match the keyword: "${productQuery}", create product data, and generate valid affiliate links.

# Steps:
1. Search for 3-5 of the most relevant and best-rated products on the ${platform} platform.
2. Extract the following information:
   - Product Name
   - Price
   - A brief, compelling description
   - Product Image URL
   - Rating
   - The original, direct product link
3. Convert the original product link into a GlowPilot affiliate link using the appropriate template:
   - Shopee: https://shopee.co.id/universal-link?af_click_id=YOUR_AFF_ID&af_siteid=YOUR_SITE_ID&url={encoded_product_url}
   - Tokopedia: https://ta.tokopedia.link?af_click_id=YOUR_AFF_ID&af_siteid=YOUR_SITE_ID&url={encoded_product_url}
4. Write the final result as a valid JSON array. Do not include any products that are out of stock or have a rating below 4.7.

# Example JSON Object:
  {
    "title": "SOMETHINC Niacinamide + Moisture Beet Serum",
    "price": "Rp89.000",
    "description": "A serum with niacinamide to address dullness and brighten the face.",
    "image_url": "https://cf.shopee.co.id/file/some_valid_image_hash.jpg",
    "rating": "4.9",
    "affiliate_link": "https://shopee.co.id/universal-link?af_click_id=XXXX&url=..."
  }


# Important Notes:
- Use Bahasa Indonesia for all user-facing text (like descriptions).
- Only retrieve products with a rating of 4.7 or higher.
- Do not show any product without a valid, generated affiliate link.
- The affiliate link MUST be converted from a real, original product URL. Do not invent links.
- The final output must be ONLY the valid JSON array, with no additional text or explanations.
`;

export async function getCatalogProducts(
  input: CatalogInput
): Promise<CatalogOutput> {
  return catalogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'catalogPrompt',
  input: {schema: CatalogInputSchema},
  output: {schema: CatalogOutputSchema},
  prompt: (input) => catalogPromptTemplate(input.productQuery, input.platform),
  model: 'googleai/gemini-1.5-flash-latest',
});

const catalogFlow = ai.defineFlow(
  {
    name: 'catalogFlow',
    inputSchema: CatalogInputSchema,
    outputSchema: CatalogOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output || [];
  }
);
