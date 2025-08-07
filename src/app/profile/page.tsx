
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { History, Shield, LogOut, User, Mail, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    
    // Placeholder data since login is disabled
    const user = {
        displayName: 'Mulky Malikul Dhaher',
        email: 'mulkymalikuldhr@mail.com',
        photoURL: 'https://placehold.co/100x100.png',
        dataAiHint: 'man smiling'
    }

    const menuItems = [
        {
            href: "/history",
            icon: History,
            label: "Riwayat Konsultasi"
        },
        {
            href: "/privacy",
            icon: Shield,
            label: "Kebijakan Privasi"
        }
    ];

    return (
        <div className="p-4">
            <header className="w-full py-4 mb-6 text-center">
                <Avatar className="w-24 h-24 border-4 border-primary/50 mx-auto">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} data-ai-hint={user.dataAiHint}/>
                    <AvatarFallback>
                        <User className="w-12 h-12"/>
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mt-4" style={{fontFamily: 'Sora, sans-serif'}}>{user.displayName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
            </header>

            <div className="space-y-3">
                 <Card className="glass-card">
                    <CardContent className="p-2">
                        <div className="space-y-1">
                            {menuItems.map(item => (
                                <Link key={item.href} href={item.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors">
                                    <div className='flex items-center gap-4'>
                                        <item.icon className="w-5 h-5 text-primary"/>
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                 <Card className="glass-card bg-primary/10">
                    <CardContent className="p-4 text-center">
                        <div className='flex flex-col items-center gap-2 text-xs text-muted-foreground'>
                            <Sparkles className="w-5 h-5 text-primary"/>
                            <span className="font-medium">Dikembangkan oleh Mulky Malikul Dhaher</span>
                            <span>mulkymalikuldhr@mail.com</span>
                        </div>
                    </CardContent>
                </Card>

                <Button onClick={() => {
                    // Placeholder for logout functionality
                    alert("Logout functionality is currently disabled.");
                }} variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Keluar
                </Button>
            </div>
        </div>
    );
}
