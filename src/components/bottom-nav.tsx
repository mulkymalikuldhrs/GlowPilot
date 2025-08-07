
'use client'

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { MessageSquare, ShoppingBag, AreaChart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();

    const navItems = [
        { href: "/chat", icon: MessageSquare, label: "Chat" },
        { href: "/catalog", icon: ShoppingBag, label: "Produk" },
        { href: "/progress", icon: AreaChart, label: "Progres" },
        { href: "/profile", icon: User, label: "Profil" },
    ];

    const isActive = (itemHref: string) => {
         if (itemHref === "/chat") {
            // Also active for specific doctor chats
            return pathname.startsWith('/chat');
        }
        return pathname === itemHref;
    };

    // Don't render the nav if the user is not logged in
    if (isLoading || !user) {
        return null;
    }


    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t z-20">
            <nav className="flex justify-around items-center h-full max-w-md mx-auto">
                {navItems.map((item) => (
                    <Link href={item.href} key={item.label} className={cn("flex flex-col items-center justify-center gap-1 w-full h-full transition-colors", 
                        isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}>
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
