
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
You are GlowPilot Catalog Agent, an expert AI that finds skincare products from e-commerce sites like ${platform} and structures the data for GlowPilot's catalog.

# Goal:
Find 4-6 of the most relevant, popular, and highly-rated skincare products that match the user's search query: "${productQuery}". For each product, create a data object and generate a valid affiliate link.

# Instructions:
1.  **Search Simulation:** Use your knowledge to find real, well-known skincare products available in the Indonesian market on ${platform} that are a great match for "${productQuery}".
2.  **Data Extraction:** For each product you find, extract or generate the following information:
    *   **title:** The full, correct product name.
    *   **price:** A realistic price in Indonesian Rupiah (Rp). Format: "RpXX.XXX".
    *   **description:** A very brief, one-sentence compelling description in Bahasa Indonesia.
    *   **image_url:** A placeholder image URL from placehold.co. The image MUST be square (e.g., 300x300).
    *   **rating:** A realistic user rating between 4.7 and 5.0.
    *   **affiliate_link:** The most important step. You MUST generate a valid affiliate link. First, create a plausible original product URL. Then, encode it and insert it into the correct affiliate template.
3.  **Affiliate Link Generation (Crucial):**
    *   First, create a realistic, direct product URL. Example: \`https://shopee.co.id/SOMETHINC-Niacinamide-Moisture-Beet-Serum-20ml-i.182430981.2829975743\`
    *   URL-encode this direct link.
    *   Insert the encoded URL into the affiliate template for the specified platform.
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
