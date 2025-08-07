
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";


export default function LandingPage() {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        // Wait until the user loading state is resolved
        if (!isLoading) {
            if (user) {
                // If user is logged in, redirect to the main chat page
                router.replace('/chat');
            } else {
                // If user is not logged in, redirect to the login/onboarding page
                router.replace('/login');
            }
        }
    }, [user, isLoading, router]);

    // Show a loading spinner while checking auth state
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary"/>
            <p className="text-muted-foreground mt-4">Mempersiapkan sesi Anda...</p>
        </div>
    );
}
