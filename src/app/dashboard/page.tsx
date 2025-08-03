
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Scale, User, Wand2, ShieldCheck, Soup, Sun, LineChart, Sparkles, MessageSquare, UserCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const handleStartConsultation = () => {
        // Here you would typically initiate the conversation flow
        // For now, we'll just navigate to the chat page
        router.push('/dermatologist');
    }

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="Mulky" data-ai-hint="user avatar" />
                <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm text-muted-foreground">Selamat Pagi</p>
                <p className="font-bold text-lg">Mulky</p>
            </div>
        </div>
         <Button variant="ghost" size="icon">
            <UserCircle className="w-6 h-6"/>
        </Button>
      </header>

      <Card className="glass-card w-full text-center bg-primary/10 border-primary/20">
        <CardContent className="p-6">
            <h2 className="text-xl font-bold">Konsultasi Gratis dengan AI Dermatologist</h2>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Dapatkan saran skincare personal dari AI dermatologist kami. Mulai dengan konsultasi gratis sekarang!</p>
            <Button onClick={handleStartConsultation}>
                Kirim Pertanyaan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardContent>
      </Card>
      
      <section>
        <h3 className="font-bold text-lg mb-4">Fitur Unggulan GlowPilot</h3>
        <div className="grid grid-cols-2 gap-4">
            <FeatureCard title="AI Consultation" description="Chat dengan AI dermatologist" icon={<MessageSquare className="w-6 h-6 text-primary"/>} href="/dermatologist" />
            <FeatureCard title="Progress Tracking" description="Monitor perjalanan kulit" icon={<LineChart className="w-6 h-6 text-primary"/>} href="/tracking" />
            <FeatureCard title="Smart Recommendations" description="Produk yang tepat untuk Anda" icon={<Sparkles className="w-6 h-6 text-primary"/>} href="/catalog" />
            <FeatureCard title="Personal Profile" description="Profil diri yang personal" icon={<User className="w-6 h-6 text-primary"/>} href="/profile" />
        </div>
      </section>

      <section>
        <h3 className="font-bold text-lg mb-4">Rekomendasi Dokter</h3>
         <div className="flex flex-col gap-3">
             <DoctorCard name="Dr. Rina General" specialty="Konsultan Umum Skincare" avatarHint="female doctor" />
             <DoctorCard name="Dr. Sari Kulit" specialty="Spesialis Jerawat & Komedo" avatarHint="female doctor face" />
         </div>
      </section>

    </div>
  );
}

const FeatureCard = ({title, description, icon, href}: {title: string, description: string, icon: React.ReactNode, href: string}) => (
    <Link href={href} className="block">
        <Card className="glass-card h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full">
                    {icon}
                </div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
)

const DoctorCard = ({name, specialty, avatarHint}: {name: string, specialty: string, avatarHint: string}) => (
    <Card className="glass-card">
        <CardContent className="p-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
                 <Avatar className="w-12 h-12">
                    <AvatarImage src="https://placehold.co/100x100.png" alt={name} data-ai-hint={avatarHint} />
                    <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-muted-foreground">{specialty}</p>
                </div>
           </div>
            <Button size="sm" variant="outline" asChild>
                <Link href="/dermatologist">
                    Tanya <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)
