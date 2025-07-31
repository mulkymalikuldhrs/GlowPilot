'use client';

import { compareProducts, type ProductComparisonOutput } from "@/ai/flows/product-comparison";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, Scale, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ComparePage() {
    const [product1, setProduct1] = useState('');
    const [product2, setProduct2] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ProductComparisonOutput | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product1 || !product2) {
            toast({
                title: 'Kolom Belum Terisi',
                description: 'Silakan masukkan kedua nama produk.',
                variant: 'destructive'
            });
            return;
        }
        setLoading(true);
        setResult(null);

        try {
            const res = await compareProducts({ product1, product2 });
            setResult(res);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Perbandingan Gagal',
                description: 'Terjadi kesalahan saat membandingkan produk. Silakan coba lagi.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const ResultBadge = ({ label, product }: { label: string | undefined, product: string | undefined }) => {
        if (!label || !product) return null;
        let icon = <Sparkles className="mr-2 h-4 w-4" />;
        // You can customize icons based on labels here if you want
        // if (label === "Nilai Terbaik") icon = ...

        return (
             <div className="mt-2 flex items-center justify-center">
                 <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {icon}
                    <strong>{label}:</strong><span className="ml-1.5">{product}</span>
                </span>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Scale className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Perbandingan Produk</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Bingung memilih produk? Masukkan dua nama produk di bawah ini dan biarkan AI kami memberikan perbandingan mendalam untuk membantu Anda.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="product1">Produk 1</Label>
                            <Input 
                                id="product1" 
                                placeholder="cth., CeraVe Hydrating Cleanser" 
                                value={product1}
                                onChange={(e) => setProduct1(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product2">Produk 2</Label>
                            <Input 
                                id="product2" 
                                placeholder="cth., La Roche-Posay Toleriane Cleanser"
                                value={product2}
                                onChange={(e) => setProduct2(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Membandingkan...
                                    </>
                                ) : (
                                    <>
                                        Bandingkan Produk
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {result && (
                <Card className="mt-8 glass-card">
                    <CardHeader>
                        <CardTitle>Hasil Perbandingan</CardTitle>
                        <CardDescription>Berikut adalah perbandingan yang dihasilkan AI dari <strong>{product1}</strong> dan <strong>{product2}</strong>.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.comparison}</p>
                        
                        <div className="flex flex-col items-center justify-center gap-2 pt-4">
                           <ResultBadge label="Nilai Terbaik" product={result.bestValue} />
                           <ResultBadge label="Pilihan Dermatologis" product={result.dermatologistPick} />
                           <ResultBadge label="Paling Murah" product={result.cheapest} />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button variant="outline" className="w-full">Cek Detail {product1}</Button>
                            <Button variant="outline" className="w-full">Cek Detail {product2}</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
