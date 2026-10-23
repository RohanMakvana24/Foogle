import React, { useState } from 'react';
import { TabletopBrandCard } from '../common/TabletopBrandCard';
import { buildAvifSrcSet, buildSrcSet } from '../../lib/imageSrcSet';

/**
 * HeroCulinaryShowcase Component
 * Provides a rich, appetizing culinary visual composition for the hero section.
 * Upgraded with:
 * - High-resolution commercial cafe dining spread photography
 * - Tabletop tent card displaying exact text "FOOGLE" naturally placed beside the food
 * - Resilient layered vector artwork fallback
 * - Secondary artisanal beverage showcase card with photography
 */
export const HeroCulinaryShowcase: React.FC = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [drinkImageLoaded, setDrinkImageLoaded] = useState(false);

  const heroImageUrl =
    '/images/photos/cafe-interior.webp';
  const drinkImageUrl =
    '/images/photos/cold-coffee.webp';

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Decorative ambient backdrop warmth */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, var(--color-accent-yellow), var(--color-brand-primary-light), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main Culinary Feature Frame (4:3 Aspect Ratio) */}
      <div
        className="relative rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 hover:shadow-2xl animate-hero-image-reveal bg-stone-900"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-bg-surface)',
        }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* 1. Real Commercial Cafe Food Photography */}
          {!heroImageError && (
            <picture>
              <source
                type="image/avif"
                srcSet={buildAvifSrcSet(heroImageUrl)}
                sizes="(max-width: 640px) 100vw, 560px"
              />
              <img
                src={heroImageUrl}
                srcSet={buildSrcSet(heroImageUrl)}
                sizes="(max-width: 640px) 100vw, 560px"
                alt="Artisanal cafe spread with woodfired pizza, fresh burrata, and gourmet pasta on rustic tabletop with Foogle brand card"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() => setHeroImageLoaded(true)}
                onError={() => setHeroImageError(true)}
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                  heroImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
                }`}
              />
            </picture>
          )}

          {/* 2. Resilient Vector Culinary Fallback / Loading Shimmer */}
          {(!heroImageLoaded || heroImageError) && (
            <svg
              viewBox="0 0 800 600"
              className="absolute inset-0 w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Artisanal cafe spread illustration"
            >
              <defs>
                <linearGradient id="tableSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A1E17" />
                  <stop offset="50%" stopColor="#1F150F" />
                  <stop offset="100%" stopColor="#140C08" />
                </linearGradient>
                <radialGradient id="goldenLight" cx="25%" cy="20%" r="75%">
                  <stop offset="0%" stopColor="#FFE8B2" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="crustGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="#E08B38" />
                  <stop offset="85%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#3E1A06" />
                </radialGradient>
                <radialGradient id="tomatoSauce" cx="45%" cy="45%" r="48%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="65%" stopColor="#B91C1C" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </radialGradient>
              </defs>

              <rect width="800" height="600" fill="url(#tableSurface)" />
              <rect width="800" height="600" fill="url(#goldenLight)" />

              {/* Pizza Board */}
              <g transform="translate(340, 360)">
                <circle cx="0" cy="0" r="230" fill="#58341D" />
                <circle cx="0" cy="0" r="200" fill="url(#crustGlow)" />
                <circle cx="0" cy="0" r="172" fill="url(#tomatoSauce)" />
                <circle cx="-55" cy="-65" r="42" fill="#FEF3C7" opacity="0.9" />
                <circle cx="60" cy="-55" r="38" fill="#FEF3C7" opacity="0.9" />
                <circle cx="0" cy="0" r="44" fill="#FEF3C7" opacity="0.9" />
                {/* Basil */}
                <path d="M -15,-20 C -45,-55 -25,-85 5,-70 C 15,-50 -5,-30 -15,-20 Z" fill="#16A34A" />
                <path d="M 20,-10 C 55,-40 75,-20 65,10 C 45,20 25,5 20,-10 Z" fill="#16A34A" />
              </g>

              {/* Pasta Bowl */}
              <g transform="translate(580, 170)">
                <circle cx="0" cy="0" r="115" fill="#FAF7EE" />
                <circle cx="0" cy="0" r="88" fill="#F3ECE0" />
                <circle cx="0" cy="0" r="70" fill="#FEF08A" opacity="0.85" />
                <circle cx="0" cy="0" r="6" fill="#16A34A" />
              </g>
            </svg>
          )}

          {/* Subdued Gradient Scrim for Contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.15) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Tabletop Brand Card "FOOGLE" standing naturally beside the spread */}
          <TabletopBrandCard
            placement="bottom-right"
            size="md"
            theme="cream"
          />

          {/* Discreet Image Legend at Bottom Left of Frame */}
          <div className="absolute bottom-3 left-4 flex flex-col text-white/95 text-xs drop-shadow-md">
            <span className="font-bold tracking-tight">
              Artisanal Woodfired &amp; Fresh Cafe Fare
            </span>
            <span className="text-[11px] text-white/80 font-medium">
              Panchwati, Udaipur · Foogle Kitchen
            </span>
          </div>
        </div>
      </div>

      {/* Floating Complementary Accent Card (Artisanal Coffee & Beverage) */}
      <div
        className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-52 sm:w-60 p-3 sm:p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 animate-subtle-float"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Square Mini Beverage Real Photo Preview */}
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-stone-800 border border-stone-200/20">
            <picture>
              <source
                type="image/avif"
                srcSet={buildAvifSrcSet(drinkImageUrl)}
                sizes="48px"
              />
              <img
                src={drinkImageUrl}
                srcSet={buildSrcSet(drinkImageUrl)}
                sizes="48px"
                alt="Artisanal iced latte with velvety foam"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onLoad={() => setDrinkImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  drinkImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </picture>
            {!drinkImageLoaded && (
              <div
                className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: 'var(--color-brand-surface-tint)',
                  color: 'var(--color-brand-primary)',
                }}
              >
                ☕
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span
              className="text-[10px] font-bold uppercase tracking-wider truncate"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Freshly Brewed
            </span>
            <span
              className="text-xs sm:text-sm font-bold truncate leading-tight mt-0.5"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Cold Foam Lattes &amp; Bites
            </span>
            <div className="flex items-center gap-1 mt-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-red)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-yellow)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-green)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Top-Right Badge: "Handcrafted Daily" */}
      <div
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 py-1.5 rounded-full border shadow-md backdrop-blur-md text-xs font-semibold select-none flex items-center gap-1.5"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: 'var(--color-accent-green)' }}
          aria-hidden="true"
        />
        <span>Handcrafted Daily in Udaipur</span>
      </div>
    </div>
  );
};
