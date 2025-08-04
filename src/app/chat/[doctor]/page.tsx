
'use client';

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import type { TextToSpeechInput } from "@/ai/schemas/tts-schemas";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, ShoppingCart, Info, SendHorizonal, MoreVertical, Paperclip, Sparkles, Shield, FlaskConical, Languages, Volume2, PlayCircle, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";

type Message = {
    role: 'user' | 'model';
    content: React.ReactNode;
    audioUrl?: string;
    textForTts?: string;
};

type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};

type DoctorType = TextToSpeechInput['voice'];

const doctors: Record<string, { name: string; specialty: string; avatar: React.ElementType, voice: DoctorType, systemPrompt: string }> = {
    general: { 
        name: 'Dr. Rina General', 
        specialty: 'AI Konsultan Umum', 
        avatar: Sparkles, 
        voice: 'nova',
        systemPrompt: "You are Dr. Rina, a general AI skincare consultant. Your tone is friendly, professional, and reassuring. You are speaking to a user in Indonesia. Your goal is to provide a preliminary analysis of general skin concerns. You must use the productCatalogTool to recommend products."
    },
    acne: { 
        name: 'Dr. Andi Jerawat', 
        specialty: 'Spesialis Jerawat', 
        avatar: Shield, 
        voice: 'echo',
        systemPrompt: "You are Dr. Andi, an AI dermatologist specializing in acne. Your tone is direct, knowledgeable, and empathetic. You are speaking to a user in Indonesia. Your goal is to diagnose the type of acne and provide a targeted routine. You must use the productCatalogTool to recommend products specifically for acne."
    },
    aging: { 
        name: 'Dr. Citra Awet Muda', 
        specialty: 'Spesialis Anti-Aging', 
        avatar: Sparkles, 
        voice: 'shimmer',
        systemPrompt: "You are Dr. Citra, an AI dermatologist specializing in anti-aging. Your tone is elegant, scientific, and encouraging. You are speaking to a user in Indonesia. Your goal is to create a preventative and corrective routine for signs of aging. You must use the productCatalogTool to recommend anti-aging products."
    },
    ingredients: { 
        name: 'Dr. Budi Bahan', 
        specialty: 'Spesialis Bahan Skincare', 
        avatar: FlaskConical, 
        voice: 'echo',
        systemPrompt: "You are Dr. Budi, an AI skincare chemist. Your tone is educational, precise, and a bit nerdy. You are speaking to a user in Indonesia. Your goal is to analyze product ingredients and explain their function. When asked for recommendations, you must use the productCatalogTool to find products containing specific ingredients the user is interested in."
    },
};


export default function DoctorChatPage() {
    const { user, loading: authLoading } = useAuth();
    const params = useParams();
    const router = useRouter();
    const doctorSlug = typeof params.doctor === 'string' ? params.doctor : 'general';
    const doctor = doctors[doctorSlug] || doctors.general;

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [diagnosisMessages, setDiagnosisMessages] = useState<DiagnosisMessage[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return; // Don't start conversation if not logged in

        const startConversation = async () => {
            if (messages.length > 0) return;
            setLoading(true);
            try {
                const res = await conductDiagnosis({ 
                    currentHistory: [], 
                    photoDataUri: null, 
                    systemPrompt: doctor.systemPrompt 
                });
                const initialMessage: Message = { role: 'model', content: res.response, textForTts: res.response };
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
    }, [doctor.systemPrompt, user]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const playAudio = (audioUrl: string, index: number) => {
        if (audioRef.current) {
            if (playingMessageIndex === index) {
                audioRef.current.pause();
                setPlayingMessageIndex(null);
            } else {
                audioRef.current.src = audioUrl;
                audioRef.current.play();
                setPlayingMessageIndex(index);
            }
        }
    };
    
    useEffect(() => {
        const audioElement = audioRef.current;
        const handleAudioEnd = () => setPlayingMessageIndex(null);
    
        if (audioElement) {
            audioElement.addEventListener('ended', handleAudioEnd);
            return () => {
                audioElement.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, []);

    const handleGenerateAudio = async (text: string, index: number) => {
        try {
            const res = await textToSpeech({ text, voice: doctor.voice });
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[index].audioUrl = res.audioDataUri;
                return newMessages;
            });
            playAudio(res.audioDataUri, index);
        } catch (error) {
            console.error("TTS Error:", error);
            toast({ title: "Audio Error", description: "Gagal menghasilkan audio.", variant: "destructive" });
        }
    };

    const renderDiagnosis = (res: NonNullable<DiagnosisConversationOutput['diagnosisResult']>) => {
        return (
            <div className="space-y-6 rounded-xl border bg-background/50 p-4 shadow-sm glass-card">
                <div className="space-y-2">
                    <h3 className="font-semibold text-primary flex items-center justify-between mb-2">
                        Diagnosis
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
                                            <Link href="/catalog">
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        const userDiagnosisMessage: DiagnosisMessage = { role: 'user', content: input };

        setMessages(prev => [...prev, userMessage]);
        setDiagnosisMessages(prev => [...prev, userDiagnosisMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await conductDiagnosis({ 
                currentHistory: [...diagnosisMessages, userDiagnosisMessage],
                photoDataUri: null,
                systemPrompt: doctor.systemPrompt,
            });

            const assistantMessage: Message = {
                role: 'model',
                content: res.isComplete && res.diagnosisResult 
                    ? renderDiagnosis(res.diagnosisResult)
                    : res.response,
                textForTts: res.isComplete && res.diagnosisResult ? `Berikut adalah diagnosis dan rekomendasi untuk Anda.` : res.response,
            };
            setMessages(prev => [...prev, assistantMessage]);
            if (res.response) {
                setDiagnosisMessages(prev => [...prev, {role: 'model', content: res.response}])
            }

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
    
    if (authLoading) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin"/></div>
    }


    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="sticky top-0 z-10 flex items-center justify-between p-2 border-b bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                     <Avatar className="w-10 h-10 border-2 border-primary/50">
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                           <doctor.avatar className="w-6 h-6 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                        </div>
                    </Avatar>
                    <div>
                        <p className="font-bold">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                        <Languages className="w-5 h-5"/>
                    </Button>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5"/>
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'model' && (
                           <Avatar className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                               <Bot className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-3 max-w-[80%] w-fit text-sm shadow-md ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card glass-card border-0'}`}>
                           {typeof message.content === 'string' ? <p className="whitespace-pre-wrap">{message.content}</p> : message.content}
                            {message.role === 'model' && message.textForTts && (
                                <button onClick={() => message.audioUrl ? playAudio(message.audioUrl, index) : handleGenerateAudio(message.textForTts!, index)} className="mt-2 text-primary/80 hover:text-primary transition-colors flex items-center gap-1 text-xs">
                                    {playingMessageIndex === index ? <Volume2 className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                                    <span>{playingMessageIndex === index ? 'Playing...' : 'Play Audio'}</span>
                                </button>
                            )}
                       </div>
                       {message.role === 'user' && (
                           <Avatar className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                               <User className="h-5 w-5 text-secondary-foreground" />
                           </Avatar>
                       )}
                   </div>
                ))}
                 {loading && (
                     <div className="flex items-start gap-3">
                         <Avatar className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Bot className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                         </Avatar>
                         <div className="rounded-2xl p-3 max-w-lg bg-muted flex items-center space-x-2">
                             <Loader2 className="h-4 w-4 animate-spin text-primary" />
                             <p className="text-sm text-muted-foreground">Menganalisis...</p>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} />
            </main>
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-16 border-t">
                 <form onSubmit={handleSubmit} className="relative flex items-center w-full gap-2">
                    <Button type="button" variant="ghost" size="icon" className="shrink-0">
                        <Paperclip className="w-5 h-5"/>
                        <span className="sr-only">Attach image</span>
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="shrink-0">
                        <Mic className="w-5 h-5"/>
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                     <Input
                         id="message"
                         placeholder="Ketik pesan Anda..."
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                         disabled={loading}
                         className="pr-12 rounded-full"
                         autoComplete="off"
                     />
                     <Button type="submit" size="icon" disabled={loading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                        <SendHorizonal className="h-4 w-4" />
                     </Button>
                </form>
            </footer>
            <audio ref={audioRef} />
        </div>
    )
}
