
'use client';
import type { Message } from "@/app/chat/[doctor]/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Volume2, PlayCircle, Loader2, StopCircle, Soundwave } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    message: Message;
    doctor: {
        name: string;
        avatar: string;
        dataAiHint: string;
    };
    playingMessageId: string | null;
    onPlayAudio: (audioUrl: string, messageId: string) => void;
}

export function ChatBubble({ message, doctor, playingMessageId, onPlayAudio }: ChatBubbleProps) {
    const isPlaying = playingMessageId === message.id;

    const renderAudioIndicator = () => {
        if (message.role !== 'model' || !message.textForTts) return null;

        if (message.isGeneratingAudio) {
            return <div className="flex items-center gap-1 text-xs text-primary/80 mt-2">
                <Loader2 className="h-3 w-3 animate-spin"/>
                <span>Membuat audio...</span>
            </div>
        }
        
        if (message.audioUrl) {
            return (
                <button 
                    onClick={() => onPlayAudio(message.audioUrl!, message.id)}
                    className={cn(
                        "flex items-center gap-2 text-xs text-primary/80 mt-2 transition-colors hover:text-primary",
                        isPlaying && "text-primary"
                    )}
                >
                    <Soundwave className="h-4 w-4" />
                    <span className="font-medium">{isPlaying ? 'Memutar...' : 'Putar ulang suara'}</span>
                </button>
            )
        }
        return null;
    };

    return (
        <div className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
           {message.role === 'model' && (
               <Avatar className="w-9 h-9">
                    <Image src={doctor.avatar} alt={doctor.name} width={36} height={36} className="rounded-full" data-ai-hint={doctor.dataAiHint}/>
               </Avatar>
           )}
           <div className={`rounded-2xl p-3 max-w-[80%] w-fit text-sm shadow-md ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card glass-card border-0'}`}>
               {typeof message.content === 'string' ? <p className="whitespace-pre-wrap">{message.content}</p> : message.content}
               {renderAudioIndicator()}
           </div>
           {message.role === 'user' && (
               <Avatar className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                   <User className="h-5 w-5 text-secondary-foreground" />
               </Avatar>
           )}
       </div>
    );
}

    