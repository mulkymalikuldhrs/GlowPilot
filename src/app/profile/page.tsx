
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Cog, LogOut, User, History } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {

    const menuItems = [
        {
            label: 'Riwayat Konsultasi',
            icon: <History className="w-5 h-5 text-muted-foreground" />,
            href: '/history'
        },
        {
            label: 'Skin Goals',
            icon: <User className="w-5 h-5 text-muted-foreground" />,
            href: '/tracking'
        },
        {
            label: 'Pengaturan',
            icon: <Cog className="w-5 h-5 text-muted-foreground" />,
            href: '/settings'
        }
    ];

    return (
        <div className="p-4 flex flex-col items-center">
             <header className="w-full text-center py-4">
                <h1 className="text-xl font-bold">Profil</h1>
            </header>
            
            <div className="flex flex-col items-center gap-2 mt-8">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Mulkymalikuldhr" data-ai-hint="user avatar" />
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">Mulkymalikuldhr</h2>
            </div>

            <div className="w-full max-w-md mt-10 space-y-3">
               {menuItems.map(item => (
                 <Link href={item.href} key={item.label}>
                    <Card className="glass-card">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <span className="font-semibold">{item.label}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                        </CardContent>
                    </Card>
                 </Link>
               ))}
            </div>

            <div className="w-full max-w-md mt-6">
                <Button variant="ghost" className="w-full justify-start gap-4 p-4 text-base text-destructive">
                    <LogOut className="w-5 h-5" />
                    Keluar
                </Button>
            </div>
        </div>
    )
}
