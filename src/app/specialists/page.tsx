
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Soup, Sun, Wand2, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function SpecialistsPage() {

    const specialists = [
        {
            name: "AI Dermatologist Umum",
            description: "Dapatkan diagnosis dan rekomendasi rutin untuk masalah kulit umum seperti jerawat, eksim, dan lainnya.",
            icon: <Wand2 className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/dermatologist",
            image: "https://placehold.co/400x300.png",
            aiHint: "dermatology lab",
            isLocked: false,
        },
        {
            name: "Ahli Nutrisi Kulit",
            description: "Pelajari bagaimana diet Anda memengaruhi kulit Anda dan dapatkan saran makanan untuk kulit yang bercahaya.",
            icon: <Soup className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/nutritionist",
            image: "https://placehold.co/400x300.png",
            aiHint: "healthy food",
            isLocked: false, // This would be dynamic in a real app
        },
        {
            name: "Pakar Anti-Penuaan",
            description: "Dapatkan rutinitas dan tips gaya hidup yang dipersonalisasi untuk mengatasi garis halus, kerutan, dan tanda-tanda penuaan.",
            icon: <Sun className="h-8 w-8 text-primary" style={{color: 'var(--primary-optimistic)'}}/>,
            link: "/specialists/anti-aging",
            image: "https://placehold.co/400x300.png",
            aiHint: "serum cosmetics",
            isLocked: false, // This would be dynamic in a real app
        }
    ]

    return (
        <div className="container mx-auto max-w-6xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Temui Dokter AI Spesialis Anda</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Pilih seorang spesialis untuk mendapatkan saran yang ditargetkan. Undang teman atau upgrade ke Pro untuk membuka semua spesialis.
                </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {specialists.map((specialist) => (
                    <Card key={specialist.name} className={`glass-card transform hover:-translate-y-2 transition-transform duration-300 flex flex-col ${specialist.isLocked ? 'opacity-60' : ''}`}>
                        <CardHeader className="items-center text-center">
                            {specialist.isLocked && <Badge variant="destructive" className="absolute top-4 right-4"><Lock className="mr-1 h-3 w-3" /> Terkunci</Badge>}
                            <div className="p-3 rounded-full bg-primary/10 mb-2">
                               {specialist.icon}
                            </div>
                            <CardTitle>{specialist.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col text-center p-4">
                           <Image src={specialist.image} alt={specialist.name} width={400} height={300} className="rounded-lg mb-4 aspect-[4/3] object-cover" data-ai-hint={specialist.aiHint} />
                            <CardDescription className="flex-grow">{specialist.description}</CardDescription>
                            <Button className="mt-6 w-full" asChild disabled={specialist.isLocked} style={!specialist.isLocked ? {backgroundColor: 'var(--primary-optimistic)', color: 'white'}: {}}>
                                <Link href={specialist.link}>{specialist.isLocked ? 'Buka dengan Referral/Pro' : 'Hubungi Sekarang'}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
