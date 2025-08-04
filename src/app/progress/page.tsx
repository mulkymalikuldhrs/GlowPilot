
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { Check, Target, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// In a real app, this would come from a user-specific database record
const userGoals: Record<string, {title: string; progress: number; targetDate: string}[]> = {
    "default": [
         {
            title: "Mengurangi Jerawat Hormonal",
            progress: 40,
            targetDate: "30 Sep 2024"
        },
        {
            title: "Meningkatkan Hidrasi Kulit",
            progress: 75,
            targetDate: "15 Okt 2024"
        }
    ]
}


export default function ProgressPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [goals, setGoals] = useState(userGoals.default);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        // In a real app, you would fetch goals based on user.uid
        // For now, we just use the default
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin"/></div>
    }
    
    return (
        <div className="p-4">
             <header className="w-full text-center py-4 mb-4">
                <h1 className="text-xl font-bold">Progres & Tujuan</h1>
            </header>

            <div className="space-y-6">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Skor Konsistensi</CardTitle>
                        <CardDescription>Skor Anda dalam 7 hari terakhir.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                             <p className="text-4xl font-bold text-green-400">85%</p>
                             <div className="flex gap-1">
                                <Check className="w-5 h-5 text-green-400"/>
                                <Check className="w-5 h-5 text-green-400"/>
                                <Check className="w-5 h-5 text-green-400"/>
                                <Check className="w-5 h-5 text-green-400"/>
                                <Check className="w-5 h-5 text-muted"/>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Tujuan Aktif</h2>
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4"/>
                            Buat Tujuan
                        </Button>
                    </div>

                    {goals.map(goal => (
                        <Card key={goal.title} className="glass-card">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="font-semibold">{goal.title}</p>
                                        <p className="text-xs text-muted-foreground">Target: {goal.targetDate}</p>
                                    </div>
                                    <Target className="w-5 h-5 text-primary"/>
                                </div>
                                <Progress value={goal.progress} className="mt-4 h-2"/>
                                <p className="text-right text-xs text-muted-foreground mt-1">{goal.progress}%</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/history" className="text-sm text-primary hover:underline">
                        Lihat Riwayat Konsultasi
                    </Link>
                </div>

            </div>

        </div>
    )
}
