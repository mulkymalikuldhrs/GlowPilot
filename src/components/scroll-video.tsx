
'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollVideoProps {
  videoSrc: string;
  className?: string;
}

export function ScrollVideo({ videoSrc, className }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We need to wait for the metadata to be loaded to get the duration.
    const handleLoadedMetadata = () => {
      const scrollSection = containerRef.current;
      if (!scrollSection) return;

      const handleScroll = () => {
        const { top, height } = scrollSection.getBoundingClientRect();
        
        // This is the total scrollable distance for this section
        const scrollableHeight = height - window.innerHeight;
        
        // This prevents calculation errors when the section is not scrollable
        if (scrollableHeight <= 0) return;

        // Calculate the scroll percentage within the container
        let scrollPercent = -top / scrollableHeight;
        scrollPercent = Math.max(0, Math.min(1, scrollPercent)); // Clamp between 0 and 1

        if (video.duration) {
          video.currentTime = scrollPercent * video.duration;
        }
      };

      window.addEventListener('scroll', handleScroll);
      // Set initial frame
      handleScroll(); 

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    // If metadata is already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative h-[300vh] w-full', className)}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
