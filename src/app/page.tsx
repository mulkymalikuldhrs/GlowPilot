import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Scale, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to GlowPilot</h1>
        <p className="text-muted-foreground">Your personal AI skincare assistant. Get started below.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card flex flex-col overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="h-6 w-6" />
              </div>
              <CardTitle>AI Dermatologist</CardTitle>
            </div>
            <CardDescription>
              Get a diagnosis for skin issues and receive personalized AM/PM skincare routine recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="AI Dermatologist" 
                fill 
                className="object-cover"
                data-ai-hint="skincare analysis"
              />
            </div>
          </CardContent>
          <div className="p-6 pt-0">
             <Button asChild className="w-full">
               <Link href="/dermatologist">
                 Start Diagnosis
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          </div>
        </Card>

        <Card className="glass-card flex flex-col overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <Scale className="h-6 w-6" />
                </div>
              <CardTitle>Product Comparison</CardTitle>
            </div>
            <CardDescription>
              Compare skincare products on price, ratings, and ingredients to find your perfect match.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Product Comparison" 
                  fill 
                  className="object-cover"
                  data-ai-hint="skincare products"
                />
            </div>
          </CardContent>
          <div className="p-6 pt-0">
             <Button asChild className="w-full">
               <Link href="/compare">
                 Compare Products
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
