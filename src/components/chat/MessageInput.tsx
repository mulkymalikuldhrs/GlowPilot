
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, SendHorizonal, XCircle } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { VoiceInput } from "./VoiceInput";

interface MessageInputProps {
    input: string;
    setInput: (value: string) => void;
    loading: boolean;
    attachedImage: string | null;
    setAttachedImage: (value: string | null) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    placeholder?: string;
}

export function MessageInput({
    input,
    setInput,
    loading,
    attachedImage,
    setAttachedImage,
    handleFileChange,
    handleSubmit,
    placeholder = "Ketik pesan atau tahan ikon mik untuk bicara..."
}: MessageInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isListening, setIsListening] = useState(false);

    const handleTranscript = (transcript: string) => {
        setInput(transcript);
    };
    
    return (
        <div className="space-y-2">
             {attachedImage && (
                <div className="relative w-20 h-20 ml-4">
                    <Image src={attachedImage} alt="Lampiran" fill objectFit="cover" className="rounded-md" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => setAttachedImage(null)}
                    >
                        <XCircle className="h-4 w-4" />
                    </Button>
                </div>
            )}
             <form onSubmit={handleSubmit} className="relative flex items-center w-full gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                />
                <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="w-5 h-5"/>
                    <span className="sr-only">Attach image</span>
                </Button>
                <VoiceInput 
                    onTranscript={handleTranscript}
                    isListening={isListening}
                    setIsListening={setIsListening} 
                />
                 <Input
                     id="message"
                     placeholder={isListening ? "Mendengarkan..." : placeholder}
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     disabled={loading}
                     className="pr-12 rounded-full"
                     autoComplete="off"
                 />
                 <Button type="submit" size="icon" disabled={loading || (!input.trim() && !attachedImage)} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                    <SendHorizonal className="h-4 w-4" />
                 </Button>
            </form>
        </div>
    )
}
