
'use client';

import { conductOnboarding } from "@/ai/flows/onboarding-flow";
import { useToast } from "@/hooks/use-toast";
import type { Message, DiagnosisMessage as OnboardingMessage } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MessageInput } from "@/components/chat/MessageInput";
import { useUser } from "@/hooks/use-user";
import { ConsentModal } from "@/components/common/ConsentModal";

const onboardingAI = { 
    name: 'GlowPilot Assistant', 
    specialty: 'Onboarding Specialist', 
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'friendly robot',
    voice: 'nova'
};


export default function OnboardingPage() {
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();
    
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [onboardingMessages, setOnboardingMessages] = useState<OnboardingMessage[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();

    // For now, we assume consent is given upon reaching this page.
    // In a real app, you'd fetch this from your database.
    const [hasConsented, setHasConsented] = useState(true); 

    // Redirect if user is not logged in or loading
    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
         if (!isUserLoading && user) {
            // Here you could check if the user has already completed onboarding
            // For now, we'll just proceed.
            startConversation();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isUserLoading]);
    
     const startConversation = async () => {
        if (messages.length > 0 || !user) return;
        setLoading(true);
        try {
            // Pass user's name to the first prompt
            const initialHistory: OnboardingMessage[] = [{ role: 'user', content: `Nama saya ${user.displayName || 'pengguna baru'}.` }];
            const res = await conductOnboarding({ currentHistory: initialHistory });
            
            const initialMessage: Message = { id: Date.now().toString(), role: 'model', content: res.response };
            setMessages([initialMessage]);
            setOnboardingMessages([...initialHistory, { role: 'model', content: res.response }]);
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Gagal memulai onboarding.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
        const userOnboardingMessage: OnboardingMessage = { role: 'user', content: input };

        setMessages(prev => [...prev, userMessage]);
        setOnboardingMessages(prev => [...prev, userOnboardingMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await conductOnboarding({ 
                currentHistory: [...onboardingMessages, userOnboardingMessage],
            });

            const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: res.response };
            setMessages(prev => [...prev, assistantMessage]);

            if (!res.isComplete) {
                setOnboardingMessages(prev => [...prev, {role: 'model', content: res.response}])
            } else {
                 toast({
                    title: 'Profil Berhasil Dibuat!',
                    description: 'Mengalihkan Anda ke dashboard...',
                });

                // Here you would save the profile to Firebase Firestore
                console.log('Saving user data:', res.userData);

                setTimeout(() => {
                    router.replace('/chat');
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.'};
            setMessages(prev => [...prev, errorMessage]);
            toast({
                title: 'Error',
                description: 'Terjadi kesalahan saat memproses permintaan Anda.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    if (isUserLoading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-screen bg-background">
             <ChatWindow 
                messages={messages}
                loading={loading}
                doctor={onboardingAI}
                isLanding={true}
                onGenerateAudio={() => {}}
                onPlayAudio={() => {}}
                playingMessageId={null}
            />
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-0 border-t">
                 <MessageInput 
                    input={input}
                    setInput={setInput}
                    loading={loading}
                    attachedImage={null}
                    setAttachedImage={() => {}}
                    handleFileChange={() => {}}
                    handleSubmit={handleSubmit}
                    placeholder="Jawab di sini..."
                    allowImageAttachment={false}
                />
            </footer>
        </div>
    );
}
