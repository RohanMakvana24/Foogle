import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

const SENSITIVITY = 0.8;

export const HeroCharacterShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const hasQueuedSeekRef = useRef<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const seekToTarget = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    if (isSeekingRef.current) {
      hasQueuedSeekRef.current = true;
      return;
    }

    isSeekingRef.current = true;
    try {
      video.currentTime = targetTimeRef.current;
    } catch {
      isSeekingRef.current = false;
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (hasQueuedSeekRef.current) {
      hasQueuedSeekRef.current = false;
      seekToTarget();
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = video.duration * 0.15 || 0;
      video.currentTime = targetTimeRef.current;
      setIsLoaded(true);
    }
  };

  // Horizontal mouse scrubbing on window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + timeOffset)
      );

      seekToTarget();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch support for mobile touch drag scrubbing
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + timeOffset)
      );

      seekToTarget();
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Full Size Borderless Video without any box container */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />
    </div>
  );
};

export default HeroCharacterShowcase;
