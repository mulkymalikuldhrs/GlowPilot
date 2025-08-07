
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
import { createClient } from "@/lib/supabase/client";
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

    const [showConsent, setShowConsent] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    // Redirect if user is not logged in or loading
    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    // Check consent status once user is loaded
    useEffect(() => {
        if (user) {
            const checkConsent = async () => {
                const supabase = createClient();
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('consent')
                    .eq('id', user.id)
                    .single();
                
                if (profile && profile.consent) {
                    setHasConsented(true);
                    startConversation(); // Already consented, start chat
                } else if (profile) {
                    setShowConsent(true); // Needs consent
                } else {
                    // Profile might not exist yet, show consent
                    setShowConsent(true);
                }
            };
            checkConsent();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    
    const handleAcceptConsent = async () => {
        if (!user) return;
        
        const supabase = createClient();
        const { error } = await supabase
            .from('profiles')
            .upsert({ id: user.id, consent: true, full_name: user.user_metadata.full_name, email: user.email }, { onConflict: 'id' });

        if (error) {
            toast({ title: "Gagal menyimpan persetujuan", variant: "destructive" });
            console.error(error);
        } else {
            setHasConsented(true);
            setShowConsent(false);
            startConversation();
        }
    };


     const startConversation = async () => {
        if (messages.length > 0 || !user) return;
        setLoading(true);
        try {
            // Pass user's name to the first prompt
            const initialHistory: OnboardingMessage[] = [{ role: 'user', content: `Nama saya ${user.user_metadata.full_name || 'pengguna baru'}.` }];
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

                const supabase = createClient();
                if(user && res.userData) {
                    await supabase.from('profiles').update({ 
                        full_name: res.userData.name,
                        skin_type: res.userData.skinType,
                        skin_concerns: res.userData.skinConcerns,
                        current_routine: res.userData.currentRoutine,
                        lifestyle_factors: res.userData.lifestyleFactors,
                     }).eq('id', user.id);
                }

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

    if (showConsent) {
        return <ConsentModal isOpen={showConsent} onAccept={handleAcceptConsent} />
    }
    
    if (!hasConsented) {
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
