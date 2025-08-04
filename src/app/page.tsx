'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
    const [consent, setConsent] = useState(false);
    const { toast } = useToast();

    const handleContinue = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!consent) {
            e.preventDefault();
            toast({
                title: "Persetujuan Diperlukan",
                description: "Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="absolute top-1/4 flex flex-col items-center">
                 <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-6">
                    <Sparkles className="h-10 w-10" style={{color: 'hsl(var(--primary-optimistic))'}}/>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'Sora, sans-serif' }}>
                    GlowPilot
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                    Panduan cerdas Anda untuk kulit sehat & bercahaya. Dapatkan analisis dan rekomendasi instan dari AI dermatologist kami.
                </p>
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 space-y-4">
                 <div className="flex items-center space-x-2 justify-center">
                    <Checkbox id="terms" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground">
                        Saya menyetujui {' '}
                        <Link href="/terms" className="underline hover:text-primary">Syarat & Ketentuan</Link>
                        {' '}dan{' '}
                        <Link href="/privacy" className="underline hover:text-primary">Kebijakan Privasi</Link>.
                    </Label>
                </div>

                <Button size="lg" className="w-full" asChild>
                    <Link href="/chat/general" onClick={handleContinue}>
                        Mulai Konsultasi Gratis <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
