
'use client';

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, Volume2, Wand2, ShoppingCart, Info, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./chat-input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Message = {
    role: 'user' | 'model';
    content: React.ReactNode;
    rawContent?: string;
};

type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};


export default function DermatologistPage() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [diagnosisMessages, setDiagnosisMessages] = useState<DiagnosisMessage[]>([]);
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const startConversation = async () => {
            if (messages.length > 0) return;
            setLoading(true);
            try {
                const res = await conductDiagnosis({ currentHistory: [] });
                const initialMessage: Message = { role: 'model', content: res.response };
                setMessages([initialMessage]);
                setDiagnosisMessages([{ role: 'model', content: res.response }]);
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Gagal memulai percakapan dengan AI.', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        startConversation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'id-ID';
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            
            window.speechSynthesis.speak(utterance);
        } else {
            toast({ title: 'Browser Tidak Didukung', description: 'Browser Anda tidak mendukung text-to-speech.', variant: 'destructive' });
        }
    }

    const renderDiagnosis = (res: NonNullable<DiagnosisConversationOutput['diagnosisResult']>) => {
        const diagnosisText = `Diagnosis: ${res.diagnosis}.`;
        const amRoutineText = `Rekomendasi Pagi: ${res.recommendations.amRoutine}.`;
        const pmRoutineText = `Rekomendasi Malam: ${res.recommendations.pmRoutine}.`;

        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-semibold text-primary flex items-center justify-between mb-2">
                        Diagnosis
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => speak(diagnosisText)}>
                            <Volume2 className={`h-4 w-4 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
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
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {res.productRecommendations.map((product, index) => (
                                <Card key={index} className="glass-card">
                                    <CardContent className="p-4">
                                        <p className="font-bold text-sm">{product.name}</p>
                                        <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                                        <p className="text-xs text-foreground/80">{product.reason}</p>
                                        <Button variant="outline" size="sm" className="w-full mt-3 text-xs" asChild>
                                            <Link href="#">
                                                Beli di E-commerce <ShoppingCart className="ml-2 h-3 w-3"/>
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
    }

    const handleSubmit = async (values: { description: string; photoDataUri: string | null }) => {
        const { description, photoDataUri } = values;

        if (!description) {
            return;
        }

        const userMessageContent = (
            <div className="flex flex-col gap-2">
                <p>{description}</p>
                {photoDataUri && <Image src={photoDataUri} alt="User submission" width={150} height={150} className="rounded-lg object-cover" />}
            </div>
        );

        const userMessage: Message = { role: 'user', content: userMessageContent };
        const userDiagnosisMessage: DiagnosisMessage = { role: 'user', content: description };

        setMessages(prev => [...prev, userMessage]);
        setDiagnosisMessages(prev => [...prev, userDiagnosisMessage]);
        setLoading(true);

        try {
            const res = await conductDiagnosis({ 
                currentHistory: [...diagnosisMessages, userDiagnosisMessage],
                photoDataUri 
            });

            const assistantMessage: Message = {
                role: 'model',
                rawContent: res.response,
                content: res.isComplete && res.diagnosisResult 
                    ? renderDiagnosis(res.diagnosisResult)
                    : res.response
            };
            setMessages(prev => [...prev, assistantMessage]);
            setDiagnosisMessages(prev => [...prev, {role: 'model', content: res.response}])

        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                role: 'model',
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
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'model' && (
                           <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                               <Sparkles className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-4 max-w-2xl w-fit ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'glass-card'}`}>
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
                            <Sparkles className="h-6 w-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                         </Avatar>
                         <div className="rounded-2xl p-4 max-w-lg glass-card flex items-center space-x-2">
                             <Loader2 className="h-5 w-5 animate-spin text-primary" />
                             <p className="text-sm text-muted-foreground">Menganalisis...</p>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-background/80 backdrop-blur-md sticky bottom-0">
                <ChatInput onSubmit={handleSubmit} isLoading={loading} />
            </div>
        </div>
    )
}
