
'use client'

import { cn } from "@/lib/utils";
import { MessageSquare, ShoppingBag, AreaChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/chat/general", icon: MessageSquare, label: "Chat" },
        { href: "/catalog", icon: ShoppingBag, label: "Katalog" },
        { href: "/progress", icon: AreaChart, label: "Progres" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t z-20">
            <nav className="flex justify-around items-center h-full max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link href={item.href} key={item.label} className={cn("flex flex-col items-center justify-center gap-1 w-full h-full", 
                            isActive ? "text-primary" : "text-muted-foreground"
                        )}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
