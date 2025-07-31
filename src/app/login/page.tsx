
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Mocking login process
        setTimeout(() => {
            toast({
                title: "Login Berhasil",
                description: "Selamat datang kembali! Anda akan diarahkan ke dashboard.",
            });
            router.push('/dashboard');
        }, 1500);
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-sm glass-card">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">Selamat Datang Kembali!</CardTitle>
                    <CardDescription>Masuk ke akun GlowPilot Anda untuk melanjutkan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@example.com" required disabled={loading}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Kata Sandi</Label>
                            <Input id="password" type="password" placeholder="••••••••" required disabled={loading}/>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Memverifikasi...
                                </>
                            ) : (
                                <>
                                    Masuk <LogIn className="ml-2 h-4 w-4"/>
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Belum punya akun?{" "}
                        <Link href="/signup" className="underline text-primary">
                            Daftar di sini
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
