
'use server';
/**
 * @fileOverview A Genkit tool for searching the product catalog.
 *
 * - productCatalogTool - The tool definition for searching products.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// This is our internal, static product catalog.
// In a real-world, scalable application, this data would come from a database like Firestore.
// The keywords are crucial for the AI to find the right products.
const allProducts = [
    { id: '1', name: 'SOMETHINC Niacinamide 10% Serum', category: 'Serum', keywords: ['niacinamide', 'brightening', 'oily', 'bekas jerawat', 'kusam'] },
    { id: '2', name: 'SK-II Facial Treatment Essence', category: 'Essence', keywords: ['anti-aging', 'glowing', 'dullness', 'pitera', 'mahal', 'penuaan'] },
    { id: '3', name: 'Cetaphil Gentle Skin Cleanser', category: 'Cleanser', keywords: ['sensitive', 'gentle', 'dry', 'semua jenis kulit', 'sensitif', 'kering'] },
    { id: '4', name: 'The Ordinary AHA 30% + BHA 2% Peeling Solution', category: 'Exfoliant', keywords: ['acne', 'texture', 'pores', 'eksfoliasi', 'merah', 'jerawat', 'pori-pori'] },
    { id: '5', name: 'La Roche-Posay Anthelios Sunscreen', category: 'Sunscreen', keywords: ['sun protection', 'oily', 'sensitive', 'tabir surya', 'minyak'] },
    { id: '6', name: 'Kiehl\'s Ultra Facial Cream', category: 'Moisturizer', keywords: ['hydration', 'dry', 'all skin types', 'pelembap', 'kering'] },
    { id: '7', name: 'Avoskin Miraculous Retinol Toner', category: 'Toner', keywords: ['retinol', 'anti-aging', 'fine lines', 'jerawat', 'penuaan'] },
    { id: '8', name: 'COSRX Low pH Good Morning Gel Cleanser', category: 'Cleanser', keywords: ['oily', 'acne-prone', 'gentle', 'ph rendah', 'jerawat', 'minyak'] },
    { id: '9', name: 'Laneige Water Sleeping Mask', category: 'Mask', keywords: ['hydration', 'overnight', 'glowing', 'kering', 'dehidrasi'] },
    { id: '10', name: 'Scarlett Whitening Body Lotion', category: 'Lotion', keywords: ['brightening', 'body care', 'whitening', 'mencerahkan', 'badan'] },
    { id: '11', name: 'ElsheSkin Acne Treatment Serum', category: 'Serum', keywords: ['acne', 'jerawat', 'salicylic acid', 'berjerawat'] },
    { id: '12', name: 'Whitelab Brightening Face Serum', category: 'Serum', keywords: ['brightening', 'niacinamide', 'kusam', 'mencerahkan'] },
    { id: '13', name: 'Emina Bright Stuff Face Wash', category: 'Cleanser', keywords: ['gentle', 'brightening', 'remaja', 'pembersih', 'mencerahkan'] },
    { id: '14', name: 'Wardah UV Shield Essential Sunscreen Gel', category: 'Sunscreen', keywords: ['sunscreen', 'tabir surya', 'all skin types', 'ringan'] },
];


export const productCatalogTool = ai.defineTool(
  {
    name: 'productCatalogTool',
    description: 'Search the internal product catalog for skincare products based on a query. Returns a list of suitable products with their IDs, names, and categories.',
    inputSchema: z.object({
        query: z.string().describe('A search query describing the desired product, e.g., "serum for oily skin", "gentle cleanser for sensitive skin", or "anti-aging retinol". The query should be in English or Indonesian.')
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
    })),
  },
  async (input) => {
    console.log(`[ProductCatalogTool] Called with query: "${input.query}"`);
    const query = input.query.toLowerCase();
    const queryWords = query.split(/\s+/).filter(Boolean); // Split by space and remove empty strings

    // This simulates a database search by filtering the `allProducts` array.
    // It checks if all words in the search query are present in the product's keywords or name.
    const results = allProducts.filter(product => {
        const productText = `${product.name} ${product.category} ${product.keywords.join(' ')}`.toLowerCase();
        // Check if all words in the query are present in the product text
        return queryWords.every(word => productText.includes(word));
    });

    console.log(`[ProductCatalogTool] Found ${results.length} products for query "${input.query}".`);
    // Return a subset if too many results, or an empty array if none.
    return results.slice(0, 3); // Return max 3 products to keep recommendations concise
  }
);
