'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { doctors } from '@/lib/doctors';


export default function DoctorSelectionPage() {

    const specialists = Object.values(doctors);

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
                                    <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
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
