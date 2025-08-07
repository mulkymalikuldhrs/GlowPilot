
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, MessageSquare, ArrowLeft, Loader2, Ghost } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useEffect, useState } from 'react';
import type { Timestamp } from 'firebase/firestore';

interface Consultation {
    id: string;
    doctor: {
        name: string;
        specialty: string;
        slug: string;
    };
    createdAt: Timestamp;
    history: {
        role: string;
        content: string;
    }[];
}

export default function HistoryPage() {
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();
    const [history, setHistory] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isUserLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }

        const consultationsRef = collection(db, 'users', user.uid, 'consultations');
        const q = query(consultationsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const historyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Consultation));
            setHistory(historyData);
            setLoading(false);
        }, (error) => {
            console.error("Failed to fetch consultation history: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, isUserLoading, router]);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'Tanggal tidak diketahui';
        return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const getSummary = (consultation: Consultation) => {
        // Find the last model message as a summary
        const lastModelMessage = [...consultation.history].reverse().find(m => m.role === 'model');
        return lastModelMessage ? lastModelMessage.content.substring(0, 100) + '...' : 'Tidak ada ringkasan.';
    }

    if (loading || isUserLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="p-4">
             <header className="w-full py-4 mb-4 flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5"/>
                </Button>
                <h1 className="text-xl font-bold">Riwayat Konsultasi</h1>
            </header>

            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map((item) => (
                        <Card key={item.id} className="glass-card hover:border-primary/50 transition-colors">
                            <Link href={`/chat/history/${item.id}`} className='block'>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <MessageSquare className="w-5 h-5 text-primary"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.doctor.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.doctor.specialty} &bull; {formatDate(item.createdAt)}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground self-center"/>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-3 pl-14 truncate">{getSummary(item)}</p>
                                </CardContent>
                            </Link>
                        </Card>
                    ))
                ) : (
                    <Card className="glass-card">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                            <Ghost className="w-12 h-12 text-muted-foreground mb-4" />
                            <h3 className="font-semibold">Belum Ada Riwayat</h3>
                            <p className="text-sm text-muted-foreground mt-1">Mulai konsultasi pertama Anda dengan dokter AI untuk melihat riwayatnya di sini.</p>
                            <Button asChild variant="secondary" className="mt-4">
                                <Link href="/doctors">Mulai Konsultasi</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
