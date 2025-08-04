
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { History, Shield, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="p-4 space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-60" />
                    </div>
                </div>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        )
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
                
                <Button onClick={logout} variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Keluar
                </Button>
            </div>
        </div>
    );
}
