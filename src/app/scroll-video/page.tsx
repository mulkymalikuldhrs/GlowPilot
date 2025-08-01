
'use client';

import { ScrollVideo } from '@/components/scroll-video';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film } from 'lucide-react';

export default function ScrollVideoPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-4xl py-8 md:py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
          <Film className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
        </div>
        <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Scroll-Controlled Video</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground mx-auto">
          Gulir ke bawah untuk melihat video diputar secara interaktif. Efek ini dibuat menggunakan React Hooks untuk melacak posisi scroll dan memperbarui frame video.
        </p>
      </div>

      <ScrollVideo videoSrc="/scroll-video.mp4" />
      
      <div className="container mx-auto max-w-4xl py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Bagian Setelah Video</h2>
        <p className="mt-2 text-muted-foreground">
            Konten tambahan dapat ditempatkan di sini setelah pengalaman video interaktif selesai.
        </p>
      </div>
    </div>
  );
}
