
'use client'

import { cn } from "@/lib/utils";
import { Home, LineChart, MessageSquare, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Home" },
        { href: "/dermatologist", icon: MessageSquare, label: "Chat" },
        { href: "/tracking", icon: LineChart, label: "Progress" },
        { href: "/catalog", icon: ShoppingBag, label: "Produk" },
        { href: "/profile", icon: User, label: "Profil" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t z-20">
            <nav className="flex justify-around items-center h-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link href={item.href} key={item.label} className={cn("flex flex-col items-center justify-center gap-1 w-full h-full", 
                            isActive ? "text-primary" : "text-muted-foreground"
                        )}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
