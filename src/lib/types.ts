import type React from 'react';
import type { DoctorSlug } from './doctors';
export type { Database } from './types/supabase';

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

export type Doctor = {
    slug: DoctorSlug;
    name: string;
    specialty: string;
    description: string;
    avatar: string;
    dataAiHint: string;
    voice?: 'nova' | 'shimmer' | 'echo';
    systemPrompt: string;
};
