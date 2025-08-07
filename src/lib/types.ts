
import type React from 'react';

export type Message = {
    role: 'user' | 'model';
    content: React.ReactNode;
    audioUrl?: string;
    textForTts?: string;
};

export type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};
