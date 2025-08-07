
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { conductDiagnosis } from "@/ai/flows/conversational-diagnosis-flow";
import { useToast } from "@/hooks/use-toast";
import type { Message, DiagnosisMessage } from "@/lib/types";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MessageInput } from "@/components/chat/MessageInput";

const generalDoctor = { 
    name: 'Andi (Dokter Virtual)', 
    specialty: 'Dokter Virtual Umum', 
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    voice: 'echo',
    systemPrompt: `You are Andi, a friendly and empathetic AI virtual doctor.
Your primary role is to conduct an initial triage.
1.  Start by warmly greeting the user in Bahasa Indonesia and asking about their skin concerns.
2.  After their first response, analyze their problem.
3.  If they mention a specific, common issue (e.g., "jerawat", "kerutan", "kulit kusam", "flek hitam"), you MUST immediately recommend they consult a specialist. Use this exact phrase: "Terima kasih atas informasinya. Untuk masalah Anda, saya sangat menyarankan untuk berkonsultasi lebih lanjut dengan dokter spesialis kami agar mendapatkan penanganan yang lebih akurat. Saya akan mengarahkan Anda ke halaman pemilihan dokter sekarang."
4.  If the query is very general or unclear, you can ask one clarifying question before recommending a specialist.
5.  Keep your responses concise. Your goal is to guide them to the right specialist quickly.`
};


export default function ChatPage() {
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [diagnosisMessages, setDiagnosisMessages] = useState<DiagnosisMessage[]>([]);
    const [input, setInput] = useState('');
    const { toast } = useToast();
    const [attachedImage, setAttachedImage] = useState<string | null>(null);

    useEffect(() => {
        startConversation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startConversation = async () => {
        if (messages.length > 0) return;
        setLoading(true);
        try {
            const res = await conductDiagnosis({ 
                currentHistory: [], 
                photoDataUri: null, 
                systemPrompt: generalDoctor.systemPrompt 
            });
            const initialMessage: Message = { role: 'model', content: res.response, textForTts: res.response };
            setMessages([initialMessage]);
            setDiagnosisMessages([{ role: 'model', content: res.response }]);
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Gagal memulai percakapan dengan AI.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!input.trim() && !attachedImage) return;

        const userMessageText = attachedImage ? `${input} (gambar terlampir)` : input;

        const userMessage: Message = { 
            role: 'user', 
            content: (
                <div>
                    {input && <p>{input}</p>}
                    {attachedImage && (
                        <img src={attachedImage} alt="Lampiran pengguna" width={150} height={150} className="rounded-lg mt-2"/>
                    )}
                </div>
            )
        };
        const userDiagnosisMessage: DiagnosisMessage = { role: 'user', content: userMessageText };

        setMessages(prev => [...prev, userMessage]);
        setDiagnosisMessages(prev => [...prev, userDiagnosisMessage]);
        setInput('');
        const imageToSend = attachedImage;
        setAttachedImage(null);
        setLoading(true);

        try {
            const res = await conductDiagnosis({ 
                currentHistory: [...diagnosisMessages, userDiagnosisMessage],
                photoDataUri: imageToSend,
                systemPrompt: generalDoctor.systemPrompt,
            });

            const assistantMessage: Message = {
                role: 'model',
                content: res.response,
                textForTts: res.response,
            };
            setMessages(prev => [...prev, assistantMessage]);
            setDiagnosisMessages(prev => [...prev, {role: 'model', content: res.response}])

            // Check for redirection phrase
            if (res.response.includes("Saya akan mengarahkan Anda")) {
                toast({
                    title: 'Mengalihkan...',
                    description: 'Anda akan diarahkan ke halaman dokter spesialis.'
                });
                setTimeout(() => {
                    router.push('/doctors');
                }, 2500);
            }

        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                role: 'model',
                content: 'Maaf, terjadi kesalahan. Silakan coba lagi.'
            };
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

    return (
        <div className="flex flex-col h-screen bg-background">
             <ChatWindow 
                messages={messages}
                loading={loading}
                doctor={generalDoctor}
                isLanding={true}
            />
            
            <footer className="p-4 bg-background/80 backdrop-blur-md sticky bottom-16 border-t">
                 <MessageInput 
                    input={input}
                    setInput={setInput}
                    loading={loading}
                    attachedImage={attachedImage}
                    setAttachedImage={setAttachedImage}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    placeholder="Ceritakan keluhan kulit Anda di sini..."
                />
            </footer>
        </div>
    );
}
