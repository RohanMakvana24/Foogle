'use client';

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Container } from '../common/Container';
import { HangingBadges3D, BADGE_CONFIGS } from './HangingBadges3D';
import {
  Star,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  MousePointer,
  ArrowUpRight,
  Heart,
  Quote,
  Coffee,
} from 'lucide-react';

interface ChannelStory {
  id: string;
  name: string;
  handle: string;
  badgeTag: string;
  ratingOrStat: string;
  statLabel: string;
  quote: string;
  author: string;
  ctaText: string;
  ctaHref: string;
  accentColor: string;
  pinRotation: string;
  icon: React.ElementType;
}

const STORIES: Record<string, ChannelStory> = {
  google: {
    id: 'google',
    name: 'Google Reviews',
    handle: 'Foogle Cafe & Restaurant',
    badgeTag: 'Verified Diner Review',
    ratingOrStat: '4.9 ★★★★★',
    statLabel: '2,480+ Reviews on Google',
    quote:
      'Best woodfired pizza in Udaipur! The sourdough crust has the perfect airy crumb and authentic leopard spotting. The courtyard garden atmosphere is absolutely magical.',
    author: 'Aarav S. · Local Guide',
    ctaText: 'Read All 2.4K Reviews',
    ctaHref: 'https://google.com',
    accentColor: '#4285F4',
    pinRotation: '-1deg',
    icon: Star,
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram Stories',
    handle: '@fooglecafe',
    badgeTag: 'Courtyard Reels & Snaps',
    ratingOrStat: '18.5K Followers',
    statLabel: 'Daily Pizza & Latte Stories',
    quote:
      'Golden hour in the sun-drenched courtyard with sourdough margherita and iced espresso tonic. Udaipur’s coziest artisan cafe aesthetic.',
    author: '@priya_wanderlust · Instagram Reel',
    ctaText: 'Follow on Instagram',
    ctaHref: 'https://instagram.com',
    accentColor: '#E1306C',
    pinRotation: '1.5deg',
    icon: Instagram,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Community',
    handle: 'Foogle Cafe Udaipur',
    badgeTag: 'Community Recommendation',
    ratingOrStat: '99% Recommended',
    statLabel: '14,000+ Guests & Likes',
    quote:
      'Hosted our family anniversary dinner in the courtyard garden. Warm hospitality, live acoustic weekend vibe, and phenomenal artisanal pastas.',
    author: 'Vikram & Meera R. · Udaipur Diners',
    ctaText: 'View Facebook Page',
    ctaHref: 'https://facebook.com',
    accentColor: '#1877F2',
    pinRotation: '-1.5deg',
    icon: Facebook,
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    handle: '@foogle_udaipur',
    badgeTag: 'Live Oven Broadcasts',
    ratingOrStat: '340+ Live Updates',
    statLabel: 'Direct from the Pass',
    quote:
      '450°C stone oven fired up early today. 48-hr slow fermented sourdough batches ready for lunch service. Come grab a fresh slice before it sells out.',
    author: 'Chef Pass · Foogle Kitchen',
    ctaText: 'Follow Kitchen Updates',
    ctaHref: 'https://twitter.com',
    accentColor: '#0ea5e9',
    pinRotation: '1deg',
    icon: Twitter,
  },
};

export const SocialProofSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeBadge, setActiveBadge] = useState<string>('google');
  const isDark = theme === 'dark';

  return (
    <section
      id="community"
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0c100f' : '#FAF7F2',
        color: isDark ? '#EAF0EC' : '#183B2B',
      }}
    >
      {/* ── Warm Artisan Cafe Wall Atmosphere (Soft amber/candlelight glow) ── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[160px] opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #f59e0b 0%, #10b981 40%, transparent 75%)'
            : 'radial-gradient(circle, #fde68a 0%, #a7f3d0 40%, transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[600px] h-[400px] rounded-full blur-[140px] opacity-15"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
            : 'radial-gradient(circle, #fed7aa 0%, transparent 70%)',
        }}
      />

      {/* ════════════════════════════════════════
          WARM CAFE EDITORIAL HEADER
          ════════════════════════════════════════ */}
      <Container>
        <div className="pt-20 pb-8 lg:pt-28 lg:pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Warm Gallery Title */}
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif italic tracking-wide mb-4 border shadow-sm backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(245,158,11,0.08)' : 'rgba(217,119,6,0.08)',
                borderColor: isDark ? 'rgba(245,158,11,0.25)' : 'rgba(217,119,6,0.22)',
                color: isDark ? '#fbbf24' : '#b45309',
              }}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
              <span>Foogle Courtyard Gallery · Pinned Memories</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.08]">
              <span style={{ color: isDark ? '#FFFFFF' : '#14281E' }}>
                Pinned on Our Wall,
              </span>
              <br />
              <span
                className="italic font-normal"
                style={{
                  color: isDark ? '#fbbf24' : '#b45309',
                }}
              >
                Loved Across Udaipur.
              </span>
            </h2>

            <p
              className="mt-4 text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ color: isDark ? 'rgba(226,232,240,0.72)' : 'rgba(40,60,50,0.78)' }}
            >
              Like polaroid snaps and letters clipped to a courtyard cafe clothesline,
              these are real words from diners, travelers, and food lovers. Grab, swing,
              or pull any card to explore.
            </p>
          </div>

          {/* Right: Quick Highlights (Aesthetic Cafe Tags) */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 items-start lg:items-end">
            {[
              { id: 'google', label: '4.9★ Google Reviews', stat: '2,480+ Diners', color: '#4285F4' },
              { id: 'instagram', label: '18.5K on Instagram', stat: '@fooglecafe', color: '#E1306C' },
              { id: 'facebook', label: '99% Recommendation', stat: '14K Community', color: '#1877F2' },
              { id: 'twitter', label: 'Live Oven Updates', stat: 'Chef Pass', color: '#0ea5e9' },
            ].map((s) => {
              const isSelected = activeBadge === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveBadge(s.id)}
                  className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer border shadow-sm"
                  style={{
                    borderColor: isSelected
                      ? isDark ? '#fbbf24' : '#b45309'
                      : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    backgroundColor: isSelected
                      ? isDark ? 'rgba(245,158,11,0.14)' : 'rgba(217,119,6,0.1)'
                      : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.75)',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: s.color,
                      boxShadow: isSelected ? `0 0 8px ${s.color}` : 'none',
                    }}
                  />
                  <span className="font-semibold">{s.label}</span>
                  <span
                    className="text-[10px] opacity-60 ml-0.5 px-1.5 py-0.5 rounded font-mono"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}
                  >
                    {s.stat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      {/* ═════════════════════════════════════════════════════════════════
          FULL-PAGE CLOTHESLINE WIRE & 3D HANGING CARDS
          Spans across the entire page (100% full width, edge-to-edge)
          ═════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full">
        {/* 1. Warm Gallery Ambient Spotlight Flare across top */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-16 w-full blur-2xl opacity-30"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 0%, #fbbf24 0%, transparent 75%)'
              : 'radial-gradient(ellipse at 50% 0%, #fde68a 0%, transparent 75%)',
          }}
        />

        {/* 2. Top Edge-to-Edge Rustic Hanging Cable (Line Spanning Across Whole Screen) */}
        <div className="relative w-full flex items-center">
          {/* Vintage Brass Eye-Bolt Wall Mount (Left Extreme) */}
          <div
            className="w-4 h-4 rounded-full border-2 shrink-0 ml-1 shadow-md z-10"
            style={{
              borderColor: '#b48a4c',
              backgroundColor: isDark ? '#271f17' : '#ebd3a3',
            }}
            title="West Wall Mount"
          />

          {/* Continuous Clothesline Cable running across the entire width */}
          <div
            className="flex-1 h-[3px] shadow-sm"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, #604e38 0%, #b48a4c 25%, #d4af37 50%, #b48a4c 75%, #604e38 100%)'
                : 'linear-gradient(90deg, #786348 0%, #b48a4c 25%, #8c6d3d 50%, #b48a4c 75%, #786348 100%)',
              boxShadow: isDark
                ? '0 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(245,158,11,0.25)'
                : '0 2px 4px rgba(0,0,0,0.15)',
            }}
          />

          {/* Vintage Brass Eye-Bolt Wall Mount (Right Extreme) */}
          <div
            className="w-4 h-4 rounded-full border-2 shrink-0 mr-1 shadow-md z-10"
            style={{
              borderColor: '#b48a4c',
              backgroundColor: isDark ? '#271f17' : '#ebd3a3',
            }}
            title="East Wall Mount"
          />
        </div>

        {/* 3. Aesthetic Gallery Banner under the wire */}
        <div
          className="w-full flex items-center justify-between px-6 sm:px-12 py-2 select-none pointer-events-none text-[11px] font-mono tracking-wider opacity-70"
          style={{
            color: isDark ? '#d4af37' : '#8c6d3d',
          }}
        >
          <span className="hidden sm:inline">✦ EST. 2024 · UDAIPUR, RAJASTHAN</span>
          <span className="mx-auto font-serif italic text-xs tracking-normal">
            ✦ Wooden Peg Clothesline · Hand-Pinned Guest Reviews &amp; Stories ✦
          </span>
          <span className="hidden sm:inline">PANCHWATI COURTYARD ✦</span>
        </div>

        {/* 4. 3D Canvas: Cards hanging from wooden pegs on the continuous wire */}
        <div className="relative w-full">
          <HangingBadges3D
            activeId={activeBadge}
            onSelect={(id) => setActiveBadge(id)}
            isDark={isDark}
          />
        </div>

        {/* 5. Minimal Interactive Instruction Pill */}
        <div className="relative -mt-10 sm:-mt-8 pb-8 flex items-center justify-center z-10 pointer-events-none select-none px-4">
          <div
            className="inline-flex items-center gap-3 sm:gap-5 px-5 py-2 rounded-full border shadow-lg backdrop-blur-xl"
            style={{
              backgroundColor: isDark ? 'rgba(18,22,20,0.85)' : 'rgba(255,255,255,0.92)',
              borderColor: isDark ? 'rgba(245,158,11,0.25)' : 'rgba(217,119,6,0.2)',
              color: isDark ? '#f3f4f6' : '#1f2937',
            }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-serif italic">
              <MousePointer className="w-3.5 h-3.5 text-amber-500" />
              <span>Grab &amp; swing cards naturally</span>
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
            />
            <span className="inline-flex items-center gap-2 text-xs font-serif italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Click any card to read its full story</span>
            </span>
          </div>
        </div>

        {/* 6. Subtle bottom shelf divider */}
        <div
          className="w-full h-px"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.15) 30%, rgba(245,158,11,0.25) 50%, rgba(245,158,11,0.15) 70%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.15) 30%, rgba(217,119,6,0.2) 50%, rgba(217,119,6,0.15) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          HANGING POLAROID / ART GALLERY CARDS (NEW LOOK)
          ═════════════════════════════════════════════════════════════════ */}
      <Container>
        <div className="py-14 pb-24 lg:pb-32">
          {/* Section Subtitle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <p
                className="text-xs font-mono tracking-widest uppercase font-semibold"
                style={{ color: isDark ? '#fbbf24' : '#b45309' }}
              >
                // GUEST MOMENTS &amp; REVIEWS GALLERY
              </p>
              <h3
                className="text-2xl sm:text-3xl font-serif tracking-tight mt-1"
                style={{ color: isDark ? '#FFFFFF' : '#14281E' }}
              >
                Pinned Guest Highlights
              </h3>
            </div>
            <p
              className="text-xs font-serif italic max-w-xs"
              style={{ color: isDark ? 'rgba(203,213,225,0.7)' : 'rgba(71,85,105,0.8)' }}
            >
              Click any photo plaque below to swing the matching badge on the wire.
            </p>
          </div>

          {/* Polaroid Style Gallery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BADGE_CONFIGS.map((cfg) => {
              const story = STORIES[cfg.id];
              const isSelected = activeBadge === cfg.id;
              const IconComponent = story.icon;

              return (
                <div
                  key={cfg.id}
                  onClick={() => setActiveBadge(cfg.id)}
                  className="group relative rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  style={{
                    backgroundColor: isDark
                      ? isSelected
                        ? '#141a18'
                        : '#0f1412'
                      : isSelected
                        ? '#FFFFFF'
                        : '#FFFDF9',
                    border: isSelected
                      ? `2px solid ${isDark ? '#fbbf24' : '#b45309'}`
                      : isDark
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: isSelected
                      ? isDark
                        ? '0 16px 40px rgba(0,0,0,0.6), 0 0 24px rgba(245,158,11,0.2)'
                        : '0 16px 36px rgba(180,83,9,0.12), 0 4px 12px rgba(0,0,0,0.05)'
                      : isDark
                        ? '0 4px 20px rgba(0,0,0,0.3)'
                        : '0 4px 16px rgba(0,0,0,0.04)',
                    transform: isSelected
                      ? 'translateY(-6px) rotate(0deg)'
                      : `translateY(0) rotate(${story.pinRotation})`,
                  }}
                >
                  {/* Realistic Wooden Peg Clip Graphic at Top Center of Card */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                    {/* Metal spring ring */}
                    <div
                      className="w-5 h-2 rounded-sm border shadow-sm"
                      style={{
                        backgroundColor: isSelected ? '#f59e0b' : '#b48a4c',
                        borderColor: '#785b30',
                      }}
                    />
                    {/* Wooden peg body */}
                    <div
                      className="w-3.5 h-6 rounded-b-sm shadow-md"
                      style={{
                        background: 'linear-gradient(180deg, #c89658 0%, #a7733a 100%)',
                      }}
                    />
                  </div>

                  {/* Card Interior */}
                  <div className="p-6 pt-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Row: Channel Icon + Rating/Follower Pill */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                          style={{
                            backgroundColor: `${story.accentColor}15`,
                            color: story.accentColor,
                            border: `1px solid ${story.accentColor}30`,
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Tag Pill */}
                        <span
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            color: isDark ? '#e2e8f0' : '#475569',
                          }}
                        >
                          {story.badgeTag}
                        </span>
                      </div>

                      {/* Large Metric / Rating */}
                      <div className="mb-2">
                        <span
                          className="text-xl font-bold font-serif tracking-tight block"
                          style={{ color: isDark ? '#FFFFFF' : '#14281E' }}
                        >
                          {story.ratingOrStat}
                        </span>
                        <span
                          className="text-[11px] font-mono opacity-60 block mt-0.5"
                          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                        >
                          {story.statLabel}
                        </span>
                      </div>

                      {/* Platform Handle */}
                      <p
                        className="text-xs font-mono font-medium mb-4"
                        style={{ color: story.accentColor }}
                      >
                        {story.handle}
                      </p>

                      {/* Authentic Quote snippet */}
                      <div className="relative pl-3 border-l-2 mb-6" style={{ borderColor: `${story.accentColor}50` }}>
                        <p
                          className="text-xs leading-relaxed font-serif italic"
                          style={{
                            color: isDark ? 'rgba(226,232,240,0.82)' : 'rgba(30,41,59,0.85)',
                          }}
                        >
                          &ldquo;{story.quote}&rdquo;
                        </p>
                        <p
                          className="text-[10px] font-mono mt-2"
                          style={{ color: isDark ? 'rgba(148,163,184,0.6)' : 'rgba(100,116,139,0.7)' }}
                        >
                          — {story.author}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div
                      className="pt-3 border-t"
                      style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                    >
                      <a
                        href={story.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium font-serif transition-all duration-200 group/btn border"
                        style={{
                          backgroundColor: isSelected
                            ? isDark ? 'rgba(245,158,11,0.12)' : 'rgba(217,119,6,0.08)'
                            : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          borderColor: isSelected
                            ? isDark ? 'rgba(245,158,11,0.4)' : 'rgba(217,119,6,0.3)'
                            : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                          color: isSelected
                            ? isDark ? '#fbbf24' : '#b45309'
                            : isDark ? '#e2e8f0' : '#1e293b',
                        }}
                      >
                        <span>{story.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SocialProofSection;
