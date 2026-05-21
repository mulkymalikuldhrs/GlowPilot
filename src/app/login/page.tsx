
'use server';

import { Suspense } from 'react';
import LoginPageContent from './LoginPageContent';
import { Loader2 } from 'lucide-react';

export default async function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col h-screen bg-background items-center justify-center p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                <p className="text-muted-foreground mt-4">Memuat halaman...</p>
            </div>
        }>
            <LoginPageContent />
        </Suspense>
    );
}
