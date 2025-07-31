
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Mic, SendHorizonal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
    onSubmit: (values: { description: string; photoDataUri: string | null; }) => void;
    isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
    const [description, setDescription] = useState('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = 'id-ID';
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                     interimTranscript += event.results[i][0].transcript;
                }
                setDescription(prev => prev + interimTranscript);
            };
            
            recognition.onend = () => {
              setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                let errorMessage = 'Terjadi kesalahan saat pengenalan suara.';
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    errorMessage = 'Akses mikrofon ditolak. Mohon izinkan di pengaturan browser Anda.';
                } else if (event.error === 'no-speech') {
                    errorMessage = 'Tidak ada suara yang terdeteksi.';
                }
                toast({ title: 'Kesalahan Suara', description: errorMessage, variant: 'destructive' });
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
        }
    }, [toast]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast({
                    title: 'File Tidak Valid',
                    description: 'Silakan pilih file gambar (contoh: JPG, PNG, WEBP).',
                    variant: 'destructive',
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPhotoPreview(result);
                setPhotoDataUri(result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleMicClick = () => {
        if (!recognitionRef.current) {
            toast({ title: 'Browser Tidak Didukung', description: 'Browser Anda tidak mendukung pengenalan suara.', variant: 'destructive' });
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
        if (isLoading) return;
        if (!description && !photoDataUri) return;
        
        onSubmit({ description, photoDataUri });

        // Reset form setelah submit
        setDescription('');
        setPhotoPreview(null);
        setPhotoDataUri(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveImage = () => {
        setPhotoPreview(null);
        setPhotoDataUri(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className="relative">
             {photoPreview && (
                <div className="absolute bottom-full left-0 mb-2 w-24 h-24 p-1 bg-secondary rounded-lg glass-card">
                    <Image src={photoPreview} alt="Preview" width={96} height={96} className="w-full h-full rounded-md object-cover" />
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
            <div className="relative flex items-center w-full">
                 <Textarea
                     id="description"
                     rows={1}
                     placeholder="Unggah foto (opsional) & jelaskan masalah kulit Anda..."
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     disabled={isLoading}
                     className="pr-36 resize-none min-h-[40px] flex items-center"
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleFormSubmit(e as any);
                        }
                     }}
                 />
                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="h-8 w-8 shrink-0"
                        aria-label="Unggah Gambar"
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
                    <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        className={`h-8 w-8 ${isListening ? 'text-primary animate-pulse' : ''}`} 
                        onClick={handleMicClick} 
                        disabled={isLoading}
                        aria-label={isListening ? 'Hentikan Perekaman' : 'Mulai Perekaman Suara'}
                    >
                        <Mic className="h-4 w-4"/>
                    </Button>
                     <Button type="submit" size="icon" disabled={isLoading || (!description && !photoDataUri)} aria-label="Kirim Pesan">
                        <SendHorizonal className="h-5 w-5" />
                     </Button>
                 </div>
            </div>
        </form>
    );
}
