
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CatalogPage() {

    const products = [
        {
            name: "Hydrating Sheet Mask Set",
            category: "Moisturizer",
            image: "https://placehold.co/300x300.png",
            aiHint: "sheet mask product",
            price: "120.000",
            store: "Tokopedia",
            rating: 4.4,
            gradient: "from-blue-500 to-cyan-400"
        },
        {
            name: "Clay Purifying Mask",
            category: "Cleanser",
            image: "https://placehold.co/300x300.png",
            aiHint: "clay mask product",
            price: "55.000",
            store: "Sociolla",
            rating: 4.3,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            name: "Vitamin C Brightening Serum",
            category: "Serum",
            image: "https://placehold.co/300x300.png",
            aiHint: "serum product",
            price: "250.000",
            store: "Shopee",
            rating: 4.8,
            gradient: "from-orange-500 to-amber-400"
        },
        {
            name: "Gentle Face Cleanser",
            category: "Cleanser",
            image: "https://placehold.co/300x300.png",
            aiHint: "face cleanser product",
            price: "85.000",
            store: "Lazada",
            rating: 4.5,
            gradient: "from-green-500 to-teal-400"
        }
    ];

    const ProductCard = ({ product }: { product: typeof products[0] }) => (
        <Card className="w-full glass-card overflow-hidden">
            <CardContent className="p-0">
                <div className="relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full aspect-square object-cover"
                        data-ai-hint={product.aiHint}
                    />
                    <Badge className="absolute top-2 right-2 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        {product.rating}
                    </Badge>
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-bold text-base truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        Rp {product.price}
                        <span className="mx-1">•</span>
                        {product.store}
                    </p>
                     <Button className={`w-full text-white bg-gradient-to-r ${product.gradient}`}>
                        Beli di {product.store}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const categories = ["Semua", "Cleanser", "Serum", "Moisturizer"];

    return (
        <div className="p-4">
            <header className="w-full flex items-center justify-center relative py-4">
                <Link href="/dashboard" className="absolute left-0">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold">Rekomendasi Produk</h1>
            </header>

            <Tabs defaultValue="Semua" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-4">
                    {categories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
                </TabsList>
                
                {categories.map(cat => (
                     <TabsContent key={cat} value={cat}>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {products
                                .filter(p => cat === "Semua" || p.category === cat)
                                .map(p => <ProductCard key={p.name} product={p} />)
                            }
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
