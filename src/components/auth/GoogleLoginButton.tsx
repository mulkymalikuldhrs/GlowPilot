
'use client';

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GoogleLoginButton() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/api/auth/callback`,
            },
        });

        if (error) {
            console.error("Login failed:", error.message);
            setLoading(false);
        }
        // If successful, Supabase redirects, so we don't need to setLoading(false)
    };

    return (
        <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full"
            variant="outline"
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.5 173.5 58.1l-65.2 64.2C335.5 97.4 294.8 80 248 80c-82.6 0-150.2 67.5-150.2 150.2S165.4 406.4 248 406.4c97.1 0 133.3-65.7 137-98.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
                </svg>
            )}
            Masuk dengan Google
        </Button>
    );
}
