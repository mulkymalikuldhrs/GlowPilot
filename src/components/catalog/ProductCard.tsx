
'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CatalogOutput } from "@/ai/schemas/catalog-schemas";

interface ProductCardProps {
    product: CatalogOutput[number];
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full glass-card border-0 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                </div>
            </div>

            <CardContent className="p-4 flex-1">
                <h3 className="font-bold text-sm line-clamp-2 mb-1">{product.title}</h3>
                <p className="text-primary font-bold mb-2">{product.price}</p>
                <p className="text-xs text-muted-foreground line-clamp-3">{product.description}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full text-xs" asChild>
                    <Link href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                        Beli Sekarang <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
