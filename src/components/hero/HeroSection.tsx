import React from 'react';
import { Container } from '../common/Container';
import { HeroBurger3D } from './HeroBurger3D';
import { ArrowRight, MapPin, Sparkles, Flame, Star, Heart } from 'lucide-react';

const TICKER_ITEMS = [
  'Artisan Sesame Bun',
  'Flame-Grilled Double Patty',
  'Secret Foogle Sauce',
  '100% Fresh Gourmet Ingredients',
  'Hand-Kneaded Artisan Crusts',
  'Craft Brews & Shakes',
];

const HIGHLIGHTS = [
  { icon: Sparkles, label: 'Artisan Sesame Bun' },
  { icon: Flame, label: 'Flame-Grilled Double Patty' },
  { icon: Heart, label: 'Secret Foogle Sauce' },
];

export const HeroSection: React.FC = () => {
  const scrollToAnchor = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-main-heading"
      className="relative flex min-h-[calc(100vh-72px)] flex-col justify-center overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-page)' }}
    >
      {/* ============================================================
          ATMOSPHERE: warm kitchen glow, forest shadow, dotted texture
         ============================================================ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-40 right-[-12%] h-[540px] w-[540px] rounded-full opacity-35 blur-[130px] sm:h-[640px] sm:w-[640px] dark:opacity-45"
          style={{ background: 'radial-gradient(circle, #FB923C 0%, #F59E0B 38%, transparent 72%)' }}
        />
        <div
          className="absolute -bottom-32 left-[-12%] h-[420px] w-[420px] rounded-full opacity-20 blur-[120px] dark:opacity-30"
          style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.06]"
          style={{
            color: 'var(--color-text-primary)',
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, #000 35%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 35%, transparent 78%)',
          }}
        />
      </div>

      {/* ============================================================
          TOP META BAR: live status + house identity + rating
         ============================================================ */}
      <Container className="relative z-10 w-full pt-6 sm:pt-8">
        <div
          className="flex items-center justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]"
              style={{
                backgroundColor: 'var(--color-brand-surface-tint)',
                color: 'var(--color-brand-primary)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Kitchen Open
            </span>

            <span
              className="hidden truncate text-[11px] font-semibold uppercase tracking-[0.2em] sm:block"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Foogle · Panchwati, Udaipur
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
              4.9
            </span>
            <span className="hidden text-[11px] font-medium sm:inline" style={{ color: 'var(--color-text-tertiary)' }}>
              / 1,200+ reviews
            </span>
          </div>
        </div>
      </Container>

      {/* ============================================================
          MAIN HERO: editorial copy left, circular 3D stage right
         ============================================================ */}
      <Container className="relative z-10 w-full py-9 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* ------------------ LEFT: COPY & ACTIONS ------------------ */}
          <div className="lg:col-span-6">
            <p
              className="animate-hero-fade-rise flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <span className="h-px w-8" style={{ backgroundColor: 'var(--color-border-hover)' }} />
              Udaipur&rsquo;s Burger Institution
            </p>

            <h1
              id="hero-main-heading"
              className="animate-hero-fade-rise animation-delay-100 mt-4 text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem] xl:text-[4.9rem]"
              style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
            >
              Crafted Burgers.
              <br />
              <span className="relative inline-block pb-2">
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-400 dark:to-amber-200">
                  Unmatched Taste.
                </span>
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="hero-underline-stroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="70%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F97316" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 8C70 3 168 2 298 6"
                    fill="none"
                    stroke="url(#hero-underline-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              className="animate-hero-fade-rise animation-delay-200 mt-6 max-w-xl text-[15px] leading-relaxed sm:text-lg"
              style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
            >
              Step into Udaipur&rsquo;s favourite culinary hotspot. From double-stacked smashed patties to
              hand-kneaded artisan crusts and craft brews — made with passion every single day.
            </p>

            {/* Call to actions */}
            <div className="animate-hero-fade-rise animation-delay-300 mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToAnchor('#menu')}
                className="group inline-flex min-h-[54px] cursor-pointer items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-bold shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.5)] active:translate-y-0 active:scale-[0.99] sm:text-base"
                style={{
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'var(--color-btn-primary-text)',
                }}
              >
                <span>Order / Explore Menu</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToAnchor('#contact')}
                className="inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 active:translate-y-0 sm:text-base"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>Visit Us in Udaipur</span>
              </button>
            </div>

            {/* Rating / freshness / trend metrics */}
            <div
              className="animate-hero-fade-rise animation-delay-300 mt-9 grid grid-cols-3 divide-x overflow-hidden rounded-2xl border backdrop-blur-md"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 88%, transparent)',
                borderColor: 'var(--color-border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="px-3 py-4 sm:px-5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    4.9
                  </span>
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
                <p
                  className="mt-1 text-[10px] font-semibold leading-tight sm:text-[11px]"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Over 1,200+ Reviews
                </p>
              </div>

              <div className="px-3 py-4 sm:px-5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <span className="text-2xl font-extrabold tracking-tight text-amber-600 sm:text-3xl dark:text-amber-400">
                  100%
                </span>
                <p
                  className="mt-1 text-[10px] font-semibold leading-tight sm:text-[11px]"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Fresh Gourmet Ingredients
                </p>
              </div>

              <div className="px-3 py-4 sm:px-5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <span
                  className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  #1
                </span>
                <p
                  className="mt-1 text-[10px] font-semibold leading-tight sm:text-[11px]"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Trending Cafe in Udaipur
                </p>
              </div>
            </div>
          </div>

          {/* ------------------ RIGHT: 3D BURGER STAGE ------------------ */}
          <div className="relative lg:col-span-6">
            <div className="animate-hero-image-reveal relative flex w-full items-center justify-center">
              {/* spotlight halo */}
              <div
                className="animate-hero-halo pointer-events-none absolute aspect-square w-[min(74%,470px)] rounded-full opacity-45 blur-[90px] dark:opacity-40"
                style={{ background: 'radial-gradient(circle, #FCD34D 0%, #F97316 45%, transparent 72%)' }}
                aria-hidden="true"
              />

              {/* dashed orbit ring with a travelling spark */}
              <div
                className="animate-hero-orbit pointer-events-none absolute aspect-square w-[min(84%,520px)] rounded-full border border-dashed"
                style={{ borderColor: 'rgba(245, 158, 11, 0.45)' }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.9)]" />
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500/70" />
              </div>

              {/* outer hairline ring */}
              <div
                className="pointer-events-none absolute aspect-square w-[min(94%,580px)] rounded-full border"
                style={{ borderColor: 'var(--color-border)' }}
                aria-hidden="true"
              />

              <HeroBurger3D />

              {/* floating spec chips (desktop) */}
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <span
                  className="animate-subtle-float absolute left-0 top-2 inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold backdrop-blur-xl"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 84%, transparent)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Artisan Sesame Bun
                </span>

                <span
                  className="animate-subtle-float absolute right-0 top-8 inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold backdrop-blur-xl"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 84%, transparent)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-card)',
                    animationDelay: '1.4s',
                  }}
                >
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  Flame-Grilled Double Patty
                </span>

                <span
                  className="animate-subtle-float absolute bottom-2 left-0 inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold backdrop-blur-xl"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 84%, transparent)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-card)',
                    animationDelay: '2.6s',
                  }}
                >
                  <Heart className="h-3.5 w-3.5 text-rose-500" />
                  Secret Foogle Sauce
                </span>
              </div>
            </div>

            {/* 360° interaction pill */}
            <div className="relative z-10 -mt-3 flex justify-center">
              <div
                className="inline-flex select-none items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium backdrop-blur-md"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 85%, transparent)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  360° Interactive Model
                </span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>·</span>
                <span>Drag to inspect layers</span>
              </div>
            </div>

            {/* spec chips (mobile / tablet) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:hidden">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border-subtle)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ============================================================
          BOTTOM TICKER: signature craft strip
         ============================================================ */}
      <div
        className="relative z-10 mt-4 overflow-hidden border-y"
        style={{
          borderColor: 'var(--color-border-subtle)',
          backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 70%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-10 py-3.5 [--duration:42s] [--gap:2.5rem]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              aria-hidden={index >= TICKER_ITEMS.length}
              className="flex items-center gap-10 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] sm:text-[11px]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span>{item}</span>
              <span className="text-amber-500">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
