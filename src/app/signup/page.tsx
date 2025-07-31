
'use client';

import { conductOnboarding } from "@/ai/flows/onboarding-flow";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, SendHorizonal, User, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    // Initial message from AI
    useEffect(() => {
        const startConversation = async () => {
            setLoading(true);
            try {
                const res = await conductOnboarding({ currentHistory: [] });
                setMessages([{ role: 'model', content: res.response }]);
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Gagal memulai percakapan.', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        startConversation();
    }, [toast]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const newUserMessage: Message = { role: 'user', content: input };
        const newMessages = [...messages, newUserMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await conductOnboarding({ currentHistory: newMessages });

            if (res.isComplete) {
                // Onboarding is done!
                 setMessages(prev => [...prev, { role: 'model', content: res.response }]);
                 toast({
                    title: "Pendaftaran Selesai!",
                    description: "Profil Anda telah dibuat. Selamat datang di GlowPilot!",
                    className: "bg-green-500 text-white"
                 });
                 setTimeout(() => router.push('/dashboard'), 2000);

            } else {
                 setMessages(prev => [...prev, { role: 'model', content: res.response }]);
            }
            
        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                role: 'model',
                content: 'Maaf, terjadi kesalahan. Bisa kita coba lagi?'
            };
             setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Terjadi Kesalahan',
                description: 'Gagal melanjutkan percakapan. Silakan coba lagi.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background items-center justify-center p-4">
             <div className="w-full max-w-2xl h-full max-h-[700px] flex flex-col rounded-2xl glass-card overflow-hidden">
                <header className="p-4 border-b text-center">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
                        <Sparkles className="text-primary"/>
                        Selamat Datang di GlowPilot
                    </h1>
                    <p className="text-muted-foreground text-sm">Mari siapkan profil Anda dalam beberapa langkah.</p>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                           {message.role === 'model' && (
                               <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                   <Bot className="h-6 w-6 text-primary"/>
                               </Avatar>
                           )}
                           <div className={`rounded-2xl p-4 max-w-md w-fit ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                               <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                           </div>
                           {message.role === 'user' && (
                               <Avatar className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                   <User className="h-5 w-5 text-secondary-foreground" />
                               </Avatar>
                           )}
                       </div>
                    ))}
                     {loading && messages.length > 0 && (
                         <div className="flex items-start gap-4">
                             <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                 <Bot className="h-6 w-6 text-primary"/>
                             </Avatar>
                             <div className="rounded-2xl p-4 max-w-lg bg-secondary flex items-center space-x-2">
                                 <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                 <p className="text-sm text-muted-foreground">Mengetik...</p>
                             </div>
                         </div>
                     )}
                     <div ref={messagesEndRef} />
                </div>
            
                <div className="p-4 bg-background/50 border-t">
                    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                         <Input
                             id="message"
                             placeholder="Ketik jawaban Anda di sini..."
                             value={input}
                             onChange={(e) => setInput(e.target.value)}
                             disabled={loading}
                             className="pr-12"
                             autoComplete="off"
                         />
                         <Button type="submit" size="icon" disabled={loading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
                            <SendHorizonal className="h-4 w-4" />
                         </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
