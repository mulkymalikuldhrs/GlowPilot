
'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function TrackingPage() {
    
    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
             <header className="w-full flex items-center justify-center relative py-4">
                <Link href="/profile" className="absolute left-4">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold">Progress Tracker</h1>
            </header>

            <div className="flex flex-col items-center justify-center flex-1 text-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-muted-foreground"></div>
                </div>
                <h2 className="text-xl font-semibold">Belum ada skin goals</h2>
                <p className="text-muted-foreground mt-2 mb-6">Buat tujuan untuk melacak progres kulit Anda.</p>
                <Button>Buat Goal Pertama</Button>
            </div>
        </div>
    )
}
