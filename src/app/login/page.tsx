
'use client';

import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { Logo } from "@/components/logo";
import { useUser } from "@/hooks/use-user";
import { Sparkles, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';


export default function LoginPage() {
    const { user, isNewUser, isLoading } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            // Redirect based on whether the user is new or existing.
            const redirectPath = isNewUser ? '/onboarding' : '/chat';
            router.replace(redirectPath);
        }
    }, [user, isNewUser, router]);
    
    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Login Gagal',
                description: 'Terjadi kesalahan saat mencoba masuk. Silakan coba lagi.'
            })
        }
    }, [searchParams, toast]);

    if (isLoading || user) {
        return (
             <div className="flex flex-col h-screen bg-background items-center justify-center p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                <p className="text-muted-foreground mt-4">Mempersiapkan sesi Anda...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-background items-center justify-center p-8 text-center">
            <div className="flex items-center gap-2 mb-4">
                <Logo />
                <span className="font-bold text-lg">GlowPilot</span>
            </div>
            
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-3 mb-6">
                <Sparkles className="w-8 h-8" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter" style={{fontFamily: 'Sora, sans-serif'}}>
                Selamat Datang!
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mt-2 mb-8">
                Masuk atau daftar untuk memulai perjalanan perawatan kulit Anda.
            </p>

            <div className="w-full max-w-sm">
               <GoogleLoginButton />
            </div>

            <p className="text-xs text-muted-foreground mt-8 max-w-xs">
                Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
            </p>
        </div>
    )
}
