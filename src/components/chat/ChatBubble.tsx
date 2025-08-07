
'use client';
import type { Message } from "@/app/chat/[doctor]/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Volume2, PlayCircle } from "lucide-react";
import Image from "next/image";

interface ChatBubbleProps {
    message: Message;
    doctor: {
        name: string;
        avatar: string;
        dataAiHint: string;
    };
    index: number;
    // These props would be passed down from the parent chat component
    // playingMessageIndex?: number | null;
    // playAudio?: (audioUrl: string, index: number) => void;
    // handleGenerateAudio?: (text: string, index: number) => void;
}

export function ChatBubble({ message, doctor, index }: ChatBubbleProps) {
    // Dummy state for now
    const playingMessageIndex: number | null = null;
    const playAudio = (audioUrl: string, index: number) => {};
    const handleGenerateAudio = (text: string, index: number) => {};

    return (
        <div className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
           {message.role === 'model' && (
               <Avatar className="w-9 h-9">
                    <Image src={doctor.avatar} alt={doctor.name} width={36} height={36} className="rounded-full" data-ai-hint={doctor.dataAiHint}/>
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
    );
}
