
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
import { useEffect, useState, useTransition } from 'react';
import type {z} from 'genkit';

type Product = z.infer<typeof ProductSchema>;

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('skincare populer');
  const [activeTab, setActiveTab] = useState('Semua');
  const { toast } = useToast();

  const loading = isPending;

  useEffect(() => {
    const fetchProducts = async () => {
      startTransition(async () => {
        try {
          const query = activeTab === 'Semua' ? searchQuery : `${activeTab} ${searchQuery}`;
          const result = await getCatalogProducts({ productQuery: query });
          setProducts(result);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          toast({
            title: 'Gagal Memuat Produk',
            description:
              'Terjadi kesalahan saat mengambil data produk. Silakan coba lagi.',
            variant: 'destructive',
          });
          setProducts([]); // Clear products on error
        }
      });
    };

    fetchProducts();
  }, [searchQuery, activeTab, toast]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="w-full glass-card overflow-hidden flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative">
          <Image
            src={product.image_url}
            alt={product.title}
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
            unoptimized
          />
          <Badge className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white">
            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            {product.rating}
          </Badge>
        </div>
        <div className="p-4 space-y-2 flex flex-col flex-grow">
          <h3 className="font-bold text-sm leading-snug flex-grow">{product.title}</h3>
          <p className="text-sm text-muted-foreground font-semibold">{product.price}</p>
          <Button
            className="w-full text-primary-foreground bg-primary"
            asChild
          >
            <Link href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
              Beli Sekarang
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const categories = ['Semua', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Toner'];

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchQuery(query || 'skincare populer');
  };

  const renderProductGrid = (filteredProducts: Product[]) => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full" />
      ));
    }
    if (filteredProducts.length === 0) {
      return (
        <div className="col-span-2 text-center text-muted-foreground py-10">
            <p>Oops! Produk tidak ditemukan.</p>
            <p className="text-xs">Coba kata kunci lain atau periksa kembali nanti.</p>
        </div>
      );
    }
    return filteredProducts.map((p) => (
      <ProductCard key={`${p.title}-${p.affiliate_link}`} product={p} />
    ));
  }


  return (
    <div className="p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-xl font-bold">Katalog Produk</h1>
        <p className="text-muted-foreground text-sm mt-1">Temukan produk skincare terbaik untukmu.</p>
      </header>

      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <Input
          name="search"
          placeholder="Cari serum, pelembap..."
          className="pr-10"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          disabled={loading}
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} disabled={loading}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
                {renderProductGrid(products)}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
