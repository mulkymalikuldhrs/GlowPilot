
'use client';

import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";

// Web Speech API is not a standard, so we need to check for vendor prefixes.
const SpeechRecognition =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;


interface VoiceInputProps {
    onTranscript: (transcript: string) => void;
    isListening: boolean;
    setIsListening: (isListening: boolean) => void;
}

export function VoiceInput({ onTranscript, isListening, setIsListening }: VoiceInputProps) {
    const recognitionRef = useRef<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!SpeechRecognition) {
            // Silently disable the feature if not supported.
            // A toast could be shown on first click attempt.
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'id-ID'; // Set to Indonesian

        recognition.onresult = (event: any) => {
            let final_transcript = '';
            let interim_transcript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
             onTranscript(final_transcript + interim_transcript);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            toast({
                title: "Input Suara Gagal",
                description: "Tidak dapat mengenali suara Anda. Pastikan mikrofon diizinkan.",
                variant: "destructive"
            });
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        // Cleanup on unmount
        return () => {
            recognition.stop();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleToggleListening = () => {
        const recognition = recognitionRef.current;
        if (!recognition) {
             toast({
                title: "Fitur Tidak Didukung",
                description: "Browser Anda tidak mendukung input suara.",
                variant: "destructive"
            });
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <Button 
            type="button" 
            variant={isListening ? "destructive" : "ghost"} 
            size="icon" 
            className="shrink-0" 
            onClick={handleToggleListening}
            disabled={!SpeechRecognition}
        >
            {isListening ? <MicOff className="w-5 h-5"/> : <Mic className="w-5 h-5"/>}
            <span className="sr-only">{isListening ? "Stop listening" : "Use Microphone"}</span>
        </Button>
    );
}
