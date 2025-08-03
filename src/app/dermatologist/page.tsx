
'use client';

import { conductDiagnosis, type DiagnosisConversationOutput } from "@/ai/flows/conversational-diagnosis-flow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, ShoppingCart, Info, SendHorizonal, ArrowLeft, MoreVertical, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";

type Message = {
    role: 'user' | 'model';
    content: React.ReactNode;
};

type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};


export default function DermatologistPage() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [diagnosisMessages, setDiagnosisMessages] = useState<DiagnosisMessage[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
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
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const renderDiagnosis = (res: NonNullable<DiagnosisConversationOutput['diagnosisResult']>) => {
        return (
            <div className="space-y-6 rounded-xl border bg-background p-4 shadow-sm">
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

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const photoDataUri = e.target?.result as string;
            
            const imageMessage: Message = { role: 'user', content: <img src={photoDataUri} alt="Uploaded skin condition" className="rounded-lg max-w-xs" /> };
            setMessages(prev => [...prev, imageMessage]);
            setLoading(true);

            try {
                const res = await conductDiagnosis({ 
                    currentHistory: diagnosisMessages,
                    photoDataUri: photoDataUri 
                });
    
                const assistantMessage: Message = {
                    role: 'model',
                    content: res.isComplete && res.diagnosisResult 
                        ? renderDiagnosis(res.diagnosisResult)
                        : res.response
                };
                setMessages(prev => [...prev, assistantMessage]);
                setDiagnosisMessages(prev => [...prev, {role: 'model', content: res.response}])
    
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Gagal menganalisis gambar.', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = fileInputRef.current?.files?.[0];

        if (file) {
            handleImageUpload(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        
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
        <div className="flex flex-col h-full bg-background">
            <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard"><ArrowLeft/></Link>
                </Button>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Sari Kulit" data-ai-hint="female doctor" />
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">Dr. Sari Kulit</p>
                        <p className="text-xs text-muted-foreground">Spesialis Jerawat</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreVertical/>
                </Button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'model' && (
                           <Avatar className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                               <Bot className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/>
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-3 max-w-[80%] w-fit text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                           {typeof message.content === 'string' ? <p className="whitespace-pre-wrap">{message.content}</p> : message.content}
                       </div>
                       {message.role === 'user' && typeof message.content === 'string' && (
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
                    <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
                        <Paperclip className="w-5 h-5"/>
                        <span className="sr-only">Attach image</span>
                    </Button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0]);
                            }
                        }}
                    />
                     <Input
                         id="message"
                         placeholder="Ketik pesan Anda atau unggah gambar..."
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                         disabled={loading}
                         className="pr-12 rounded-full"
                         autoComplete="off"
                     />
                     <Button type="submit" size="icon" disabled={loading || (!input.trim() && !fileInputRef.current?.files?.length)} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                        <SendHorizonal className="h-4 w-4" />
                     </Button>
                </form>
            </footer>
        </div>
    )
}
