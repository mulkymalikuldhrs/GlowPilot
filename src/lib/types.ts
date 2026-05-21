export type Message = {
    id: string;
    role: 'user' | 'model';
    content: string | React.ReactNode;
    audioUrl?: string;
    isGeneratingAudio?: boolean;
    textForTts?: string;
};

export type DiagnosisMessage = {
    role: 'user' | 'model';
    content: string;
};

export interface Goal {
    id: string;
    title: string;
    targetDate: string;
    progress: number;
    createdAt: any;
    isAiRecommended?: boolean;
}
