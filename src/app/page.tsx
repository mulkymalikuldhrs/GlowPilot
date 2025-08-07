
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConsentModal } from "@/components/common/ConsentModal";
import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";

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

    const handleConsent = () => {
        localStorage.setItem('consentAccepted', 'true');
        setShowConsent(false);
        router.push('/chat');
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <ConsentModal isOpen={showConsent} onAccept={handleConsent} />
            
            <header className="absolute top-0 left-0 right-0 p-4 flex justify-end z-10">
                <ThemeSwitcher />
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 -mt-16">
                 <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-24 h-24 mb-6">
                    <Sparkles className="w-12 h-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>
                    Wujudkan Kulit Impian Anda
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto mt-4 text-base md:text-lg">
                    Dapatkan analisis kulit, rekomendasi produk, dan rencana perawatan yang dipersonalisasi dari dokter AI kami.
                </p>
                <div className="mt-8">
                     <Button 
                        size="lg" 
                        className="h-12 text-base" 
                        onClick={() => {
                            const consent = localStorage.getItem('consentAccepted');
                            if (consent === 'true') {
                                router.push('/chat');
                            } else {
                                setShowConsent(true);
                            }
                        }}
                    >
                        Mulai Konsultasi Gratis
                    </Button>
                </div>
            </main>

            <section className="w-full py-12 md:py-20 bg-background/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-2" style={{fontFamily: 'Sora, sans-serif'}}>Dipercaya oleh Ribuan Orang</h2>
                     <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="flex text-yellow-400">
                           <Star className="w-5 h-5 fill-current"/>
                           <Star className="w-5 h-5 fill-current"/>
                           <Star className="w-5 h-5 fill-current"/>
                           <Star className="w-5 h-5 fill-current"/>
                           <Star className="w-5 h-5 fill-current"/>
                        </div>
                        <p className="text-muted-foreground"><span className="font-bold text-foreground">4.9</span> dari 5.0 (2,492 reviews)</p>
                     </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            
            <footer className="w-full py-6 text-center">
                 <p className="text-xs text-muted-foreground">&copy; 2024 GlowPilot. Hak Cipta Dilindungi.</p>
            </footer>
        </div>
    );
}
