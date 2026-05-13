
'use server';

import { ai } from '@/ai/genkit';
import {
  CatalogInputSchema,
  CatalogOutputSchema,
  type CatalogInput,
  type CatalogOutput,
} from '@/ai/schemas/catalog-schemas';

/**
 * @fileOverview A flow for retrieving product recommendations from a simulated catalog.
 *
 * - getCatalogProducts - A function that returns a list of products based on a query.
 */

const catalogPromptTemplate = (productQuery: string, platform: string) => `
You are an expert skincare product curator. Based on the following query, provide a list of highly-rated, relevant skincare products available on ${platform}.

**User Query:** ${productQuery}

**Instructions:**
1.  **Product Selection:** Select exactly 3-5 products that directly address the user's query.
2.  **Product Details:** For each product, provide:
    *   \`title\`: Full product name.
    *   \`price\`: Approximate price in Rupiah (e.g., "Rp150.000").
    *   \`description\`: A concise, one-sentence description in Bahasa Indonesia highlighting why it's good for the user's concern.
    *   \`image_url\`: A placeholder URL like \`https://placehold.co/300x300.png\`.
    *   \`rating\`: A realistic rating between 4.7 and 5.0.
    *   \`affiliate_link\`: A simulated affiliate link using the provided templates.
3.  **Affiliate Link Templates:**
    *   **Shopee Template:** \`https://shopee.co.id/universal-link?af_click_id=GLOWPILOT_USER&af_siteid=glowpilot&url={ENCODED_PRODUCT_URL}\`
    *   **Tokopedia Template:** \`https://ta.tokopedia.link?af_click_id=GLOWPILOT_USER&af_siteid=glowpilot&url={ENCODED_PRODUCT_URL}\`
4.  **Final Output:**
    *   Return ONLY a valid JSON array of these product objects.
    *   Do not include any products that are out of stock or have a rating below 4.7.
    *   Ensure all text in descriptions is in Bahasa Indonesia.
    *   There should be NO other text, explanations, or markdown in your response. Just the raw JSON array.

# Example JSON Object for a single product:
  {
    "title": "SOMETHINC Niacinamide + Moisture Beet Serum",
    "price": "Rp89.000",
    "description": "Serum niacinamide untuk mengatasi kulit kusam dan mencerahkan wajah.",
    "image_url": "https://placehold.co/300x300.png",
    "rating": "4.9",
    "affiliate_link": "https://shopee.co.id/universal-link?af_click_id=GLOWPILOT_USER&af_siteid=glowpilot&url=https%3A%2F%2Fshopee.co.id%2FSOMETHINC-Niacinamide-Moisture-Beet-Serum-20ml-i.182430981.2829975743"
  }
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
  prompt: (input) => [{ text: catalogPromptTemplate(input.productQuery, input.platform) }],
  model: 'openai/nvidia/llama-3.1-nemotron-70b-instruct',
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
