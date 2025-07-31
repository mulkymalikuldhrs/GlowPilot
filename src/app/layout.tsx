
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuroraBackground } from '@/components/aurora-background';
import { Toaster } from '@/components/ui/toaster';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Gift, History, LayoutDashboard, LineChart, LogIn, LogOut, Scale, Settings, ShieldCheck, User, Wand2, Newspaper, LifeBuoy, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Hide sidebar and header for landing and login pages
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return (
      <html lang="id" suppressHydrationWarning>
        <head>
          <title>GlowPilot Copilot</title>
          <meta name="description" content="Asisten perawatan kulit AI pribadi Anda." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AuroraBackground />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>GlowPilot Copilot</title>
        <meta name="description" content="Asisten perawatan kulit AI pribadi Anda." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuroraBackground />
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Logo />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold tracking-tight" style={{color: 'var(--primary-optimistic)'}}>GlowPilot</h2>
                    <p className="text-xs text-muted-foreground">AI Copilot</p>
                  </div>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                 <SidebarGroup>
                  <SidebarGroupLabel>Menu</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard />
                          Dashboard
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/tracking">
                          <LineChart />
                          Pelacakan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Fitur</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dermatologist">
                          <Wand2 />
                          AI Dermatologist
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/specialists">
                          <ShieldCheck />
                          AI Specialists
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/compare">
                          <Scale />
                          Perbandingan Produk
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Akun</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/profile">
                          <User />
                          Profil
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/history">
                          <History />
                          Riwayat
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/referral">
                          <Gift />
                          Referral
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/settings">
                          <Settings />
                          Pengaturan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                 <SidebarGroup>
                  <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
                  <SidebarMenu>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/newsletter">
                          <Newspaper />
                          Newsletter
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/upgrade">
                          <Rocket />
                          Upgrade
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/help">
                          <LifeBuoy />
                          Bantuan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex flex-col">
              <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
                 <SidebarTrigger>
                   <Button variant="ghost" size="icon" className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
                   </Button>
                 </SidebarTrigger>
                 <div className="flex-1"></div>
                 <ThemeToggle />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                         <Avatar>
                           <AvatarImage src="https://placehold.co/100x100.png" alt="Mulky Malikul Dhaher" data-ai-hint="user avatar" />
                           <AvatarFallback>M</AvatarFallback>
                         </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/profile">Profil</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/history">Riwayat</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/settings">Pengaturan</Link></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/login"><LogOut className="mr-2 h-4 w-4" />Keluar</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </header>
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
