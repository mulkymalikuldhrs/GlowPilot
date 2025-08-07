
'use client';

import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Sparkles, User } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';

interface ChatWindowProps {
    messages: Message[];
    loading: boolean;
    doctor: {
        name: string;
        avatar: string;
        dataAiHint: string;
    },
    isLanding?: boolean;
}

export function ChatWindow({ messages, loading, doctor, isLanding = false }: ChatWindowProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <main className="flex-1 overflow-y-auto p-4 space-y-6">
            {isLanding && (
                <div className="text-center my-6">
                    <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-20 h-20 mb-4">
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>
                        GlowPilot
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                        Asisten AI pribadi Anda untuk mendapatkan kulit impian.
                    </p>
                </div>
            )}
            {messages.map((message, index) => (
                <ChatBubble 
                    key={index} 
                    message={message} 
                    doctor={doctor} 
                    index={index}
                />
            ))}
            {loading && (
                 <div className="flex items-start gap-3">
                     <Avatar className="w-9 h-9">
                        <Image src={doctor.avatar} alt={doctor.name} width={36} height={36} className="rounded-full" data-ai-hint={doctor.dataAiHint}/>
                     </Avatar>
                     <div className="rounded-2xl p-3 max-w-lg bg-muted flex items-center space-x-2">
                         <Loader2 className="h-4 w-4 animate-spin text-primary" />
                         <p className="text-sm text-muted-foreground">Menganalisis...</p>
                     </div>
                 </div>
             )}
            <div ref={messagesEndRef} />
        </main>
    )
}
