'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Mic, SendHorizonal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
    onSubmit: (values: { description: string; photo: File | null; photoDataUri: string | null; }) => void;
    isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setDescription(prev => prev ? `${prev} ${transcript}` : transcript);
                setIsListening(false);
            };
            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                toast({ title: 'Voice Error', description: 'Could not recognize speech.', variant: 'destructive' });
                setIsListening(false);
            };
            recognition.onend = () => {
                setIsListening(false);
            };
        }
    }, [toast]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            toast({ title: 'Browser Not Supported', description: 'Your browser does not support voice recognition.', variant: 'destructive' });
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const photoDataUri = photo ? await fileToBase64(photo) : null;
        onSubmit({ description, photo, photoDataUri });
        setDescription('');
        setPhoto(null);
        setPhotoPreview(null);
    };

    const handleRemoveImage = () => {
        setPhoto(null);
        setPhotoPreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className="relative">
             {photoPreview && (
                <div className="absolute bottom-full left-0 mb-2 w-32 h-32 p-2 bg-secondary rounded-lg glass-card">
                    <Image src={photoPreview} alt="Preview" width={128} height={128} className="w-full h-full rounded-md object-cover" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={handleRemoveImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
             )}
            <div className="flex items-center gap-4">
                 <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="h-10 w-10 shrink-0"
                 >
                    <ImageIcon className="h-5 w-5" />
                 </Button>
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                 />
                 <Textarea
                     id="description"
                     rows={1}
                     placeholder="Describe your concern, or use the mic to speak..."
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     disabled={isLoading}
                     className="pr-20 resize-none"
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleFormSubmit(e as any);
                        }
                     }}
                 />
                 <div className="absolute right-14 top-1/2 -translate-y-1/2 flex">
                    <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        className={`h-8 w-8 ${isListening ? 'text-primary' : ''}`} 
                        onClick={handleMicClick} 
                        disabled={isLoading}
                    >
                        <Mic className="h-4 w-4"/>
                    </Button>
                 </div>
                 <Button type="submit" size="icon" disabled={isLoading || (!description && !photo)}>
                    <SendHorizonal className="h-5 w-5" />
                 </Button>
            </div>
        </form>
    );
}
