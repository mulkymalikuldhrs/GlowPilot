
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, UserPlus } from "lucide-react";

export default function ReferralPage() {
    const { toast } = useToast();
    const referralLink = "https://glowpilot.app/signup?ref=mulky123";
    const referrals = [
        { name: "Andi", status: "Bergabung" },
        { name: "Bunga", status: "Bergabung" },
        { name: "Cakra", status: "Diundang" },
    ];
    const unlockedDoctors = 2;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: "Tautan Disalin!",
            description: "Tautan referral Anda telah disalin ke clipboard.",
        });
    }

    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Gift className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Undang Teman, Dapatkan Akses</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Buka akses ke AI Spesialis eksklusif dengan mengundang teman Anda untuk bergabung dengan GlowPilot. Setiap teman yang bergabung akan membuka satu AI Spesialis untuk Anda.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardHeader>
                    <CardTitle>Tautan Referral Unik Anda</CardTitle>
                    <CardDescription>Bagikan tautan ini dengan teman-teman Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full items-center space-x-2">
                        <Input type="text" value={referralLink} readOnly />
                        <Button type="button" size="icon" onClick={copyToClipboard} style={{backgroundColor: 'var(--primary-optimistic)', color: 'white'}}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="mt-8 glass-card">
                <CardHeader>
                    <CardTitle>Status Referral Anda</CardTitle>
                    <CardDescription>Anda telah membuka <strong>{unlockedDoctors} dari 2 AI Spesialis</strong> yang tersedia.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {referrals.map((ref, index) => (
                         <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-4">
                                <UserPlus className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                                <div>
                                    <p className="font-semibold">{ref.name}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${ref.status === 'Bergabung' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {ref.status}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
