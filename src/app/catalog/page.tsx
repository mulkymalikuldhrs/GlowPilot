
'use client';

import { getCatalogProducts } from '@/ai/flows/catalog-flow';
import type { ProductSchema } from '@/ai/schemas/catalog-schemas';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Search, Star, MessageSquare, Ghost } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import type {z} from 'genkit';
import { useUser } from '@/hooks/use-user';
import { db } from '@/lib/firebase/client';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

type Product = z.infer<typeof ProductSchema>;

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const { user, isLoading: isUserLoading } = useUser();
  const { toast } = useToast();

  const loading = isPending || isUserLoading;

  useEffect(() => {
    const fetchLastConsultationAndProducts = async () => {
      if (!user) {
        setInitialPrompt('skincare populer di Indonesia');
        return;
      }

      const consultationsRef = collection(db, 'users', user.uid, 'consultations');
      const q = query(consultationsRef, orderBy('createdAt', 'desc'), limit(1));
      
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setInitialPrompt(null); // Set to null to show "start consultation" message
        } else {
          const lastConsultation = querySnapshot.docs[0].data();
          const diagnosisSummary = lastConsultation.diagnosis?.diagnosis || 'masalah kulit umum';
          const prompt = `Produk skincare yang direkomendasikan untuk seseorang dengan diagnosis: ${diagnosisSummary}`;
          setInitialPrompt(prompt);
        }
      } catch (error) {
        console.error("Error fetching last consultation: ", error);
        setInitialPrompt('skincare populer di Indonesia'); // Fallback prompt
      }
    };

    fetchLastConsultationAndProducts();
  }, [user]);

  useEffect(() => {
    if (!initialPrompt) {
        setProducts([]);
        return;
    };

    const fetchProducts = async () => {
      startTransition(async () => {
        try {
          const result = await getCatalogProducts({ productQuery: initialPrompt });
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
  }, [initialPrompt, toast]);

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
            data-ai-hint="skincare product"
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

  const renderContent = () => {
    if (loading) {
       return (
            <div className="grid grid-cols-2 gap-4 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                ))}
            </div>
       )
    }

    if (!initialPrompt && !isUserLoading) {
      return (
        <Card className="glass-card mt-6">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">Buka Rekomendasi Pribadi Anda</h3>
                <p className="text-sm text-muted-foreground mt-1">Mulai konsultasi pertama Anda dengan dokter AI untuk mendapatkan rekomendasi produk yang disesuaikan di sini.</p>
                <Button asChild variant="secondary" className="mt-4">
                    <Link href="/chat">Mulai Konsultasi</Link>
                </Button>
            </CardContent>
        </Card>
      );
    }
    
    if (products.length === 0) {
        return (
             <Card className="glass-card mt-6">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <Ghost className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold">Produk Tidak Ditemukan</h3>
                    <p className="text-sm text-muted-foreground mt-1">Kami tidak dapat menemukan produk yang cocok saat ini. Silakan coba lagi nanti.</p>
                </CardContent>
            </Card>
        )
    }

    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        {products.map((p) => (
          <ProductCard key={`${p.title}-${p.affiliate_link}`} product={p} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-xl font-bold">Rekomendasi Produk</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Produk yang disarankan AI berdasarkan perjalanan perawatan kulit Anda.
        </p>
      </header>

      {renderContent()}
    </div>
  );
}

