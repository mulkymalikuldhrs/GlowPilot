
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { History, Shield, LogOut, User, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    
    // Placeholder data since login is disabled
    const user = {
        displayName: 'Mulky Malikul Dhaher',
        email: 'mulkymalikuldhr@mail.com',
        photoURL: 'https://placehold.co/100x100.png'
    }

    return (
        <div className="p-4">
            <header className="w-full py-4 mb-4">
                <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20 border-4 border-primary/50">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'}/>
                        <AvatarFallback>
                            <User className="w-10 h-10"/>
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold">{user.displayName}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-4">
                 <Card className="glass-card">
                    <CardContent className="p-4">
                        <Link href="/history" className="flex items-center justify-between">
                            <div className='flex items-center gap-4'>
                                <History className="w-5 h-5 text-primary"/>
                                <span className="font-medium">Riwayat Konsultasi</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                 <Card className="glass-card">
                    <CardContent className="p-4">
                        <Link href="/privacy" className="flex items-center justify-between">
                             <div className='flex items-center gap-4'>
                                <Shield className="w-5 h-5 text-primary"/>
                                <span className="font-medium">Kebijakan Privasi</span>
                            </div>
                        </Link>
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
