
'use client';

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import type { TextToSpeechInput } from "@/ai/schemas/tts-schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Info, Languages, MoreVertical, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MessageInput } from "@/components/chat/MessageInput";

export type Message = {
    id: string;
    role: 'user' | 'model';
    content: React.ReactNode;
    audioUrl?: string;
    textForTts?: string;
    isGeneratingAudio?: boolean;
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
    const [isPending, startTransition] = useTransition();

    const doctorSlug = typeof params.doctor === 'string' ? params.doctor : '';
    const doctor = doctors[doctorSlug];

    const [messages, setMessages] = useState<Message[]>([]);
    const [diagnosisMessages, setDiagnosisMessages] = useState<DiagnosisMessage[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const [attachedImage, setAttachedImage] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);

    useEffect(() => {
        if (!doctor) {
            router.push('/doctors');
            return;
        }

        const startConversation = async () => {
            if (messages.length > 0) return;
            startTransition(async () => {
                try {
                    const res = await conductDiagnosis({ 
                        currentHistory: [], 
                        photoDataUri: null, 
                        systemPrompt: doctor.systemPrompt 
                    });
                    const initialMessage: Message = { id: Date.now().toString(), role: 'model', content: res.response, textForTts: res.response };
                    setMessages([initialMessage]);
                    setDiagnosisMessages([{ role: 'model', content: res.response }]);
                } catch (error) {
                    console.error(error);
                    toast({ title: 'Error', description: 'Gagal memulai percakapan dengan AI.', variant: 'destructive' });
                }
            });
        };

        startConversation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctor]);

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => setPlayingMessageId(null);
        audio?.addEventListener('ended', handleEnded);
        return () => audio?.removeEventListener('ended', handleEnded);
    }, [audioRef]);


    if (!doctor) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin"/></div>;
    }

    const handleGenerateAudio = async (text: string, messageId: string) => {
        setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isGeneratingAudio: true } : m));
        try {
            const res = await textToSpeech({ text, voice: doctor.voice });
            const audioUrl = res.audioDataUri;
            setMessages(prev => prev.map(m => m.id === messageId ? { ...m, audioUrl, isGeneratingAudio: false } : m));
            playAudio(audioUrl, messageId);
        } catch (error) {
            console.error(error);
            toast({ title: 'Audio Gagal', description: 'Tidak dapat membuat audio saat ini.', variant: 'destructive' });
            setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isGeneratingAudio: false } : m));
        }
    };

    const playAudio = (audioUrl: string, messageId: string) => {
        if (audioRef.current) {
            if (playingMessageId === messageId) {
                audioRef.current.pause();
                setPlayingMessageId(null);
            } else {
                audioRef.current.src = audioUrl;
                audioRef.current.play();
                setPlayingMessageId(messageId);
            }
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
            </div>
        )
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!input.trim() && !attachedImage) return;

        const userMessageText = attachedImage ? `${input} (gambar terlampir)` : input;

        const userMessage: Message = { 
            id: Date.now().toString(),
            role: 'user', 
            content: (
                <div>
                    {input && <p>{input}</p>}
                    {attachedImage && (
                        <img src={attachedImage} alt="Lampiran pengguna" width={150} height={150} className="rounded-lg mt-2"/>
                    )}
                </div>
            )
        };
        const userDiagnosisMessage: DiagnosisMessage = { role: 'user', content: userMessageText };

        setMessages(prev => [...prev, userMessage]);
        setDiagnosisMessages(prev => [...prev, userDiagnosisMessage]);
        setInput('');
        const imageToSend = attachedImage;
        setAttachedImage(null);
        
        startTransition(async () => {
            try {
                const res = await conductDiagnosis({ 
                    currentHistory: [...diagnosisMessages, userDiagnosisMessage],
                    photoDataUri: imageToSend,
                    systemPrompt: doctor.systemPrompt,
                });
                
                if (res.isComplete && res.diagnosisResult?.progressGoal) {
                    const newGoal = {
                        ...res.diagnosisResult.progressGoal,
                        progress: 0, 
                    };
                    
                    const existingGoals: Goal[] = JSON.parse(localStorage.getItem('userGoals') || '[]');
                    localStorage.setItem('userGoals', JSON.stringify([...existingGoals, newGoal]));

                    toast({
                        title: "Tujuan Baru Ditambahkan!",
                        description: `"${newGoal.title}" telah ditambahkan ke halaman Progres Anda.`,
                    });
                }

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
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
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    content: 'Terjadi kesalahan saat melakukan diagnosis. Silakan coba lagi.'
                };
                 setMessages(prev => [...prev, errorMessage]);
                toast({
                    title: 'Diagnosis Gagal',
                    description: 'Terjadi kesalahan saat melakukan diagnosis. Silakan coba lagi.',
                    variant: 'destructive'
                });
            }
        });
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

                    <ThemeSwitcher />
                    
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

            <ChatWindow 
                messages={messages}
                loading={isPending}
                doctor={doctor}
                onGenerateAudio={handleGenerateAudio}
                onPlayAudio={playAudio}
                playingMessageId={playingMessageId}
            />
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-16 border-t">
                 <MessageInput 
                    input={input}
                    setInput={setInput}
                    loading={isPending}
                    attachedImage={attachedImage}
                    setAttachedImage={setAttachedImage}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                />
            </footer>
            <audio ref={audioRef} className="hidden" />
        </div>
    )
}
