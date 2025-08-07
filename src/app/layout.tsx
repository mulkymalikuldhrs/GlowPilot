
'use client';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuroraBackground } from '@/components/aurora/Background';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/bottom-nav';
import { UserProvider } from '@/hooks/use-user';

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Define routes that are standalone or should not have the bottom nav.
  // The root landing page and login page should be clean.
  const noNavRoutes = ['/', '/login', '/onboarding'];
  const showNav = !noNavRoutes.includes(pathname);

  return (
    <div className="relative flex flex-col min-h-screen">
      <main className={`flex-1 ${showNav ? 'pb-20' : ''}`}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <AuroraBackground />
              <AppContent>{children}</AppContent>
              <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
