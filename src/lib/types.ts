
import type React from 'react';

export type Message = {
    id: string;
    role: 'user' | 'model';
    content: React.ReactNode;
    audioUrl?: string;
    textForTts?: string;
    isGeneratingAudio?: boolean;
};

export type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};
