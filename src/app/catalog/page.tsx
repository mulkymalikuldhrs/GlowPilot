
'use client';

import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2, ShoppingBag } from "lucide-react";
import { useState, useTransition } from "react";
import { getCatalogProducts } from "@/ai/flows/catalog-flow";
import { useToast } from "@/hooks/use-toast";
import type { CatalogOutput } from "@/ai/schemas/catalog-schemas";

export default function CatalogPage() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<CatalogOutput>([]);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        startTransition(async () => {
            try {
                const results = await getCatalogProducts({
                    productQuery: query,
                    platform: 'Shopee'
                });
                setProducts(results);
                if (results.length === 0) {
                     toast({
                        title: "Tidak Ada Hasil",
                        description: `Maaf, kami tidak menemukan produk untuk "${query}".`,
                    });
                }
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Pencarian Gagal",
                    description: "Terjadi kesalahan saat mencari produk. Silakan coba lagi.",
                });
            }
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            <header className="p-6 pt-12">
                <h1 className="text-3xl font-bold tracking-tighter mb-2" style={{fontFamily: 'Sora, sans-serif'}}>
                    Katalog Produk
                </h1>
                <p className="text-muted-foreground mb-6">
                    Temukan produk skincare terbaik yang dikurasi oleh AI kami.
                </p>

                <form onSubmit={handleSearch} className="relative">
                    <Input
                        placeholder="Cari produk (misal: serum retinol, moistizer)..."
                        className="pl-10 h-12 rounded-xl glass-card border-0"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cari"}
                    </Button>
                </form>
            </header>

            <main className="flex-1 p-6 pt-0">
                {isPending ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Mencari produk terbaik untuk Anda...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                        <ShoppingBag className="w-16 h-16 mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Mulai cari produk untuk melihat rekomendasi.</p>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
