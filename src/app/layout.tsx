
'use client';

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
import { Gift, History, LayoutDashboard, LineChart, LogOut, Scale, Settings, ShieldCheck, User, Wand2, Rocket, Film, Sparkles, BookCopy } from 'lucide-react';
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

  const noSidebarRoutes = ['/login', '/signup'];
  // The root path "/" is now the landing page, which might not need a sidebar
  if (noSidebarRoutes.includes(pathname) || pathname === '/') {
    return (
      <html lang="id" suppressHydrationWarning>
        <head>
          <title>GlowPilot Copilot</title>
          <meta name="description" content="Asisten perawatan kulit AI pribadi Anda." />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        </head>
        <body className="antialiased" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuroraBackground />
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Logo />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold tracking-tight" style={{color: 'var(--primary-optimistic)', fontFamily: 'Sora, sans-serif'}}>GlowPilot</h2>
                    <p className="text-xs text-muted-foreground">AI Copilot</p>
                  </div>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                 <SidebarGroup>
                  <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                        <Link href="/dashboard">
                          <LayoutDashboard />
                          Dashboard
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/tracking'}>
                        <Link href="/tracking">
                          <LineChart />
                          Jurnal & Progres
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Fitur AI</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/dermatologist'}>
                        <Link href="/dermatologist">
                          <Wand2 />
                          Dermatologist Umum
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/specialists')}>
                        <Link href="/specialists">
                          <Sparkles />
                          AI Spesialis
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/compare'}>
                        <Link href="/compare">
                          <Scale />
                          Bandingkan Produk
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/catalog'}>
                        <Link href="/catalog">
                          <BookCopy />
                          Katalog Produk
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Akun & Lainnya</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/profile'}>
                        <Link href="/profile">
                          <User />
                          Profil Saya
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/history'}>
                        <Link href="/history">
                          <History />
                          Riwayat
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/referral'}>
                        <Link href="/referral">
                          <Gift />
                          Undang & Dapatkan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                        <Link href="/settings">
                          <Settings />
                          Pengaturan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                 <SidebarGroup className="mt-auto">
                  <SidebarMenu>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/upgrade'}>
                        <Link href="/upgrade">
                          <Rocket />
                          Upgrade ke Pro
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex flex-col">
              <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/60 px-4 backdrop-blur-md sm:px-6">
                 <SidebarTrigger className="md:hidden"/>
                 <div className="flex-1"></div>
                 <ThemeToggle />
                 <Button variant="ghost" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                 </Button>
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
                      <DropdownMenuItem asChild><Link href="/"><LogOut className="mr-2 h-4 w-4" />Keluar</Link></DropdownMenuItem>
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
