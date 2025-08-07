
'use client';

import type { Message } from '@/app/chat/[doctor]/page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User } from 'lucide-react';
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
    }
}

export function ChatWindow({ messages, loading, doctor }: ChatWindowProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <main className="flex-1 overflow-y-auto p-4 space-y-6">
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
