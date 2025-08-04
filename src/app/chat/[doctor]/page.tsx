
'use client';

// This is a placeholder for the dynamic doctor chat page.
// The actual implementation will come in the next step.

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, ShoppingCart, Info, SendHorizonal, MoreVertical, Paperclip, Sparkles, Shield, FlaskConical, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

type Message = {
    role: 'user' | 'model';
    content: React.ReactNode;
};

type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};

const doctors: Record<string, { name: string; specialty: string; avatarHint: string; icon: React.ElementType, isPro: boolean }> = {
    general: { name: 'Dr. Rina General', specialty: 'AI Konsultan Umum', avatarHint: 'female doctor avatar', icon: Sparkles, isPro: false },
    acne: { name: 'Dr. Andi Jerawat', specialty: 'Spesialis Jerawat', avatarHint: 'male doctor avatar', icon: Shield, isPro: true },
    aging: { name: 'Dr. Citra Awet Muda', specialty: 'Spesialis Anti-Aging', avatarHint: 'female doctor professional', icon: Sparkles, isPro: true },
    ingredients: { name: 'Dr. Budi Bahan', specialty: 'Spesialis Bahan Skincare', avatarHint: 'male doctor scientist', icon: FlaskConical, isPro: true },
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

    useEffect(() => {
         if (doctor.isPro) {
            // Here you would implement a subscription gate.
            // For now, we'll just show a toast and redirect.
            toast({
                title: 'Fitur Pro',
                description: `Konsultasi dengan ${doctor.name} memerlukan langganan GlowPilot Pro.`,
                variant: 'destructive',
            });
            router.push('/chat/general');
            return;
        }

        const startConversation = async () => {
            if (messages.length > 0) return;
            setLoading(true);
            try {
                const res = await conductDiagnosis({ currentHistory: [], photoDataUri: null });
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
    }, [doctor.isPro, doctor.name, router]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

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
                photoDataUri: null 
            });

            const assistantMessage: Message = {
                role: 'model',
                content: res.isComplete && res.diagnosisResult 
                    ? renderDiagnosis(res.diagnosisResult)
                    : res.response
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
                        <AvatarImage src={`https://placehold.co/100x100.png`} alt={doctor.name} data-ai-hint={doctor.avatarHint} />
                        <AvatarFallback>{doctor.name.substring(0, 1)}</AvatarFallback>
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
        </div>
    )
}

