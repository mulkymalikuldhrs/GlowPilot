
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const consultationHistory = [
    {
        id: '1',
        doctor: {
            name: 'Dr. Andi',
            specialty: 'Spesialis Jerawat',
        },
        date: '28 Juli 2024',
        summary: 'Konsultasi awal mengenai jerawat hormonal dan rekomendasi pembersih wajah...'
    },
    {
        id: '2',
        doctor: {
            name: 'Dr. Citra',
            specialty: 'Spesialis Anti-Aging',
        },
        date: '15 Juli 2024',
        summary: 'Diskusi mengenai garis halus dan rekomendasi serum retinol...'
    },
    {
        id: '3',
        doctor: {
            name: 'Andi (Dokter Virtual)',
            specialty: 'Dokter Virtual Umum',
        },
        date: '14 Juli 2024',
        summary: 'Sesi triage awal untuk keluhan kulit kering dan kusam...'
    },
];

export default function HistoryPage() {
    const router = useRouter();

    return (
        <div className="p-4">
             <header className="w-full py-4 mb-4 flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5"/>
                </Button>
                <h1 className="text-xl font-bold">Riwayat Konsultasi</h1>
            </header>

            <div className="space-y-4">
                {consultationHistory.map((item) => (
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
                                            <p className="text-xs text-muted-foreground">{item.doctor.specialty} &bull; {item.date}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground self-center"/>
                                </div>
                                <p className="text-sm text-muted-foreground mt-3 pl-14 truncate">{item.summary}</p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}
