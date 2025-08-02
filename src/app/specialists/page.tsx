
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Soup, Sun, Wand2, Lock, Sparkles, HeartPulse, BrainCircuit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function SpecialistsPage() {

    const specialists = [
        {
            name: "Dr. Ava (AI Dermatologist Umum)",
            specialty: "Diagnosis Kulit Umum",
            description: "Dr. Ava adalah titik awal Anda. Ia dapat mendiagnosis masalah kulit umum seperti jerawat, eksim, dan memberikan rekomendasi rutin dasar.",
            icon: <Wand2 className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/dermatologist",
            image: "https://placehold.co/400x300.png",
            aiHint: "dermatology lab",
            isLocked: false,
        },
        {
            name: "NutriBot (Ahli Nutrisi Kulit)",
            specialty: "Nutrisi & Diet",
            description: "Fokus pada hubungan antara makanan dan kesehatan kulit. NutriBot akan menganalisis diet Anda dan memberikan saran makanan untuk kulit bercahaya.",
            icon: <Soup className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/nutritionist",
            image: "https://placehold.co/400x300.png",
            aiHint: "healthy food",
            isLocked: false, 
        },
        {
            name: "Chrono AI (Pakar Anti-Penuaan)",
            specialty: "Anti-Penuaan & Regenerasi",
            description: "Spesialis dalam tanda-tanda penuaan. Chrono AI akan membuat rutinitas dan tips gaya hidup untuk mengatasi garis halus, kerutan, dan elastisitas.",
            icon: <Sun className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/anti-aging",
            image: "https://placehold.co/400x300.png",
            aiHint: "serum cosmetics",
            isLocked: false,
        },
        {
            name: "Sentio (Spesialis Kulit Sensitif)",
            specialty: "Kulit Sensitif & Alergi",
            description: "Didedikasikan untuk kulit sensitif, kemerahan, dan reaktif. Sentio membantu menenangkan kulit dan menemukan produk yang lembut namun efektif.",
            icon: <HeartPulse className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/sensitive",
            image: "https://placehold.co/400x300.png",
            aiHint: "calm nature",
            isLocked: true, 
        },
         {
            name: "CogniSkin (Pakar Bahan Aktif)",
            specialty: "Ilmu & Bahan Skincare",
            description: "Punya pertanyaan mendalam tentang bahan aktif seperti retinol atau vitamin C? CogniSkin adalah ahli kimia virtual Anda.",
            icon: <BrainCircuit className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/ingredients",
            image: "https://placehold.co/400x300.png",
            aiHint: "science laboratory",
            isLocked: true,
        }
    ]

    return (
        <div className="container mx-auto max-w-7xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Temui Tim Dokter AI Spesialis Anda</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Pilih seorang spesialis untuk mendapatkan saran yang sangat tertarget. Undang teman atau upgrade ke Pro untuk membuka semua spesialis.
                </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {specialists.map((specialist) => (
                    <Card key={specialist.name} className={`glass-card transform hover:-translate-y-2 transition-transform duration-300 flex flex-col group ${specialist.isLocked ? 'opacity-70 hover:opacity-90' : ''}`}>
                        <CardHeader className="items-center text-center relative">
                            {specialist.isLocked && <Badge variant="destructive" className="absolute top-4 right-4 z-10"><Lock className="mr-1 h-3 w-3" /> Terkunci</Badge>}
                            <div className="p-4 rounded-full bg-primary/10 mb-2">
                               {specialist.icon}
                            </div>
                            <CardTitle>{specialist.name}</CardTitle>
                            <CardDescription>{specialist.specialty}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col text-center p-4 pt-0">
                           <div className="relative mb-4">
                            <Image src={specialist.image} alt={specialist.name} width={400} height={300} className="rounded-lg aspect-[4/3] object-cover" data-ai-hint={specialist.aiHint} />
                            {specialist.isLocked && <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm"></div>}
                           </div>
                            <p className="text-sm text-muted-foreground flex-grow mb-4">{specialist.description}</p>
                            <Button asChild disabled={specialist.isLocked} className="w-full">
                                <Link href={specialist.isLocked ? '/upgrade' : specialist.link}>{specialist.isLocked ? 'Upgrade ke Pro untuk Membuka' : 'Hubungi Sekarang'}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
