
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Lightbulb, Scale, User, Wand2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Selamat Datang, Mulky!</h1>
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
         <Card className="glass-card transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Profil Kulit Anda</CardTitle>
                    <User className="h-6 w-6 text-primary"/>
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
        <Card className="glass-card transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Akses Cepat</CardTitle>
                    <Wand2 className="h-6 w-6 text-primary"/>
                </div>
                <CardDescription>Langsung ke fitur favorit Anda.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Button className="w-full justify-start" asChild>
                     <Link href="/dermatologist">
                        <Wand2 className="mr-2 h-4 w-4"/> AI Dermatologist
                    </Link>
                </Button>
                 <Button className="w-full justify-start" variant="secondary" asChild>
                    <Link href="/compare">
                        <Scale className="mr-2 h-4 w-4"/> Perbandingan Produk
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="glass-card transform hover:-translate-y-2 transition-transform duration-300 md:col-span-2 lg:col-span-1">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Tips Perawatan Hari Ini</CardTitle>
                    <Lightbulb className="h-6 w-6 text-primary"/>
                </div>
                <CardDescription>Satu langkah kecil setiap hari.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground/90">
                    "Jangan lupa gunakan tabir surya bahkan saat cuaca mendung. Sinar UV tetap dapat menembus awan dan merusak kulit Anda."
                </p>
            </CardContent>
        </Card>
      </section>

      <section>
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>Riwayat Aktivitas Terbaru</CardTitle>
                <CardDescription>Lihat kembali diagnosis dan perbandingan terakhir Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-4">
                            <Activity className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="font-semibold">Diagnosis: Jerawat Ringan</p>
                                <p className="text-xs text-muted-foreground">3 hari yang lalu</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/history/1">Lihat Detail</Link>
                        </Button>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-4">
                            <Scale className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="font-semibold">Perbandingan: CeraVe vs La Roche-Posay</p>
                                <p className="text-xs text-muted-foreground">5 hari yang lalu</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/history/2">Lihat Detail</Link>
                        </Button>
                    </div>
                </div>
                <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link href="/history">
                        Lihat Semua Riwayat
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
