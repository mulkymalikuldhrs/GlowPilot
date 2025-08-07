
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Plus, Ghost } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Goal = {
    title: string;
    progress: number;
    targetDate: string;
}

const defaultGoals: Goal[] = [
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
];


export default function ProgressPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Load goals from localStorage
        const storedGoals = localStorage.getItem('userGoals');
        if (storedGoals) {
            setGoals(JSON.parse(storedGoals));
        } else {
            // Optional: set default goals if none are stored
            setGoals(defaultGoals);
            localStorage.setItem('userGoals', JSON.stringify(defaultGoals));
        }
    }, []);
    
    if (!isClient) {
        return null; // or a loading skeleton
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

                    {goals.length > 0 ? (
                        goals.map(goal => (
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
                        ))
                    ) : (
                        <Card className="glass-card">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <Ghost className="w-12 h-12 text-muted-foreground mb-4" />
                                <h3 className="font-semibold">Belum Ada Tujuan</h3>
                                <p className="text-sm text-muted-foreground mt-1">Mulai konsultasi dengan dokter AI untuk membuat tujuan perawatan kulit Anda.</p>
                                <Button asChild variant="secondary" className="mt-4">
                                    <Link href="/doctors">Mulai Konsultasi</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="text-center">
                    <Link href="/history" className="text-sm text-primary hover:underline font-medium">
                        Lihat Riwayat Konsultasi
                    </Link>
                </div>

            </div>

        </div>
    )
}
