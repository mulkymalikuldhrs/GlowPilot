import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, MessageCircle, Scan, Scale, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      <section className="text-center pt-16 md:pt-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          GlowPilot Copilot
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Asisten AI personal Anda untuk kulit yang lebih sehat. Dapatkan diagnosis akurat, rekomendasi rutin, dan perbandingan produk cerdas dalam satu platform.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
            <Link href="/dermatologist">
              Mulai Diagnosis <Wand2 className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold">
            <Link href="#features">
              Pelajari Lebih Lanjut
            </Link>
          </Button>
        </div>
      </section>

      <section id="features" className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Semua Kebutuhan Kulit Anda, dalam Satu Aplikasi</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Dari analisis hingga rekomendasi, kami hadir untuk Anda.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="glass-card transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader className="flex-row items-center gap-4">
               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Wand2 className="h-7 w-7" />
                </div>
              <div>
                <CardTitle className="text-2xl">AI Dermatologist</CardTitle>
                <CardDescription>
                  Diagnosis & rutinitas perawatan personal.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/20">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="AI Dermatologist" 
                  fill 
                  className="object-cover"
                  data-ai-hint="skincare analysis"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader className="flex-row items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Scale className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-2xl">Perbandingan Produk</CardTitle>
                <CardDescription>
                  Temukan formulasi & harga terbaik.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
               <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/20">
                  <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Product Comparison" 
                    fill 
                    className="object-cover"
                    data-ai-hint="skincare products"
                  />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Bagaimana Caranya?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Dapatkan rencana perawatan kulit personal dalam 3 langkah mudah.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">1. Deskripsikan</h3>
            <p className="text-muted-foreground">Ceritakan kondisi, tujuan, dan gaya hidup Anda melalui chat, suara, atau foto.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scan className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">2. Analisis</h3>
            <p className="text-muted-foreground">AI copilot kami akan menganalisis input untuk mengidentifikasi masalah dan profil unik kulit Anda.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">3. Rekomendasi</h3>
            <p className="text-muted-foreground">Dapatkan rutinitas AM/PM yang dirancang khusus dengan rekomendasi produk terpercaya.</p>
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Dipercaya oleh Pengguna di Seluruh Dunia</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Jangan hanya percaya kata kami.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"GlowPilot mengubah rutinitas saya sepenuhnya! Diagnosis AI-nya sangat akurat dan rekomendasi produknya benar-benar tepat sasaran."</p>
              <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="female avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah L.</p>
                  <p className="text-sm text-muted-foreground">Pecinta Skincare</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"Sebagai orang yang awam soal skincare, aplikasi ini adalah penyelamat. Simpel, cepat, dan hasilnya sudah terlihat."</p>
               <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="male avatar" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Michael B.</p>
                  <p className="text-sm text-muted-foreground">Profesional Sibuk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"Alat yang fantastis untuk edukasi skincare yang mudah diakses. Memberdayakan pengguna untuk membuat keputusan yang tepat."</p>
               <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person face" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Dr. Evelyn Reed</p>
                  <p className="text-sm text-muted-foreground">Dermatologis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="glass-card p-10 md:p-16 rounded-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Siap untuk Kulit Impian Anda?</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Berhentilah menebak-nebak dan mulailah melihat hasilnya. Dapatkan analisis kulit dan rutinitas personal gratis dari GlowPilot hari ini.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
              <Link href="/dermatologist">
                Dapatkan Analisis Gratis Saya
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

       <footer className="text-center py-8 border-t border-border/20">
         <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GlowPilot oleh Mulky Malikul Dhaher. Untuk dunia yang lebih bersinar. ✨</p>
       </footer>
    </div>
  );
}
