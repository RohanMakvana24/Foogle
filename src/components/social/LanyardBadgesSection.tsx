'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MultiBadgeItem } from '../ui/MultiLanyard';
import { LazyMount } from '../common/LazyMount';

// three.js based badges (~600KB) — loaded only when this section nears the viewport.
const MultiLanyard = React.lazy(() => import('../ui/MultiLanyard'));
import {
  createGoogleFrontCanvas,
  createGoogleBackCanvas,
  createInstagramFrontCanvas,
  createInstagramBackCanvas,
  createFacebookFrontCanvas,
  createFacebookBackCanvas,
  createStrapCanvas,
} from './lanyardCardTextures';
import { ExternalLink, Star, Instagram, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';

export const LanyardBadgesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Synchronous canvas textures generated instantly without async delay or blank state
  const badgeItems: MultiBadgeItem[] = useMemo(() => {
    try {
      const gFront = createGoogleFrontCanvas();
      const gBack = createGoogleBackCanvas();
      const gStrap = createStrapCanvas('google');

      const iFront = createInstagramFrontCanvas();
      const iBack = createInstagramBackCanvas();
      const iStrap = createStrapCanvas('instagram');

      const fFront = createFacebookFrontCanvas();
      const fBack = createFacebookBackCanvas();
      const fStrap = createStrapCanvas('facebook');

      return [
        {
          id: 'google',
          frontCanvas: gFront,
          backCanvas: gBack,
          strapCanvas: gStrap,
          cardColor: '#0f1e2e',
          metal: 'gold',
          anchor: 0.22,
        },
        {
          id: 'instagram',
          frontCanvas: iFront,
          backCanvas: iBack,
          strapCanvas: iStrap,
          cardColor: '#2d0a24',
          metal: 'gold',
          anchor: 0.50,
        },
        {
          id: 'facebook',
          frontCanvas: fFront,
          backCanvas: fBack,
          strapCanvas: fStrap,
          cardColor: '#091a36',
          metal: 'silver',
          anchor: 0.78,
        },
      ];
    } catch (e) {
      console.error('Error generating badge canvas textures:', e);
      return [];
    }
  }, []);

  // Update active card tab as user scrolls horizontally on mobile
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth <= 0) return;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex >= 0 && newIndex <= 2 && newIndex !== activeCardIndex) {
      setActiveCardIndex(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const clientWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveCardIndex(index);
  };

  return (
    <div className="w-full relative mt-8 sm:mt-12 pt-2 sm:pt-4 overflow-visible">
      {/* Mobile Interactive Tab Switcher (Visible on mobile only) */}
      <div className="flex sm:hidden items-center justify-between gap-2 px-4 mb-4 mt-2">
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 w-full justify-between">
          <button
            type="button"
            onClick={() => scrollToCard(0)}
            className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeCardIndex === 0
                ? 'bg-amber-500 text-black shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToCard(1)}
            className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeCardIndex === 1
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Instagram className="w-3 h-3" />
            <span>Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToCard(2)}
            className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeCardIndex === 2
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <ThumbsUp className="w-3 h-3" />
            <span>Facebook</span>
          </button>
        </div>
      </div>

      {/* 
        Scrollable Container: 
        - On Mobile: 300vw track with CSS snap, so each card sits with full breathing space (no overlap)
        - On Desktop: Standard full-width stage with all 3 badges hanging side by side
      */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="w-[300vw] sm:w-full flex flex-col">
          {/* Unified 3D Stage */}
          <div className="relative w-full h-[540px] sm:h-[620px] overflow-visible">
            {badgeItems.length === 3 ? (
              <LazyMount
                className="w-full h-full"
                minHeight="540px"
                rootMargin="400px 0px"
                placeholder={<div className="w-full h-full" aria-hidden="true" />}
              >
                <MultiLanyard items={badgeItems} className="w-full h-full" breeze={0.35} interactive={true} />
              </LazyMount>
            ) : null}
          </div>

          {/* Action Buttons below: Each button aligned centered beneath its card with clean breathing room */}
          <div className="flex sm:grid sm:grid-cols-3 w-full mt-4 sm:mt-5 relative z-20">
            {/* Google CTA (Slide 1 on mobile, Col 1 on desktop) */}
            <div className="w-[100vw] sm:w-full snap-center shrink-0 flex flex-col items-center gap-1.5 text-center px-4">
              <a
                href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[270px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-amber-500 hover:bg-amber-400 text-black cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-black text-black" />
                <span>Write a Google Review</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <span className="text-[11px] text-zinc-400 font-medium">
                4.9 ★ · 1,200+ Verified Diners
              </span>
            </div>

            {/* Instagram CTA (Slide 2 on mobile, Col 2 on desktop) */}
            <div className="w-[100vw] sm:w-full snap-center shrink-0 flex flex-col items-center gap-1.5 text-center px-4">
              <a
                href="https://www.instagram.com/foogle_foods/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[270px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:opacity-95 text-white cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
                <span>Follow foogle_foods</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <span className="text-[11px] text-zinc-400 font-medium">
                2,843 Followers · 886 Following
              </span>
            </div>

            {/* Facebook CTA (Slide 3 on mobile, Col 3 on desktop) */}
            <div className="w-[100vw] sm:w-full snap-center shrink-0 flex flex-col items-center gap-1.5 text-center px-4">
              <a
                href="https://www.facebook.com/FoogleFoods/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[270px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-white" />
                <span>Facebook @Foogle</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <span className="text-[11px] text-zinc-400 font-medium">
                1.1K Followers · Lives in Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interaction Hint & Mobile Navigation Controls */}
      <div className="mt-6 flex flex-col items-center gap-2.5">
        {/* Mobile Next / Prev Arrow Buttons */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            type="button"
            aria-label="Previous card"
            disabled={activeCardIndex === 0}
            onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to card ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeCardIndex === idx
                    ? 'w-6 bg-amber-500'
                    : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next card"
            disabled={activeCardIndex === 2}
            onClick={() => scrollToCard(Math.min(2, activeCardIndex + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Interaction hint */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-black/70 dark:bg-white/10 text-white border border-white/15 shadow-sm">
          <span>👈 Swipe cards on mobile 👉</span>
          <span className="text-zinc-500">•</span>
          <span className="text-amber-400 font-bold">↻ Tap card to flip &amp; reveal QR</span>
        </div>
      </div>
    </div>
  );
};

export default LanyardBadgesSection;
