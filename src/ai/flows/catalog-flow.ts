
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
Kamu adalah GlowPilot Catalog Agent, AI spesialis yang bertugas menambahkan produk skincare dari ${platform} ke katalog GlowPilot.

# Tujuan:
Ambil produk skincare yang sesuai dengan kata kunci: "${productQuery}", lalu buat data produk dan hasilkan link affiliate yang valid.

# Langkah:
1. Cari 3–5 produk terbaik dari platform ${platform} yang relevan.
2. Ambil informasi berikut:
   - Nama Produk
   - Harga
   - Deskripsi Singkat
   - Link Gambar Produk
   - Rating
   - Link Asli Produk
3. Konversi link asli menjadi link affiliate GlowPilot (gunakan template berikut sesuai platform):
   - Shopee: https://shopee.co.id/universal-link?af_click_id=YOUR_AFF_ID&af_siteid=YOUR_SITE_ID&url={encoded_product_url}
   - Tokopedia: https://ta.tokopedia.link?af_click_id=YOUR_AFF_ID&af_siteid=YOUR_SITE_ID&url={encoded_product_url}
4. Tulis hasil akhir sebagai JSON array seperti ini:

[
  {
    "title": "SOMETHINC Niacinamide + Moisture Beet Serum",
    "price": "Rp89.000",
    "description": "Serum dengan kandungan niacinamide untuk mengatasi kulit kusam dan mencerahkan wajah.",
    "image_url": "https://cf.shopee.co.id/file/abcdef123456.jpg",
    "rating": "4.9",
    "affiliate_link": "https://shopee.co.id/universal-link?af_click_id=XXXX&url=..."
  }
]

# Catatan:
- Gunakan bahasa Indonesia.
- Hanya ambil produk yang rating-nya 4.7 ke atas.
- Jangan tampilkan produk tanpa affiliate link.
- Link affiliate HARUS diarahkan dari link asli yang dikonversi, bukan link palsu.

Tampilkan hasilnya dengan format JSON valid saja, tanpa penjelasan.
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
