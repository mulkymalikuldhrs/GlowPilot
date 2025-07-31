import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, MessageCircle, Scan, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      <section className="text-center pt-16 md:pt-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-accent-foreground">
          GlowPilot Copilot
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Temukan potensi terbaik kulit Anda. Analisis cerdas, rekomendasi ahli, dan perbandingan produk dalam satu platform revolusioner.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold w-full sm:w-auto">
            <Link href="/dermatologist">
              Mulai Analisis Gratis <Wand2 className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-semibold w-full sm:w-auto">
            <Link href="#features">
              Pelajari Fitur
            </Link>
          </Button>
        </div>
      </section>

      <section id="features" className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Solusi Cerdas untuk Kulit Sehat</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Dari diagnosis hingga perawatan, kami memandu setiap langkah Anda dengan teknologi AI terdepan.</p>
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
                  Dapatkan diagnosis kulit dan rutinitas perawatan yang dipersonalisasi.
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
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Scan className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-2xl">Perbandingan Produk</CardTitle>
                <CardDescription>
                  Bandingkan harga, rating, dan bahan untuk menemukan produk terbaik.
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
          <h2 className="text-4xl font-bold tracking-tight">Bagaimana Cara Kerjanya?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Dapatkan rencana perawatan kulit yang dipersonalisasi dalam tiga langkah mudah.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">1. Ceritakan Kondisi Anda</h3>
            <p className="text-muted-foreground">Jelaskan masalah kulit Anda melalui chat, suara, atau unggah foto untuk analisis visual.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scan className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">2. Analisis oleh AI</h3>
            <p className="text-muted-foreground">Copilot kami akan menganalisis informasi untuk mengidentifikasi masalah dan profil kulit unik Anda.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mt-2">3. Terima Rekomendasi</h3>
            <p className="text-muted-foreground">Dapatkan rutinitas AM/PM lengkap dengan rekomendasi produk yang dirancang khusus untuk Anda.</p>
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Dipercaya oleh Para Pengguna</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Lihat bagaimana GlowPilot mengubah cara mereka merawat kulit.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"Diagnosis AI-nya sangat akurat! Saya akhirnya menemukan rutinitas yang benar-benar bekerja untuk kulit sensitif saya. Terima kasih, GlowPilot!"</p>
              <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Amanda S." data-ai-hint="female avatar" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Amanda S.</p>
                  <p className="text-sm text-muted-foreground">Penggiat Skincare</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"Sebagai seorang profesional yang sibuk, fitur perbandingan produk sangat menghemat waktu saya. Saya bisa langsung menemukan produk terbaik tanpa riset berjam-jam."</p>
               <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Reza P." data-ai-hint="male avatar" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Reza P.</p>
                  <p className="text-sm text-muted-foreground">Tech Enthusiast</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card p-2">
            <CardContent className="pt-6">
              <p className="text-base text-foreground/90">"Platform yang luar biasa untuk edukasi perawatan kulit. Memberdayakan pengguna untuk mengambil keputusan yang cerdas tentang kesehatan kulit mereka."</p>
               <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Evelyn" data-ai-hint="person face" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Dr. Evelyn</p>
                  <p className="text-sm text-muted-foreground">Dermatologis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="glass-card p-10 md:p-16 rounded-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Siap untuk Transformasi Kulit Anda?</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tinggalkan keraguan dan mulailah perjalanan Anda menuju kulit sehat. Dapatkan analisis dan rutinitas personal gratis dari GlowPilot hari ini.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
              <Link href="/dermatologist">
                Coba GlowPilot Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

       <footer className="text-center py-8 border-t border-border/20">
         <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GlowPilot. Dibangun dengan visi untuk kulit yang lebih cerah. ✨</p>
       </footer>
    </div>
  );
}
