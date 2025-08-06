
'use client';

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import type { TextToSpeechInput } from "@/ai/schemas/tts-schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, ShoppingCart, Info, SendHorizonal, MoreVertical, Paperclip, Sparkles, Shield, FlaskConical, Languages, Volume2, PlayCircle, Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

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

type Goal = {
    title: string;
    progress: number;
    targetDate: string;
}

type DoctorType = TextToSpeechInput['voice'];

const doctors: Record<string, { name: string; specialty: string; avatar: string; dataAiHint: string; voice: DoctorType, systemPrompt: string }> = {
    general: { 
        name: 'Dr. Rina', 
        specialty: 'AI Konsultan Umum', 
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'woman smiling',
        voice: 'nova',
        systemPrompt: "You are Dr. Rina, a general AI skincare consultant. Your tone is friendly, professional, and reassuring. You are speaking to a user in Indonesia. After one or two interactions, if the user mentions a specific problem like 'jerawat' (acne) or 'kerutan' (wrinkles), you MUST redirect them to a specialist by saying: 'Tentu, untuk masalah itu, saya sarankan Anda berbicara dengan spesialis kami. Silakan pilih dokter yang sesuai.' and do not provide any more information."
    },
    acne: { 
        name: 'Dr. Andi', 
        specialty: 'Spesialis Jerawat', 
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man smiling',
        voice: 'echo',
        systemPrompt: "You are Dr. Andi, an AI dermatologist specializing in acne. Your tone is direct, knowledgeable, and empathetic. You are speaking to a user in Indonesia. Your goal is to diagnose the type of acne and provide a targeted routine. You must use the productCatalogTool to recommend products specifically for acne."
    },
    aging: { 
        name: 'Dr. Citra', 
        specialty: 'Spesialis Anti-Aging', 
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'mature woman smiling',
        voice: 'shimmer',
        systemPrompt: "You are Dr. Citra, an AI dermatologist specializing in anti-aging. Your tone is elegant, scientific, and encouraging. You are speaking to a user in Indonesia. Your goal is to create a preventative and corrective routine for signs of aging. You must use the productCatalogTool to recommend anti-aging products."
    },
    ingredients: { 
        name: 'Dr. Budi', 
        specialty: 'Spesialis Bahan Skincare', 
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man in lab coat',
        voice: 'echo',
        systemPrompt: "You are Dr. Budi, an AI skincare chemist. Your tone is educational, precise, and a bit nerdy. You are speaking to a user in Indonesia. Your goal is to analyze product ingredients and explain their function. When asked for recommendations, you must use the productCatalogTool to find products containing specific ingredients the user is interested in."
    },
};


export default function DoctorChatPage() {
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
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);


    useEffect(() => {
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
    }, [doctor.systemPrompt]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const playAudio = (audioUrl: string, index: number, autoPlay = false) => {
        if (audioRef.current) {
            if (playingMessageIndex === index && !autoPlay) {
                audioRef.current.pause();
                setPlayingMessageIndex(null);
                setIsAutoPlaying(false);
            } else {
                audioRef.current.src = audioUrl;
                audioRef.current.play().catch(e => console.error("Autoplay failed:", e));
                setPlayingMessageIndex(index);
                setIsAutoPlaying(autoPlay);
            }
        }
    };
    
    useEffect(() => {
        const audioElement = audioRef.current;
        const handleAudioEnd = () => {
            setPlayingMessageIndex(null);
            setIsAutoPlaying(false);
        };
    
        if (audioElement) {
            audioElement.addEventListener('ended', handleAudioEnd);
            return () => {
                audioElement.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, []);

    const handleGenerateAudio = async (text: string, index: number, autoPlay = false) => {
        try {
            const res = await textToSpeech({ text, voice: doctor.voice });
            const audioUrl = res.audioDataUri;
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[index]) {
                  newMessages[index].audioUrl = audioUrl;
                }
                return newMessages;
            });
            if (audioUrl) {
                playAudio(audioUrl, index, autoPlay);
            }
        } catch (error) {
            console.error("TTS Error:", error);
            toast({ title: "Audio Error", description: "Gagal menghasilkan audio.", variant: "destructive" });
        }
    };
    
    // Autoplay useEffect
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'model' && lastMessage.textForTts && !lastMessage.audioUrl) {
            handleGenerateAudio(lastMessage.textForTts, messages.length - 1, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);


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
            
            if (res.response.includes("Silakan pilih dokter yang sesuai")) {
                setTimeout(() => router.push('/doctors'), 2000);
            }
            
            if (res.isComplete && res.diagnosisResult?.progressGoal) {
                const newGoal = {
                    ...res.diagnosisResult.progressGoal,
                    progress: 0, // Initial progress is 0
                };
                
                // Save to localStorage
                const existingGoals: Goal[] = JSON.parse(localStorage.getItem('userGoals') || '[]');
                localStorage.setItem('userGoals', JSON.stringify([...existingGoals, newGoal]));

                toast({
                    title: "Tujuan Baru Ditambahkan!",
                    description: `"${newGoal.title}" telah ditambahkan ke halaman Progres Anda.`,
                });
            }


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

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="sticky top-0 z-10 flex items-center justify-between p-2 border-b bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                     <Avatar className="w-10 h-10 border-2 border-primary/50">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint={doctor.dataAiHint} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Languages className="w-5 h-5"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Bahasa Indonesia</DropdownMenuItem>
                            <DropdownMenuItem disabled>English</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ThemeToggle />
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Mulai Obrolan Baru</DropdownMenuItem>
                            <DropdownMenuItem>Lihat Profil Dokter</DropdownMenuItem>
                            <DropdownMenuItem>Laporkan Masalah</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'model' && (
                           <Avatar className="w-9 h-9">
                                <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint={doctor.dataAiHint} />
                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-3 max-w-[80%] w-fit text-sm shadow-md ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card glass-card border-0'}`}>
                           {typeof message.content === 'string' ? <p className="whitespace-pre-wrap">{message.content}</p> : message.content}
                            {message.role === 'model' && message.textForTts && (
                                <button onClick={() => message.audioUrl ? playAudio(message.audioUrl, index) : handleGenerateAudio(message.textForTts!, index, false)} className="mt-2 text-primary/80 hover:text-primary transition-colors flex items-center gap-1 text-xs">
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
                         <Avatar className="w-9 h-9">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint={doctor.dataAiHint} />
                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
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
            <audio ref={audioRef} onPlay={() => setIsAutoPlaying(true)} onPause={() => setIsAutoPlaying(false)} />
        </div>
    )
}
