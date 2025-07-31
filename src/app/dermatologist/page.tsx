'use client';

import { diagnoseSkinCondition, type SkinConditionDiagnosisOutput } from "@/ai/flows/skin-condition-diagnosis";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, User, Volume2, Wand2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChatInput } from "./chat-input";

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
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'id-ID';
            window.speechSynthesis.speak(utterance);
        } else {
            toast({ title: 'Browser Not Supported', description: 'Your browser does not support text-to-speech.', variant: 'destructive' });
        }
    }

    const handleSubmit = async (values: { description: string; photo: File | null; photoDataUri: string | null }) => {
        const { description, photoDataUri } = values;

        if (!photoDataUri || !description) {
            toast({
                title: 'Missing Fields',
                description: 'Please upload a photo and provide a description.',
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
            const res = await diagnoseSkinCondition({ photoDataUri, description });
            
            const assistantMessage: Message = {
                role: 'assistant',
                rawContent: `Diagnosis: ${res.diagnosis}. \n\n AM Routine: ${res.recommendations.amRoutine}. \n\n PM Routine: ${res.recommendations.pmRoutine}`,
                content: (
                     <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-primary flex items-center justify-between mb-2">
                                Diagnosis
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => speak(res.diagnosis)}>
                                    <Volume2 className="h-4 w-4" />
                                </Button>
                            </h3>
                            <p className="text-sm text-primary/90 mt-1">{res.diagnosis}</p>
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
                         <p className="text-center text-xs text-muted-foreground pt-4">Disclaimer: This AI diagnosis is for informational purposes only and is not a substitute for professional medical advice.</p>
                    </div>
                )
            };
            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'An error occurred during diagnosis. Please try again.'
            };
             setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Diagnosis Failed',
                description: 'An error occurred during diagnosis. Please try again.',
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
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Wand2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">AI Dermatologist</h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Upload a photo of your skin concern and describe the issue. Our AI will provide a potential diagnosis and a recommended skincare routine.
                    </p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                       {message.role === 'assistant' && (
                           <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                               <Bot className="h-5 w-5 text-primary" />
                           </Avatar>
                       )}
                       <div className={`rounded-2xl p-4 max-w-lg glass-card ${message.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/5'}`}>
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
                            <Bot className="h-5 w-5 text-primary" />
                         </Avatar>
                         <div className="rounded-2xl p-4 max-w-lg glass-card bg-primary/5 flex items-center space-x-2">
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
