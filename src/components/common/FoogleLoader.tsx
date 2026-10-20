import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { FoodDoodleLogo } from './FoodDoodleLogo';

interface FoogleLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const TAGLINES = [
  'Contemporary Cafe & Artisan Dining',
  'Crafting Flavourful Moments in Udaipur',
  'Curated Coffee, Bites & Relaxed Vibe',
  'Welcome to Foogle',
];

export const FoogleLoader: React.FC<FoogleLoaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Animate progress smoothly from 0 to 100
  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 600); // Wait for fade-out animation
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  // Rotate tagline text during loading
  useEffect(() => {
    const tagInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 600);

    return () => clearInterval(tagInterval);
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible) return null;


  return (
    <div
      role="dialog"
      aria-label="Loading Foogle"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#0c0f14',
        backgroundImage: `
          radial-gradient(circle at 50% 40%, rgba(217, 119, 6, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(180, 83, 9, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #090c10 0%, #121721 100%)
        `,
      }}
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Center content container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Floating icon badge */}
        <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-md shadow-[0_0_25px_rgba(217,119,6,0.25)] animate-pulse">
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>

        {/* Animated Food Doodle Brand Logo */}
        <div className="my-3 p-3 rounded-2xl bg-black/30 border border-amber-500/20 backdrop-blur-md shadow-[0_0_35px_rgba(217,119,6,0.2)]">
          <FoodDoodleLogo size="xl" animated={true} />
        </div>

        {/* Dynamic cycling tagline */}
        <div className="h-8 mt-3 flex items-center justify-center">
          <p
            key={taglineIndex}
            className="text-xs sm:text-sm font-medium tracking-wider text-amber-200/80 uppercase animate-fadeIn transition-all duration-300"
          >
            {TAGLINES[taglineIndex]}
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-48 sm:w-64 mt-8 flex flex-col items-center gap-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-0 backdrop-blur-sm border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>UDAIPUR</span>
            <span className="text-amber-400 font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Skip button for user convenience */}
        <button
          onClick={handleSkip}
          className="mt-8 text-xs text-zinc-400 hover:text-amber-300 tracking-wider uppercase transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          Skip Intro →
        </button>
      </div>

      <style>{`
        @keyframes foogleLetterDrop {
          0% {
            opacity: 0;
            transform: translateY(-24px) scale(0.85);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes foogleGlow {
          0% {
            filter: drop-shadow(0 0 10px rgba(217, 119, 6, 0.2));
          }
          100% {
            filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6));
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
