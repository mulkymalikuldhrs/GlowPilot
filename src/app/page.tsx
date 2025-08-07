
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConsentModal } from "@/components/common/ConsentModal";
import { Button } from "@/components/ui/button";
import { Bot, FileText, ShoppingBag, Sparkles, Star, Target } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { Logo } from "@/components/logo";

const testimonials = [
    {
        name: "Anya",
        city: "Jakarta",
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "woman smiling",
        text: "GlowPilot benar-benar mengubah cara saya merawat kulit. Diagnosis AI-nya sangat akurat dan rekomendasi produknya luar biasa!"
    },
    {
        name: "Budi",
        city: "Surabaya",
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "man with glasses",
        text: "Sebagai pria, saya sering bingung soal skincare. Aplikasi ini membuatnya jadi sangat mudah dan praktis. Kulit saya jauh lebih baik."
    },
     {
        name: "Citra",
        city: "Bandung",
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "woman with hijab",
        text: "Fitur progress tracker-nya sangat memotivasi. Saya bisa lihat perkembangan kulit saya setiap minggu. Sangat merekomendasikan!"
    }
];

const features = [
    {
        icon: Bot,
        title: "Diagnosis oleh Dokter Spesialis AI",
        description: "Dapatkan analisis mendalam tentang masalah kulit Anda dari AI canggih kami, kapan saja, di mana saja."
    },
    {
        icon: FileText,
        title: "Rencana Perawatan Pribadi",
        description: "Terima rutinitas pagi dan malam yang disesuaikan, lengkap dengan rekomendasi produk yang tepat."
    },
    {
        icon: Target,
        title: "Lacak Kemajuan Anda",
        description: "Tetapkan tujuan dan pantau perkembangan kulit Anda secara visual dengan fitur pelacakan kami yang mudah digunakan."
    }
]

export default function LandingPage() {
    const router = useRouter();
    const [showConsent, setShowConsent] = useState(false);
    
    useEffect(() => {
        const consent = localStorage.getItem('consentAccepted');
        if (consent !== 'true') {
            setShowConsent(true);
        }
    }, []);

    const handleStart = () => {
        const consent = localStorage.getItem('consentAccepted');
        if (consent === 'true') {
            router.push('/chat');
        } else {
            setShowConsent(true);
        }
    };
    
    const handleConsent = () => {
        localStorage.setItem('consentAccepted', 'true');
        setShowConsent(false);
        router.push('/chat');
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <ConsentModal isOpen={showConsent} onAccept={handleConsent} />
            
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex items-center gap-2">
                       <Logo />
                       <span className="font-bold">GlowPilot</span>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <ThemeSwitcher />
                         <Button onClick={handleStart} className="hidden md:flex">Mulai Sekarang</Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative w-full py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto text-center px-4">
                        <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-2 mb-6">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{fontFamily: 'Sora, sans-serif'}}>
                            Wujudkan Kulit Impian Anda
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                            Dapatkan analisis kulit, rekomendasi produk, dan rencana perawatan yang dipersonalisasi dari dokter AI kami.
                        </p>
                        <div className="mt-8">
                             <Button 
                                size="lg" 
                                className="h-12 text-base" 
                                onClick={handleStart}
                            >
                                Mulai Konsultasi Gratis
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-16 md:py-24 bg-background/50">
                    <div className="container mx-auto px-4">
                         <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold" style={{fontFamily: 'Sora, sans-serif'}}>Cara Kerja GlowPilot</h2>
                            <p className="mt-2 text-muted-foreground md:text-lg">Hanya dalam 3 langkah mudah menuju kulit sehat.</p>
                        </div>
                        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 md:grid-cols-3">
                           {features.map((feature, i) => (
                               <div key={i} className="relative flex flex-col items-center text-center gap-4">
                                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                       <feature.icon className="h-8 w-8 text-primary"/>
                                   </div>
                                   <h3 className="text-xl font-bold">{feature.title}</h3>
                                   <p className="text-muted-foreground">{feature.description}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="w-full py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-2" style={{fontFamily: 'Sora, sans-serif'}}>Dipercaya oleh Ribuan Orang</h2>
                         <div className="flex items-center justify-center gap-2 mb-10">
                            <div className="flex text-yellow-400">
                               <Star className="w-5 h-5 fill-current"/>
                               <Star className="w-5 h-5 fill-current"/>
                               <Star className="w-5 h-5 fill-current"/>
                               <Star className="w-5 h-5 fill-current"/>
                               <Star className="w-5 h-5 fill-current"/>
                            </div>
                            <p className="text-muted-foreground"><span className="font-bold text-foreground">4.9</span> dari 5.0 (2,492 reviews)</p>
                         </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((t, i) => (
                                 <Card key={i} className="glass-card">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full" data-ai-hint={t.dataAiHint}/>
                                            <div>
                                                <p className="font-bold">{t.name}</p>
                                                <p className="text-sm text-muted-foreground">{t.city}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground/80">"{t.text}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            
            <footer className="w-full border-t border-border/40">
                 <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <Logo/>
                        <p className="text-sm text-muted-foreground">&copy; 2024 GlowPilot. Hak Cipta Dilindungi.</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 md:mt-0">
                        Dikembangkan oleh <a href="mailto:mulkymlikuldhr@mail.com" className="font-semibold hover:text-primary">Mulky Malikul Dhaher</a>
                    </p>
                 </div>
            </footer>
        </div>
    );
}
