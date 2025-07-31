
'use client';

import { diagnoseSkinCondition, type SkinConditionDiagnosisOutput } from "@/ai/flows/skin-condition-diagnosis";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, Volume2, Wand2, ShoppingCart, Info } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChatInput } from "./chat-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Message = {
    role: 'user' | 'assistant';
    content: React.ReactNode;
    rawContent?: string;
};

export default function DermatologistPage() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const { toast } = useToast();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'id-ID';
            // In a real app, you would select different voices based on the doctor
            // const voices = window.speechSynthesis.getVoices();
            // utterance.voice = voices.find(v => v.name === 'Google Bahasa Indonesia');
            window.speechSynthesis.speak(utterance);
        } else {
            toast({ title: 'Browser Tidak Didukung', description: 'Browser Anda tidak mendukung text-to-speech.', variant: 'destructive' });
        }
    }

    const handleSubmit = async (values: { description: string; photo: File | null; photoDataUri: string | null }) => {
        const { description, photoDataUri } = values;

        if (!description) {
            toast({
                title: 'Deskripsi Diperlukan',
                description: 'Mohon berikan deskripsi mengenai masalah kulit Anda.',
                variant: 'destructive'
            });
            return;
        }

        const userMessage: Message = {
            role: 'user',
            content: (
                <div className="flex flex-col gap-4">
                    <p>{description}</p>
                    {photoDataUri && <Image src={photoDataUri} alt="User submission" width={200} height={200} className="rounded-lg object-cover" />}
                </div>
            )
        };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            // Photo is optional, so we can pass an empty string or handle null in the flow
            const res = await diagnoseSkinCondition({ photoDataUri: photoDataUri || '', description });
            
            const diagnosisText = `Diagnosis: ${res.diagnosis}.`;
            const amRoutineText = `Rekomendasi Pagi: ${res.recommendations.amRoutine}.`;
            const pmRoutineText = `Rekomendasi Malam: ${res.recommendations.pmRoutine}.`;
            const fullText = `${diagnosisText} ${amRoutineText} ${pmRoutineText}`;

            const assistantMessage: Message = {
                role: 'assistant',
                rawContent: fullText,
                content: (
                     <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-primary flex items-center justify-between mb-2">
                                Diagnosis
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => speak(diagnosisText)}>
                                    <Volume2 className="h-4 w-4" />
                                </Button>
                            </h3>
                            <p className="text-sm text-foreground/90 mt-1">{res.diagnosis}</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <h3 className="font-semibold">AM Routine ☀️</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{res.recommendations.amRoutine}</p>
                            </div>
                             <div className="space-y-2">
                                <h3 className="font-semibold">PM Routine 🌙</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{res.recommendations.pmRoutine}</p>
                            </div>
                        </div>
                        {res.productRecommendations && res.productRecommendations.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-primary">Rekomendasi Produk</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {res.productRecommendations.map((product, index) => (
                                        <Card key={index} className="glass-card">
                                            <CardContent className="p-4">
                                                <p className="font-bold text-sm">{product.name}</p>
                                                <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                                                <p className="text-xs text-foreground/80">{product.reason}</p>
                                                <Button variant="outline" size="sm" className="w-full mt-3 text-xs" asChild>
                                                    <Link href="#">
                                                        Lihat Produk <ShoppingCart className="ml-2 h-3 w-3"/>
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                         <p className="text-center text-xs text-muted-foreground pt-4 flex items-center justify-center gap-2">
                            <Info className="h-3 w-3"/>
                            <span>Disclaimer: Diagnosis AI ini hanya untuk tujuan informasi dan bukan pengganti nasihat medis profesional.</span>
                        </p>
                    </div>
                )
            };
            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Terjadi kesalahan saat melakukan diagnosis. Silakan coba lagi.'
            };
             setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Diagnosis Gagal',
                description: 'Terjadi kesalahan saat melakukan diagnosis. Silakan coba lagi.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
             <audio ref={audioRef} className="hidden" />
            {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center text-center justify-center h-full p-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Wand2 className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>AI Dermatologist</h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Jelaskan masalah kulit Anda (Anda juga bisa mengunggah foto jika mau). AI kami akan memberikan diagnosis, rutinitas, dan rekomendasi produk.
                    </p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'assistant' && (
                           <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                               <Image src="https://placehold.co/100x100.png" alt="AI Doctor" width={40} height={40} className="rounded-full" data-ai-hint="doctor avatar" />
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-4 max-w-2xl w-full glass-card ${message.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-background/80'}`}>
                           {message.content}
                       </div>
                       {message.role === 'user' && (
                           <Avatar className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                               <User className="h-5 w-5 text-secondary-foreground" />
                           </Avatar>
                       )}
                   </div>
                ))}
                 {loading && (
                     <div className="flex items-start gap-4">
                         <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Image src="https://placehold.co/100x100.png" alt="AI Doctor" width={40} height={40} className="rounded-full" data-ai-hint="doctor avatar" />
                         </Avatar>
                         <div className="rounded-2xl p-4 max-w-lg glass-card bg-background/80 flex items-center space-x-2">
                             <Loader2 className="h-5 w-5 animate-spin text-primary" />
                             <p className="text-sm text-muted-foreground">Menganalisis kondisi kulit Anda...</p>
                         </div>
                     </div>
                 )}
            </div>
            
            <div className="p-4 bg-background/80 backdrop-blur-md">
                <ChatInput onSubmit={handleSubmit} isLoading={loading} />
            </div>
        </div>
    )
}
