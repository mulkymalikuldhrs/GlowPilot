
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Rocket } from "lucide-react";

export default function UpgradePage() {
    const features = [
        "Akses ke semua AI Spesialis (termasuk yang akan datang)",
        "Analisis tanpa batas",
        "Prioritas dukungan pelanggan",
        "Fitur eksklusif lebih awal",
        "Bebas iklan",
    ];

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Rocket className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Upgrade ke GlowPilot Pro</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Dapatkan akses tak terbatas ke semua fitur canggih kami dan maksimalkan perjalanan perawatan kulit Anda.
                </p>
            </div>

            <div className="mt-12 flex justify-center">
                <Card className="w-full max-w-md glass-card border-2" style={{borderColor: 'var(--primary-optimistic)'}}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">Pro Plan</CardTitle>
                        <CardDescription>Semua yang Anda butuhkan untuk kulit terbaik.</CardDescription>
                        <p className="text-4xl font-bold pt-4">Rp 149.000<span className="text-lg font-normal text-muted-foreground">/bulan</span></p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" className="w-full mt-6" style={{backgroundColor: 'var(--primary-optimistic)', color: 'white'}}>
                            Upgrade Sekarang
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
