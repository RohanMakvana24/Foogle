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
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Flame,
  BadgeCheck,
} from 'lucide-react';

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

interface ChannelStory {
  id: string;
  name: string;
  handle: string;
  badgeTag: string;
  ratingOrStat: string;
  statLabel: string;
  quote: string;
  author: string;
  avatar: string;
  role: string;
  timeAgo: string;
  helpfulCount: string;
  tag: string;
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
    author: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'Local Guide Level 7 · 142 reviews',
    timeAgo: '2 days ago',
    helpfulCount: '48 found helpful',
    tag: 'Woodfired Pizza · Cold Brew · Tiramisu',
    ctaText: 'Read All 2.4K Google Reviews',
    ctaHref: 'https://maps.google.com',
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
    author: 'Priya Mehra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    role: '@priya_wanderlust · Food & Travel Creator',
    timeAgo: 'Yesterday',
    helpfulCount: '2.4K likes · 240 shares',
    tag: 'Aesthetic Courtyard · Golden Hour',
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
    author: 'Vikram & Meera Rajput',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'Udaipur Diners · Verified Recommendation',
    timeAgo: '4 days ago',
    helpfulCount: '98% recommend to friends',
    tag: 'Family Dining · Acoustic Weekends',
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
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80',
    role: 'Head Pizzaiolo · Live from the Oven',
    timeAgo: '3 hours ago',
    helpfulCount: '120 reposts · 840 likes',
    tag: '48-hr Slow Sourdough · 450°C Oven',
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

        {/* 4. Desktop/Tablet: 3D Physics Canvas with Clothespins & Hanging Badges */}
        <div className="relative w-full hidden sm:block">
          <HangingBadges3D
            activeId={activeBadge}
            onSelect={(id) => setActiveBadge(id)}
            isDark={isDark}
          />
        </div>

        {/* Mobile View: High-performance Hanging Badges Cards (Instant touch swipe, zero GPU throttling) */}
        <div className="block sm:hidden w-full py-6 px-4">
          <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none">
            {BADGE_CONFIGS.map((cfg) => {
              const story = STORIES[cfg.id];
              const isSelected = activeBadge === cfg.id;
              const IconComponent = story.icon;
              return (
                <div
                  key={cfg.id}
                  onClick={() => setActiveBadge(cfg.id)}
                  className="snap-center shrink-0 w-[240px] flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                >
                  {/* Wooden Clothespin & Lanyard */}
                  <div className="flex flex-col items-center pointer-events-none">
                    <div className="w-3.5 h-5 rounded-b bg-gradient-to-b from-[#c89658] to-[#a7733a] shadow-xs border border-[#785b30]" />
                    <div className="w-1 h-6 bg-zinc-400 dark:bg-zinc-600 shadow-xs" />
                  </div>
                  {/* Badge Card */}
                  <div
                    className="w-full rounded-2xl overflow-hidden border p-4 shadow-sm transition-all"
                    style={{
                      backgroundColor: isDark
                        ? (isSelected ? '#151e19' : '#0e1411')
                        : (isSelected ? '#FFFFFF' : '#FAF8F5'),
                      borderColor: isSelected
                        ? (isDark ? '#fbbf24' : '#b45309')
                        : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {cfg.id === 'google' ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white dark:bg-white/10 shadow-2xs border border-black/5 dark:border-white/10 p-1.5">
                          <GoogleIcon className="w-5 h-5" />
                        </div>
                      ) : (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs"
                          style={{
                            backgroundColor: `${story.accentColor}20`,
                            color: story.accentColor,
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold truncate" style={{ color: isDark ? '#FFFFFF' : '#14281E' }}>
                            {story.name}
                          </p>
                          <BadgeCheck className="w-3 h-3 text-blue-500 shrink-0" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-amber-500">
                          <span>★★★★★</span>
                          <span className="font-mono text-zinc-500 dark:text-zinc-400">· {story.ratingOrStat}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs italic line-clamp-3 leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                      "{story.quote}"
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified Diner</span>
                      <span style={{ color: story.accentColor }}>{story.ctaText.replace('Read All ', '')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Minimal Interactive Instruction Pill (Desktop & Tablet) */}
        <div className="relative -mt-10 sm:-mt-8 pb-8 hidden sm:flex items-center justify-center z-10 pointer-events-none select-none px-4">
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
          3D INTERACTIVE GOOGLE & SOCIAL VERIFIED REVIEW PLAQUES
          ═════════════════════════════════════════════════════════════════ */}
      <Container>
        <div className="py-14 pb-24 lg:pb-32">
          {/* Section Subtitle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div className="max-w-xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border shadow-2xs"
                style={{
                  backgroundColor: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(217,119,6,0.08)',
                  borderColor: isDark ? 'rgba(245,158,11,0.3)' : 'rgba(217,119,6,0.25)',
                  color: isDark ? '#fbbf24' : '#b45309',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Interactive Review Plaques</span>
              </div>
              <h3
                className="text-3xl sm:text-4xl font-serif tracking-tight leading-tight"
                style={{ color: isDark ? '#FFFFFF' : '#14281E' }}
              >
                Real Words From Real Diners
              </h3>
              <p
                className="mt-2 text-xs sm:text-sm font-serif leading-relaxed"
                style={{ color: isDark ? 'rgba(203,213,225,0.72)' : 'rgba(71,85,105,0.85)' }}
              >
                Tilt your cursor or tap to experience stereoscopic 3D depth, verified Google Review badges, and live courtyard stories.
              </p>
            </div>

            {/* Quick 3D status chip */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border shadow-2xs self-start sm:self-auto shrink-0"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                color: isDark ? '#cbd5e1' : '#475569',
              }}
            >
              <MousePointer className="w-3.5 h-3.5 text-amber-500" />
              <span>Hover cards for 3D tilt</span>
            </div>
          </div>

          {/* 3D Review Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1200px]">
            {BADGE_CONFIGS.map((cfg) => {
              const story = STORIES[cfg.id];
              const isSelected = activeBadge === cfg.id;

              return (
                <ThreeDReviewCard
                  key={cfg.id}
                  story={story}
                  isSelected={isSelected}
                  onClick={() => setActiveBadge(cfg.id)}
                  isDark={isDark}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

interface ThreeDReviewCardProps {
  story: ChannelStory;
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
}

function ThreeDReviewCard({
  story,
  isSelected,
  onClick,
  isDark,
}: ThreeDReviewCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: isDark ? 0.18 : 0.26,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const IconComponent = story.icon;
  const isGoogle = story.id === 'google';

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(14px) scale3d(1.02, 1.02, 1.02)`
    : isSelected
      ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)'
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border cursor-pointer select-none transition-all duration-300 [transform-style:preserve-3d] will-change-transform"
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
          : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.3s ease',
        backgroundColor: isDark
          ? isSelected
            ? '#141d18'
            : '#0e1411'
          : isSelected
            ? '#FFFFFF'
            : '#FAF8F5',
        borderColor: isSelected
          ? story.accentColor
          : isDark
            ? 'rgba(255,255,255,0.09)'
            : 'rgba(0,0,0,0.08)',
        boxShadow: isSelected
          ? isDark
            ? `0 24px 50px -12px rgba(0,0,0,0.85), 0 0 35px ${story.accentColor}30, 0 0 0 1px ${story.accentColor}`
            : `0 24px 50px -12px ${story.accentColor}35, 0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px ${story.accentColor}`
          : isDark
            ? '0 10px 30px -10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)'
            : '0 10px 30px -10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* 3D Specular Light Glare Reflection */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
        }}
      />

      {/* 3D Depth Layer 1: Header Badge & Identity */}
      <div className="[transform:translateZ(26px)] mb-5">
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            {isGoogle ? (
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center p-2 bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10 shrink-0">
                <GoogleIcon className="w-6 h-6" />
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                style={{
                  backgroundColor: `${story.accentColor}18`,
                  color: story.accentColor,
                  border: `1px solid ${story.accentColor}35`,
                }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs font-bold tracking-tight truncate"
                  style={{ color: isDark ? '#FFFFFF' : '#14281E' }}
                >
                  {story.name}
                </span>
                <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              </div>
              <span className="text-[10px] font-mono opacity-60 block truncate">
                {story.handle}
              </span>
            </div>
          </div>

          <span
            className="text-[10px] font-mono px-2.5 py-1 rounded-full border shrink-0 font-medium"
            style={{
              borderColor: isSelected ? `${story.accentColor}60` : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              backgroundColor: isSelected ? `${story.accentColor}14` : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              color: isSelected ? story.accentColor : isDark ? '#e2e8f0' : '#475569',
            }}
          >
            {story.badgeTag}
          </span>
        </div>

        {/* Rating Stars / Metrics with Golden Stars */}
        <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-xs" />
              ))}
            </div>
            <span
              className="text-xs font-extrabold tracking-tight"
              style={{ color: isDark ? '#fbbf24' : '#b45309' }}
            >
              5.0
            </span>
          </div>
          <span className="text-[10px] font-mono opacity-60">
            {story.statLabel}
          </span>
        </div>
      </div>

      {/* 3D Depth Layer 2: Reviewer Profile & Authentic Quote */}
      <div className="[transform:translateZ(18px)] flex-1 flex flex-col justify-between mb-5">
        {/* Reviewer Header */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={story.avatar}
            alt={story.author}
            className="w-9 h-9 rounded-full object-cover border-2 shrink-0 shadow-xs"
            style={{ borderColor: `${story.accentColor}40` }}
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span
                className="text-xs font-bold truncate"
                style={{ color: isDark ? '#FFFFFF' : '#14281E' }}
              >
                {story.author}
              </span>
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            </div>
            <p className="text-[10px] font-mono opacity-60 truncate">
              {story.role} · {story.timeAgo}
            </p>
          </div>
        </div>

        {/* Quote Block with decorative mark */}
        <div
          className="relative p-3.5 rounded-2xl border text-xs leading-relaxed italic"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            color: isDark ? 'rgba(226,232,240,0.88)' : 'rgba(30,41,59,0.9)',
          }}
        >
          <Quote
            className="w-4 h-4 mb-1.5 opacity-40 shrink-0"
            style={{ color: story.accentColor }}
          />
          <p className="font-serif">"{story.quote}"</p>
        </div>

        {/* Highlighted Dish Tag */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono">
          <span className="opacity-50">✦</span>
          <span
            className="px-2 py-0.5 rounded-md font-medium text-[10px]"
            style={{
              backgroundColor: `${story.accentColor}12`,
              color: story.accentColor,
            }}
          >
            {story.tag}
          </span>
        </div>
      </div>

      {/* 3D Depth Layer 3: Interaction Strip & Direct CTA */}
      <div className="[transform:translateZ(24px)] pt-3.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono opacity-60 flex items-center gap-1">
          <ThumbsUp className="w-3 h-3 text-amber-500" />
          <span>{story.helpfulCount}</span>
        </span>

        <a
          href={story.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-serif transition-all duration-200 group/btn border shadow-2xs hover:scale-105 active:scale-95"
          style={{
            backgroundColor: isSelected
              ? isDark ? 'rgba(245,158,11,0.14)' : 'rgba(217,119,6,0.1)'
              : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            borderColor: isSelected
              ? story.accentColor
              : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
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
  );
}

export default SocialProofSection;
