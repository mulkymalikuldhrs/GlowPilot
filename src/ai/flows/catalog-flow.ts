
'use server';
/**
 * @fileOverview An AI agent for generating skincare product recommendations.
 *
 * - getCatalogProducts - A function that provides product data based on a query.
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
You are GlowPilot Catalog Agent, an expert AI that recommends skincare products from e-commerce sites like ${platform} and structures the data for GlowPilot's catalog.

# Goal:
Recommend 4-6 of the most relevant, popular, and highly-rated skincare products that match the user's search query: "${productQuery}". For each product, create a data object with search-based links.

# Instructions:
1.  **Product Knowledge:** Use your knowledge to suggest real, well-known skincare products available in the Indonesian market that are a great match for "${productQuery}".
2.  **Data Extraction:** For each product you recommend, extract or generate the following information:
    *   **title:** The full, correct product name.
    *   **price:** A realistic estimated price in Indonesian Rupiah (Rp). Format: "RpXX.XXX". This is an estimate and may vary.
    *   **description:** A very brief, one-sentence compelling description in Bahasa Indonesia.
    *   **image_url:** Leave this as an empty string "". The app will display a product placeholder.
    *   **rating:** A realistic user rating between 4.5 and 5.0 based on general market knowledge.
    *   **affiliate_link:** Generate a search URL on the specified platform so users can find the product. Do NOT fabricate specific product page URLs.
3.  **Search Link Generation (Crucial):**
    *   Instead of fabricating direct product URLs, generate a search query link that users can click to find the product on the platform.
    *   **Shopee Search Template:** \`https://shopee.co.id/search?keyword={URL_ENCODED_PRODUCT_NAME}\`
    *   **Tokopedia Search Template:** \`https://www.tokopedia.com/search?q={URL_ENCODED_PRODUCT_NAME}\`
    *   URL-encode the product name before inserting it into the template.
4.  **Final Output:**
    *   Return ONLY a valid JSON array of these product objects.
    *   Do not include any products that are out of stock or have a rating below 4.5.
    *   Ensure all text in descriptions is in Bahasa Indonesia.
    *   There should be NO other text, explanations, or markdown in your response. Just the raw JSON array.
    *   Set image_url to an empty string "" for every product.

# Example JSON Object for a single product:
  {
    "title": "SOMETHINC Niacinamide + Moisture Beet Serum",
    "price": "Rp89.000",
    "description": "Serum niacinamide untuk mengatasi kulit kusam dan mencerahkan wajah.",
    "image_url": "",
    "rating": "4.9",
    "affiliate_link": "https://shopee.co.id/search?keyword=SOMETHINC%20Niacinamide%20Moisture%20Beet%20Serum"
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
