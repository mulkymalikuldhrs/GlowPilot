'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Loader2, ArrowLeft, MessageSquare } from "lucide-react";
import type { Message, DiagnosisMessage } from "@/lib/types";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doctors } from "@/lib/doctors";
import type { DoctorSlug } from "@/lib/doctors";
import { Info } from "lucide-react";


interface Consultation {
    doctor: {
        name: string;
        specialty: string;
        slug: DoctorSlug;
    };
    history: DiagnosisMessage[];
    diagnosis: any; // Use a more specific type if you have one
}

export default function HistoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();
    const [consultation, setConsultation] = useState<Consultation | null>(null);
    const [loading, setLoading] = useState(true);

    const consultationId = typeof params.id === 'string' ? params.id : '';

    useEffect(() => {
        if (isUserLoading) return;
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchConsultation = async () => {
            if (!consultationId) return;
            try {
                const docRef = doc(db, 'users', user.uid, 'consultations', consultationId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setConsultation(docSnap.data() as Consultation);
                } else {
                    console.log("No such document!");
                    // Handle not found case, maybe redirect
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultation();
    }, [user, isUserLoading, router, consultationId]);
    
    if (loading || isUserLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!consultation) {
         return (
            <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                 <MessageSquare className="w-12 h-12 text-muted-foreground mb-4"/>
                <h2 className="text-xl font-bold">Riwayat Tidak Ditemukan</h2>
                <p className="text-muted-foreground">Tidak dapat menemukan detail untuk konsultasi ini.</p>
                <Button onClick={() => router.push('/history')} variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Kembali ke Riwayat
                </Button>
            </div>
        );
    }

    const messages: Message[] = consultation.history.map((msg, index) => ({
        id: `${consultationId}-${index}`,
        role: msg.role as 'user' | 'model',
        content: msg.content
    }));
    
    const doctorInfo = doctors[consultation.doctor.slug] || doctors.general;

    return (
         <div className="flex flex-col h-screen bg-background">
             <header className="sticky top-0 z-10 flex items-center justify-between p-2 border-b bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/history')}>
                        <ArrowLeft className="w-5 h-5"/>
                    </Button>
                     <Avatar className="w-10 h-10 border-2 border-primary/50">
                        <AvatarImage src={doctorInfo.avatar} alt={doctorInfo.name} data-ai-hint={doctorInfo.dataAiHint} />
                        <AvatarFallback>{doctorInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{consultation.doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{consultation.doctor.specialty}</p>
                    </div>
                </div>
            </header>

            <ChatWindow 
                messages={messages}
                loading={false} // History is never in a loading state
                doctor={doctorInfo}
                onPlayAudio={() => {}} // No audio playback in history
                playingMessageId={null}
            />
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-16 border-t">
                 <Card>
                    <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                            <Info className="h-4 w-4"/>
                            Ini adalah arsip riwayat percakapan Anda.
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    );
}
