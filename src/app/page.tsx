
'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  const features = [
    "Analisis Kulit Berbasis AI",
    "Rekomendasi Produk Personal",
    "Perbandingan Produk Cerdas",
    "Pelacakan Kemajuan Kulit",
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Panduan Cerdas untuk Kulit Sehat & Bercahaya
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              GlowPilot adalah co-pilot perawatan kulit pribadi Anda. Dapatkan diagnosis instan, rekomendasi produk yang dipersonalisasi, dan lacak perjalanan kulit Anda dengan kekuatan AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Mulai Gratis <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                 <Link href="/compare">
                    Lihat Fitur
                </Link>
              </Button>
            </div>
             <p className="text-sm mt-4 text-muted-foreground text-center md:text-left">
                Sudah punya akun? <Link href="/login" className="font-semibold text-primary">Masuk di sini.</Link>
            </p>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="https://placehold.co/600x600.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="rounded-3xl shadow-2xl shadow-primary/20 object-cover aspect-square"
              data-ai-hint="skincare products"
            />
          </div>
        </section>

        <section className="bg-secondary/50 py-20">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold tracking-tight">Semua yang Anda Butuhkan untuk Kulit Terbaik Anda</h2>
                 <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Dari analisis mendalam hingga perbandingan produk, GlowPilot memberikan alat yang Anda butuhkan untuk membuat keputusan perawatan kulit yang lebih cerdas.
                 </p>
                 <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center gap-3">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                <CheckCircle2 className="h-6 w-6"/>
                            </div>
                            <p className="font-semibold text-center">{feature}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </section>

         <section className="container mx-auto px-4 py-20 md:py-32 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Siap Mengambil Kendali Perawatan Kulit Anda?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Bergabunglah dengan ribuan pengguna yang telah menemukan rutinitas sempurna mereka.
            </p>
            <div className="mt-8">
                 <Button size="lg" asChild className="transform hover:scale-105 transition-transform">
                    <Link href="/signup">
                        Dapatkan Analisis Gratis Anda
                    </Link>
                </Button>
            </div>
        </section>
      </main>
       <footer className="text-center py-6 border-t border-border/20">
         <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GlowPilot. Semua ada di tangan Anda. ✨</p>
       </footer>
    </div>
  );
}
