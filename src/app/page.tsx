
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { CheckCircle, Bot, LineChart, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/logo';

const features = [
    {
        icon: Bot,
        title: "Diagnosis oleh Dokter Spesialis AI",
        description: "Dapatkan analisis mendalam tentang masalah kulit Anda dari dokter AI kami yang dilatih secara khusus."
    },
    {
        icon: Sparkles,
        title: "Rekomendasi Produk Personal",
        description: "Terima saran produk yang disesuaikan, dipilih dari ribuan pilihan berdasarkan kebutuhan unik kulit Anda."
    },
    {
        icon: LineChart,
        title: "Pelacak Kemajuan & Tujuan",
        description: "Pantau perjalanan kesehatan kulit Anda dan lihat hasilnya secara visual dengan sistem pelacakan kami."
    }
];

export default function LandingPage() {
    const { user, isNewUser, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            const redirectPath = isNewUser ? '/onboarding' : '/chat';
            router.replace(redirectPath);
        }
    }, [user, isNewUser, isLoading, router]);


    if (isLoading || user) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                <p className="text-muted-foreground mt-4">Mempersiapkan sesi Anda...</p>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                        <Logo />
                        <span>GlowPilot</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Button asChild>
                            <Link href="/login">Mulai Sekarang</Link>
                        </Button>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32">
                    <div className="container space-y-10 xl:space-y-16 px-4 md:px-6">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-16 items-center">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]" style={{fontFamily: 'Sora, sans-serif'}}>
                                    Dapatkan Kulit Impian Anda dengan Dokter AI Pribadi
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                                    GlowPilot adalah asisten dermatologi virtual Anda, memberikan diagnosis, rekomendasi, dan pelacakan progres yang dipersonalisasi.
                                </p>
                                <div className="space-x-4 mt-6">
                                    <Button asChild size="lg">
                                            <Link href="/login">Mulai Konsultasi Gratis</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="link">
                                        <Link href="/scroll-video">Lihat Cara Kerja</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-[600px] aspect-square rounded-xl shadow-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-24 h-24 mb-6">
                                            <Sparkles className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground/80">GlowPilot AI</h2>
                                        <p className="text-muted-foreground mt-2">Konsultasi Kulit Cerdas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Fitur Utama</div>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{fontFamily: 'Sora, sans-serif'}}>Didesain untuk Kesehatan Kulit Anda</h2>
                                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Dari analisis mendalam hingga rutinitas harian, kami menyediakan semua yang Anda butuhkan untuk mencapai tujuan kulit Anda.
                                    </p>
                                </div>
                            </div>
                            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
                                {features.map((feature, index) => (
                                    <div key={index} className="grid gap-1 text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                                            <feature.icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-bold">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                </section>

                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight" style={{fontFamily: 'Sora, sans-serif'}}>3 Langkah Mudah Menuju Kulit Sehat</h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Ikuti proses sederhana kami untuk memulai perjalanan perawatan kulit Anda hari ini.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <span className="text-2xl font-bold">1</span>
                                </div>
                                <h3 className="text-lg font-bold">Konsultasi</h3>
                                <p className="text-sm text-muted-foreground">Ceritakan masalah kulit Anda kepada dokter AI kami.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <span className="text-2xl font-bold">2</span>
                                </div>
                                <h3 className="text-lg font-bold">Terima Rencana</h3>
                                <p className="text-sm text-muted-foreground">Dapatkan rutinitas dan rekomendasi produk yang dipersonalisasi.</p>
                            </div>
                                <div className="flex flex-col items-center space-y-2">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                                <h3 className="text-lg font-bold">Lacak Progres</h3>
                                <p className="text-sm text-muted-foreground">Pantau kemajuan Anda dan tetap termotivasi.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="community" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{fontFamily: 'Sora, sans-serif'}}>Bergabung dengan Komunitas Kami</h2>
                            <p className="max-w-[600px] text-muted-foreground">
                                Mulai perjalanan perawatan kulit Anda bersama ribuan pengguna yang telah mempercayai GlowPilot sebagai asisten dermatologi virtual mereka.
                            </p>
                            <Button asChild size="lg" className="mt-4">
                                <Link href="/login">Mulai Sekarang — Gratis</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
                <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <div className="container mx-auto text-center text-muted-foreground text-sm">
                    © 2025 GlowPilot Copilot. Dibuat oleh Mulky Malikul Dhaher.
                </div>
            </footer>
        </div>
    );
}
