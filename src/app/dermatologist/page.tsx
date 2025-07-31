'use client';

import { diagnoseSkinCondition, type SkinConditionDiagnosisOutput } from "@/ai/flows/skin-condition-diagnosis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Bot, ImageIcon, Loader2, Mic, User, Volume2, Wand2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function DermatologistPage() {
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SkinConditionDiagnosisOutput | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
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

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            toast({ title: 'Browser Not Supported', description: 'Your browser does not support text-to-speech.', variant: 'destructive' });
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!photo || !description) {
            toast({
                title: 'Missing Fields',
                description: 'Please upload a photo and provide a description.',
                variant: 'destructive'
            });
            return;
        }
        setLoading(true);
        setResult(null);

        try {
            const photoDataUri = await fileToBase64(photo);
            const res = await diagnoseSkinCondition({ photoDataUri, description });
            setResult(res);
        } catch (error) {
            console.error(error);
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
        <div className="container mx-auto max-w-4xl py-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Wand2 className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">AI Dermatologist</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Upload a photo of your skin concern and describe the issue. Our AI will provide a potential diagnosis and a recommended skincare routine.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="photo">Upload Photo</Label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border/50 px-6 py-10">
                                <div className="text-center">
                                    {photoPreview ? (
                                        <Image src={photoPreview} alt="Preview" width={200} height={200} className="mx-auto h-32 w-32 rounded-lg object-cover" />
                                    ) : (
                                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
                                    )}
                                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                        <label htmlFor="photo" className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                                            <span>Upload a file</span>
                                            <input id="photo" name="photo" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-muted-foreground/80">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Describe your concern</Label>
                             <div className="relative">
                                <Textarea
                                    id="description"
                                    rows={4}
                                    placeholder="e.g., 'I have red, itchy patches on my cheeks that have been there for a week.'"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={loading}
                                    className="pr-10"
                                />
                                <Button type="button" size="icon" variant="ghost" className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${isListening ? 'text-primary' : ''}`} onClick={handleMicClick} disabled={loading}>
                                    <Mic className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Get Diagnosis
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {result && (
                 <Card className="mt-8 glass-card">
                    <CardHeader>
                        <CardTitle>AI Diagnosis & Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                             <div className="flex items-start gap-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                    <User className="h-5 w-5 text-secondary-foreground" />
                                </span>
                                <div className="rounded-lg bg-secondary p-4 flex-1 glass-card">
                                    <p className="text-sm">{description}</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Bot className="h-5 w-5 text-primary" />
                                </span>
                                <div className="rounded-lg bg-primary/10 p-4 flex-1 glass-card">
                                    <h3 className="font-semibold text-primary flex items-center justify-between">
                                        Diagnosis
                                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => speak(result.diagnosis)}>
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                    </h3>
                                    <p className="text-sm text-primary/90 mt-1">{result.diagnosis}</p>
                                </div>
                             </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2 glass-card p-4 rounded-lg">
                                <h3 className="font-semibold">AM Routine ☀️</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations.amRoutine}</p>
                            </div>
                             <div className="space-y-2 glass-card p-4 rounded-lg">
                                <h3 className="font-semibold">PM Routine 🌙</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations.pmRoutine}</p>
                            </div>
                        </div>
                         <p className="text-center text-xs text-muted-foreground pt-4">Disclaimer: This AI diagnosis is for informational purposes only and is not a substitute for professional medical advice.</p>
                    </CardContent>
                 </Card>
            )}
        </div>
    )
}
