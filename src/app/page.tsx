
'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirect to chat if logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/chat/general');
        }
    }, [user, loading, router]);

    // Don't render anything if loading or user is found, to prevent flash of content
    if (loading || user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Sparkles className="h-12 w-12 animate-pulse text-primary" />
            </div>
        );
    }
    
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
                <Button size="lg" className="w-full" asChild>
                    <Link href="/login">
                        Mulai Konsultasi Gratis <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <p className="text-xs text-muted-foreground px-4">
                    Dengan melanjutkan, Anda menyetujui {' '}
                    <Link href="/terms" className="underline hover:text-primary">Syarat & Ketentuan</Link>
                    {' '}dan{' '}
                    <Link href="/privacy" className="underline hover:text-primary">Kebijakan Privasi</Link>.
                </p>
            </div>
        </div>
    );
}
