
'use client';

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ConsentModal } from "@/components/common/ConsentModal";
import { useEffect, useState } from "react";

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
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
             <div className="absolute top-0 left-0 w-full h-full z-0">
                <Image 
                    src="https://placehold.co/1080x1920.png"
                    alt="Skincare background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                    data-ai-hint="glowing skin"
                />
             </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-10 w-10 text-primary"/>
                </div>

                <h1 className="text-4xl font-bold tracking-tight mb-4" style={{fontFamily: 'Sora, sans-serif'}}>
                    Selamat Datang di GlowPilot
                </h1>

                <p className="max-w-md text-muted-foreground mb-8">
                    Asisten AI pribadi Anda untuk mendapatkan kulit impian. Analisis, rekomendasi, dan panduan, semuanya di satu tempat.
                </p>

                <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => router.push('/doctors')}
                >
                    Mulai Konsultasi Gratis
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                    Sudah punya akun? <a href="#" className="underline">Masuk</a>
                </p>
            </div>
             <ConsentModal isOpen={showConsent} onAccept={handleConsent} />
        </div>
    );
}
