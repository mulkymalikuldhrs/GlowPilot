
'use client';

import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { Logo } from "@/components/logo";
import { useUser } from "@/hooks/use-user";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/chat');
        }
    }, [user, router]);

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
                Selamat Datang Kembali!
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mt-2 mb-8">
                Masuk untuk melanjutkan perjalanan perawatan kulit Anda.
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
