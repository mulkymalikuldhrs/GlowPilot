
'use client';
import type { Message } from "@/app/chat/[doctor]/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Volume2, PlayCircle, Loader2, StopCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ChatBubbleProps {
    message: Message;
    doctor: {
        name: string;
        avatar: string;
        dataAiHint: string;
    };
    playingMessageId: string | null;
    onPlayAudio: (audioUrl: string, messageId: string) => void;
    onGenerateAudio: (text: string, messageId: string) => void;
}

export function ChatBubble({ message, doctor, playingMessageId, onPlayAudio, onGenerateAudio }: ChatBubbleProps) {
    const isPlaying = playingMessageId === message.id;

    const renderAudioButton = () => {
        if (message.role !== 'model' || !message.textForTts) return null;

        let icon = <PlayCircle className="h-4 w-4" />;
        let text = "Putar Audio";
        let action = () => message.audioUrl ? onPlayAudio(message.audioUrl, message.id) : onGenerateAudio(message.textForTts!, message.id);

        if (message.isGeneratingAudio) {
            icon = <Loader2 className="h-4 w-4 animate-spin" />;
            text = "Membuat audio...";
        } else if (isPlaying) {
            icon = <StopCircle className="h-4 w-4" />;
            text = "Hentikan";
        }
        
        return (
            <Button 
                onClick={action} 
                disabled={message.isGeneratingAudio}
                variant="ghost"
                size="sm"
                className="mt-2 text-primary/80 hover:text-primary transition-colors flex items-center gap-1 text-xs -ml-2 h-auto py-1"
            >
                {icon}
                <span>{text}</span>
            </Button>
        );
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
               {renderAudioButton()}
           </div>
           {message.role === 'user' && (
               <Avatar className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                   <User className="h-5 w-5 text-secondary-foreground" />
               </Avatar>
           )}
       </div>
    );
}
