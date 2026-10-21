'use client';

import React, { useMemo } from 'react';
import MultiLanyard, { MultiBadgeItem } from '../ui/MultiLanyard';
import {
  createGoogleFrontCanvas,
  createGoogleBackCanvas,
  createInstagramFrontCanvas,
  createInstagramBackCanvas,
  createFacebookFrontCanvas,
  createFacebookBackCanvas,
  createStrapCanvas,
} from './lanyardCardTextures';
import { ExternalLink, Star, Instagram, ThumbsUp } from 'lucide-react';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';

export const LanyardBadgesSection: React.FC = () => {
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

  return (
    <div className="w-full relative mt-0 overflow-visible">
      {/* Unified 3D Stage: All 3 badges in ONE continuous canvas (No box boundaries, No clipping, Instant render) */}
      <div className="relative w-full h-[580px] sm:h-[620px] overflow-visible">
        {badgeItems.length === 3 ? (
          <MultiLanyard items={badgeItems} className="w-full h-full" breeze={0.35} interactive={true} />
        ) : null}
      </div>

      {/* 3 Action Buttons below the 3D Stage (aligned beneath each hanging badge) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 w-full -mt-6 sm:-mt-8 px-4 relative z-20">
        {/* Google CTA */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <a
            href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[260px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-amber-500 hover:bg-amber-400 text-black cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            <span>Write a Google Review</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
          <span className="text-[11px] text-zinc-400 font-medium">
            4.9 ★ · 1,200+ Verified Diners
          </span>
        </div>

        {/* Instagram CTA */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <a
            href="https://instagram.com/fooglecafe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[260px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:opacity-95 text-white cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-white" />
            <span>Follow @fooglecafe</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
          <span className="text-[11px] text-zinc-400 font-medium">
            18.5K Followers · Courtyard Stories
          </span>
        </div>

        {/* Facebook CTA */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <a
            href="https://facebook.com/fooglecafe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[260px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 shadow-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-white" />
            <span>Facebook Community</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
          <span className="text-[11px] text-zinc-400 font-medium">
            99% Recommended · 14K Likes
          </span>
        </div>
      </div>

      {/* Floating Interaction Hint */}
      <div className="mt-6 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-black/60 dark:bg-white/10 backdrop-blur-md text-white border border-white/15 shadow-sm">
          <span>🖐️ Drag to swing</span>
          <span className="text-zinc-500">•</span>
          <span className="text-amber-400 font-bold">↻ Click any card to flip &amp; reveal QR code</span>
        </div>
      </div>
    </div>
  );
};

export default LanyardBadgesSection;
