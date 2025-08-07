
'use client';

import { conductOnboarding } from "@/ai/flows/onboarding-flow.ts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, SendHorizonal, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function OnboardingPage() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const startOnboarding = async () => {
            if (messages.length > 0) return;
            setLoading(true);
            try {
                const res = await conductOnboarding({ currentHistory: [] });
                setMessages([{ role: 'model', content: res.response }]);
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Gagal memulai onboarding.', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        startOnboarding();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await conductOnboarding({ currentHistory: newMessages });
            setMessages(prev => [...prev, { role: 'model', content: res.response }]);

            if (res.isComplete && res.userData) {
                localStorage.setItem('userData', JSON.stringify(res.userData));
                toast({
                    title: 'Profil Berhasil Dibuat!',
                    description: 'Data Anda telah disimpan. Selamat datang di GlowPilot!',
                });
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Terjadi kesalahan. Silakan coba lagi.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="sticky top-0 z-10 flex items-center justify-center p-4 border-b bg-background/80 backdrop-blur-sm gap-2">
                 <Sparkles className="w-6 h-6 text-primary" style={{color: 'hsl(var(--primary-optimistic))'}}/>
                 <h1 className="text-lg font-semibold" style={{fontFamily: 'Sora, sans-serif'}}>Personalisasi Profil Anda</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'model' && (
                           <Avatar className="w-9 h-9 bg-primary/10 flex items-center justify-center">
                               <Bot className="w-5 h-5 text-primary"/>
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-3 max-w-[80%] w-fit text-sm shadow-md ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card glass-card border-0'}`}>
                           <p className="whitespace-pre-wrap">{message.content}</p>
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
                        <Avatar className="w-9 h-9 bg-primary/10 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary"/>
                        </Avatar>
                         <div className="rounded-2xl p-3 max-w-lg bg-muted flex items-center space-x-2">
                             <Loader2 className="h-4 w-4 animate-spin text-primary" />
                             <p className="text-sm text-muted-foreground">Mengetik...</p>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} />
            </main>
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-0 border-t">
                 <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-2xl mx-auto gap-2">
                     <Input
                         id="message"
                         placeholder="Ketik jawaban Anda..."
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

    
