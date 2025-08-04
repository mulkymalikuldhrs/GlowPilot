
'use server';
/**
 * @fileOverview A Genkit tool for searching the product catalog.
 *
 * - productCatalogTool - The tool definition for searching products.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Dummy product data - in a real application, this would come from a database.
const allProducts = [
    { id: '1', name: 'SOMETHINC Niacinamide 10% Serum', category: 'Serum', keywords: ['niacinamide', 'brightening', 'oily'] },
    { id: '2', name: 'SK-II Facial Treatment Essence', category: 'Essence', keywords: ['anti-aging', 'glowing', 'dullness'] },
    { id: '3', name: 'Cetaphil Gentle Skin Cleanser', category: 'Cleanser', keywords: ['sensitive', 'gentle', 'dry'] },
    { id: '4', name: 'The Ordinary AHA 30% + BHA 2% Peeling Solution', category: 'Exfoliant', keywords: ['acne', 'texture', 'pores'] },
    { id: '5', name: 'La Roche-Posay Anthelios Sunscreen', category: 'Sunscreen', keywords: ['sun protection', 'oily', 'sensitive'] },
    { id: '6', name: 'Kiehl\'s Ultra Facial Cream', category: 'Moisturizer', keywords: ['hydration', 'dry', 'all skin types'] },
    { id: '7', name: 'Avoskin Miraculous Retinol Toner', category: 'Toner', keywords: ['retinol', 'anti-aging', 'fine lines'] },
];


export const productCatalogTool = ai.defineTool(
  {
    name: 'productCatalogTool',
    description: 'Search the product catalog for skincare products based on a query. Returns a list of suitable products.',
    inputSchema: z.object({ 
        query: z.string().describe('A search query describing the desired product, e.g., "serum for oily skin" or "gentle cleanser".') 
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
    })),
  },
  async (input) => {
    console.log(`Tool called with query: ${input.query}`);
    const query = input.query.toLowerCase();
    
    // In a real app, this would be a database query (e.g., using vector search).
    // For now, we'll simulate it with a keyword search.
    const results = allProducts.filter(product => {
        const productText = `${product.name} ${product.category} ${product.keywords.join(' ')}`.toLowerCase();
        return query.split(' ').some(word => productText.includes(word));
    });

    console.log(`Tool found ${results.length} products.`);
    return results;
  }
);
