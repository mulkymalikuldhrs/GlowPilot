
'use client';

import { getCatalogProducts } from '@/ai/flows/catalog-flow';
import type { ProductSchema } from '@/ai/schemas/catalog-schemas';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Search, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type {z} from 'genkit';

type Product = z.infer<typeof ProductSchema>;

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('skincare');
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getCatalogProducts({ productQuery: searchQuery });
        setProducts(result);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({
          title: 'Gagal Memuat Produk',
          description:
            'Terjadi kesalahan saat mengambil data produk. Silakan coba lagi.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, toast]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="w-full glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={product.image_url}
            alt={product.title}
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
            unoptimized
          />
          <Badge className="absolute top-2 right-2 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            {product.rating}
          </Badge>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-base truncate">{product.title}</h3>
          <p className="text-sm text-muted-foreground">{product.price}</p>
          <Button
            className="w-full text-white bg-gradient-to-r from-primary to-primary-optimistic"
            asChild
          >
            <Link href={product.affiliate_link} target="_blank">
              Beli Sekarang
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const categories = ['Semua', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen'];

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchQuery(query || 'skincare');
  };

  return (
    <div className="p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-xl font-bold">Katalog Produk</h1>
      </header>

      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <Input
          name="search"
          placeholder="Cari serum, pelembap..."
          className="pr-10"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <Tabs defaultValue="Semua" className="w-full mt-4">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Semua">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))
              : products.map((p) => <ProductCard key={p.title} product={p} />)}
          </div>
        </TabsContent>
         {/* Add filtered content later */}
         {categories.slice(1).map(cat => (
             <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {loading
                    ? Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full" />
                        ))
                    : products.filter(p => p.description.toLowerCase().includes(cat.toLowerCase())).map((p) => <ProductCard key={p.title} product={p} />)}
                </div>
            </TabsContent>
         ))}
      </Tabs>
    </div>
  );
}
