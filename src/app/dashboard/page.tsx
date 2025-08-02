
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Scale, User, Wand2, ShieldCheck, Soup, Sun, LineChart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Selamat Datang, Mulky!</h1>
                <p className="mt-2 text-muted-foreground">Ini adalah ringkasan perjalanan kulit sehat Anda. Mari kita mulai!</p>
            </div>
            <Button asChild>
                <Link href="/dermatologist">
                    Mulai Analisis Baru <Wand2 className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         <Card className="glass-card transform transition-transform duration-300 hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Profil Kulit Anda</CardTitle>
                    <User className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <CardDescription>Personalisasi untuk hasil terbaik.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Tipe Kulit:</strong> <span className="text-foreground">Kombinasi</span></p>
                    <p><strong>Masalah Utama:</strong> <span className="text-foreground">Jerawat, Kemerahan</span></p>
                </div>
                 <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                    <Link href="/profile">
                        Lengkapi Profil <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="glass-card transform transition-transform duration-300 hover:-translate-y-1 md:col-span-2">
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Jurnal Perawatan Kulit</CardTitle>
                    <LineChart className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <CardDescription>Lacak progres, rutinitas, dan tujuan kulit Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Tujuan: Kurangi Jerawat</span>
                            <span className="text-sm font-bold text-primary" style={{color: 'var(--primary-optimistic)'}}>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">18 dari 30 hari selesai</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Rutinitas Hari Ini (AM/PM)</p>
                        <p className="text-xs text-muted-foreground">Selesai: 1 dari 2</p>
                    </div>
                </div>
                 <Button className="mt-4 w-full" asChild>
                    <Link href="/tracking">
                        Buka Jurnal Pelacakan <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <Card className="glass-card lg:col-span-2">
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Akses Fitur AI Canggih</CardTitle>
                    <Sparkles className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <CardDescription>Dapatkan analisis mendalam dan solusi dari para ahli AI kami.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button className="w-full justify-start h-12" asChild>
                     <Link href="/dermatologist">
                        <Wand2 className="mr-2 h-5 w-5"/> AI Dermatologist Umum
                    </Link>
                </Button>
                 <Button className="w-full justify-start h-12" variant="secondary" asChild>
                    <Link href="/specialists">
                        <ShieldCheck className="mr-2 h-5 w-5"/> Konsultasi Spesialis
                    </Link>
                </Button>
                 <Button className="w-full justify-start h-12" variant="secondary" asChild>
                    <Link href="/compare">
                        <Scale className="mr-2 h-5 w-5"/> Perbandingan Produk
                    </Link>
                </Button>
                 <Button className="w-full justify-start h-12" variant="secondary" asChild>
                    <Link href="/catalog">
                        <Scale className="mr-2 h-5 w-5"/> Katalog Produk
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Tips Perawatan Hari Ini</CardTitle>
                    <Lightbulb className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <CardDescription>Satu langkah kecil setiap hari.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground/90">
                    "Jangan lupa gunakan tabir surya bahkan saat cuaca mendung. Sinar UV tetap dapat menembus awan dan merusak kulit Anda."
                </p>
                 <p className="text-sm text-foreground/90 mt-4">
                    "Minum cukup air membantu menjaga elastisitas dan hidrasi kulit dari dalam."
                </p>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
