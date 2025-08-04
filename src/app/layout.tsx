
'use client';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuroraBackground } from '@/components/aurora-background';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/bottom-nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noNavRoutes = ['/', '/scroll-video'];
  const showNav = !noNavRoutes.includes(pathname);


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
           <div className="relative flex flex-col min-h-screen">
                <main className="flex-1 pb-20">{children}</main>
                {showNav && <BottomNav />}
            </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
