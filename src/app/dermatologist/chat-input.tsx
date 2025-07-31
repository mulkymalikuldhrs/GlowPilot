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
            const recognition = new SpeechRecognition();
            recognition.continuous = true; // Dengarkan terus menerus
            recognition.lang = 'id-ID'; // Set bahasa ke Indonesia
            recognition.interimResults = true; // Dapatkan hasil sementara

            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setDescription(prev => `${prev}${finalTranscript}`);
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

            recognition.onend = () => {
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
        }
    }, [toast]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validasi tipe file
            if (!file.type.startsWith('image/')) {
                toast({
                    title: 'File Tidak Valid',
                    description: 'Silakan pilih file gambar (contoh: JPG, PNG, WEBP).',
                    variant: 'destructive',
                });
                return;
            }
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
            toast({ title: 'Browser Tidak Didukung', description: 'Browser Anda tidak mendukung pengenalan suara.', variant: 'destructive' });
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        if (!description && !photo) return;
        
        const photoDataUri = photo ? await fileToBase64(photo) : null;
        onSubmit({ description, photo, photoDataUri });

        // Reset form setelah submit
        setDescription('');
        setPhoto(null);
        setPhotoPreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
                     placeholder="Unggah foto & jelaskan masalah kulit Anda..."
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     disabled={isLoading}
                     className="pr-32 resize-none min-h-[40px] flex items-center"
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
                     <Button type="submit" size="icon" disabled={isLoading || (!description && !photo)} aria-label="Kirim Pesan">
                        <SendHorizonal className="h-5 w-5" />
                     </Button>
                 </div>
            </div>
        </form>
    );
}
