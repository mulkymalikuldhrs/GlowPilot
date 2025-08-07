
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Ghost, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useUser } from "@/hooks/use-user";
import { db } from "@/lib/firebase/client";
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Goal = {
    id: string;
    title: string;
    progress: number;
    targetDate: string;
    isAiRecommended?: boolean;
}

export default function ProgressPage() {
    const { user, isLoading: isUserLoading } = useUser();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loadingGoals, setLoadingGoals] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    
    // State for the new goal dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalTargetDate, setNewGoalTargetDate] = useState('');


    useEffect(() => {
        if (isUserLoading) return;
        if (!user) {
            setLoadingGoals(false);
            return;
        }

        const goalsCollectionRef = collection(db, 'users', user.uid, 'goals');
        const q = query(goalsCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const goalsData: Goal[] = [];
            querySnapshot.forEach((doc) => {
                goalsData.push({ id: doc.id, ...doc.data() } as Goal);
            });
            setGoals(goalsData);
            setLoadingGoals(false);
        }, (error) => {
            console.error("Error fetching goals:", error);
            setLoadingGoals(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user, isUserLoading]);
    
    const handleAddGoal = async () => {
        if (!user || !newGoalTitle || !newGoalTargetDate) {
            toast({
                variant: 'destructive',
                title: 'Gagal Menambahkan',
                description: 'Judul dan tanggal target tidak boleh kosong.'
            });
            return;
        }

        startTransition(async () => {
            try {
                const goalsCollectionRef = collection(db, 'users', user.uid, 'goals');
                await addDoc(goalsCollectionRef, {
                    title: newGoalTitle,
                    targetDate: newGoalTargetDate,
                    progress: 0,
                    createdAt: serverTimestamp(),
                    isAiRecommended: false,
                });
                toast({
                    title: 'Tujuan Ditambahkan!',
                    description: `"${newGoalTitle}" berhasil dibuat.`
                });
                setNewGoalTitle('');
                setNewGoalTargetDate('');
                setDialogOpen(false);
            } catch (error) {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Gagal menambahkan tujuan baru.'
                });
                console.error("Error adding goal: ", error);
            }
        });
    }

    const handleDeleteGoal = async (goalId: string, goalTitle: string) => {
        if (!user) return;
        
        startTransition(async () => {
             if (!confirm(`Apakah Anda yakin ingin menghapus tujuan "${goalTitle}"?`)) {
                return;
            }
            try {
                const goalDocRef = doc(db, 'users', user.uid, 'goals', goalId);
                await deleteDoc(goalDocRef);
                toast({
                    title: 'Tujuan Dihapus',
                    description: `"${goalTitle}" telah dihapus.`
                });
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Gagal menghapus tujuan.'
                });
                console.error("Error deleting goal: ", error);
            }
        })
    }

    const handleProgressChange = (goalId: string, newProgress: number) => {
        if (!user) return;
        
        startTransition(async () => {
            try {
                const goalDocRef = doc(db, 'users', user.uid, 'goals', goalId);
                await updateDoc(goalDocRef, {
                    progress: newProgress
                });
            } catch (error) {
                console.error("Error updating progress: ", error);
            }
        })
    }

    if (isUserLoading || loadingGoals) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-4">
             <header className="w-full text-center py-4 mb-4">
                <h1 className="text-xl font-bold">Progres & Tujuan</h1>
            </header>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Tujuan Aktif</h2>
                         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Plus className="mr-2 h-4 w-4"/>
                                    Buat Tujuan
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] glass-card">
                                <DialogHeader>
                                <DialogTitle>Buat Tujuan Baru</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                        Judul
                                        </Label>
                                        <Input
                                        id="title"
                                        value={newGoalTitle}
                                        onChange={(e) => setNewGoalTitle(e.target.value)}
                                        className="col-span-3"
                                        placeholder="Contoh: Mengurangi komedo"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="target" className="text-right">
                                        Target
                                        </Label>
                                        <Input
                                        id="target"
                                        type="date"
                                        value={newGoalTargetDate}
                                        onChange={(e) => setNewGoalTargetDate(e.target.value)}
                                        className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                <Button type="submit" onClick={handleAddGoal} disabled={isPending}>
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : 'Simpan'}
                                </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {goals.length > 0 ? (
                        goals.map(goal => (
                            <Card key={goal.id} className="glass-card">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="font-semibold">{goal.title}</p>
                                            <p className="text-xs text-muted-foreground">Target: {goal.targetDate}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {goal.isAiRecommended && <Target className="w-5 h-5 text-primary"/>}
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => handleDeleteGoal(goal.id, goal.title)}
                                                disabled={isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
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
