
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const specialists = [
    { 
        slug: 'acne',
        name: 'Dr. Andi', 
        specialty: 'Spesialis Jerawat', 
        description: 'Dapatkan solusi dan rekomendasi rutin untuk mengatasi berbagai jenis jerawat.',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man smiling'
    },
    { 
        slug: 'aging',
        name: 'Dr. Citra', 
        specialty: 'Spesialis Anti-Aging', 
        description: 'Fokus pada pencegahan dan perbaikan tanda-tanda penuaan seperti kerutan dan garis halus.',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'mature woman smiling'
    },
    { 
        slug: 'ingredients',
        name: 'Dr. Budi', 
        specialty: 'Spesialis Bahan Skincare', 
        description: 'Pahami kandungan dalam produk skincare Anda dan temukan bahan yang paling cocok.',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man in lab coat'
    },
];

export default function DoctorSelectionPage() {
    const router = useRouter();

    return (
        <div className="p-4">
            <header className="w-full text-center py-4 mb-4">
                <h1 className="text-xl font-bold" style={{fontFamily: 'Sora, sans-serif'}}>Pilih Dokter Spesialis AI</h1>
                <p className="text-muted-foreground text-sm mt-1">Pilih konsultan yang paling sesuai dengan masalah kulit Anda.</p>
            </header>

            <div className="space-y-4">
                {specialists.map((doctor) => (
                    <Card key={doctor.slug} className="glass-card overflow-hidden hover:border-primary/50 transition-colors">
                         <Link href={`/chat/${doctor.slug}`} className="block">
                            <CardContent className="p-4 flex items-center gap-4">
                                <Image 
                                    src={doctor.avatar} 
                                    alt={doctor.name}
                                    width={80} 
                                    height={80} 
                                    className="rounded-full border-2 border-primary/20"
                                    data-ai-hint={doctor.dataAiHint}
                                />
                                <div className="flex-1">
                                    <h2 className="font-bold text-base">{doctor.name}</h2>
                                    <p className="text-sm text-primary font-medium" style={{color: 'hsl(var(--primary-optimistic))'}}>{doctor.specialty}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{doctor.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}

    
