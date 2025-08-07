
'use client';

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export function VoiceInput() {
    // Add voice recognition logic here
    const handleVoiceInput = () => {
        alert("Voice input is not implemented yet.");
    };

    return (
        <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={handleVoiceInput}>
            <Mic className="w-5 h-5"/>
            <span className="sr-only">Use Microphone</span>
        </Button>
    );
}
