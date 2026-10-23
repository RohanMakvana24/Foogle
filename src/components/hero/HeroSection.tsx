import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Minus,
  Plus,
  ArrowRight,
  Flame,
  Star,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { HeroBurgerAssembly } from './HeroBurgerAssembly';
import { useCart, HERO_BURGER_ITEM } from '../../context/CartContext';

export const HeroSection: React.FC = () => {
  const [qty, setQty] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();

  // Track scroll through the pinned Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll hint fades out as user begins scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Order card chef badge transforms to Flame-Grilled when assembled
  const isAssembledOpacity = useTransform(scrollYProgress, [0.65, 0.80], [0, 1]);
  const defaultBadgeOpacity = useTransform(scrollYProgress, [0.65, 0.80], [1, 0]);

  const scrollToAnchor = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrder = () => {
    addItem(HERO_BURGER_ITEM, qty);
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      openCart();
    }, 500);
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full"
      style={{ height: '240vh' }}
    >
      {/* Pinned / Sticky Viewport */}
      <section
        aria-label="Food Mood Hero Section"
        className="sticky top-[72px] flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: 'var(--color-bg-page)',
        }}
      >
        {/* Delicate fine-dotted grid only — clean aesthetic */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
            style={{
              color: 'var(--color-text-primary)',
              backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            
            {/* ============================================================
                LEFT COLUMN: FOOD CAN CHANGE MOOD (Clean, High Contrast)
               ============================================================ */}
            <div className="flex flex-col lg:col-span-6 xl:col-span-6.5">
              
              {/* Live Kitchen Badge */}
              <div className="mb-4 inline-flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all"
                  style={{
                    backgroundColor: 'var(--color-brand-surface-tint)',
                    color: 'var(--color-brand-primary)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  Udaipur&rsquo;s Artisan Burger Destination
                </span>
              </div>

              {/* Giant Graphic Header: BITE INTO. PURE DELIGHT. */}
              <div className="relative select-none">
                <h1 className="font-black tracking-[-0.035em] leading-[0.96]">
                  <span
                    className="block text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.6rem] xl:text-[5.2rem]"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    BITE INTO<span className="text-amber-500">.</span>
                  </span>
                  <span
                    className="block text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.6rem] xl:text-[5.2rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
                  >
                    PURE DELIGHT<span className="text-amber-500">.</span>
                  </span>
                </h1>
              </div>

              {/* Subheading: The Fastest Delivery In Your City */}
              <div className="mt-5 sm:mt-6">
                <h2
                  className="text-xl sm:text-2xl md:text-[1.85rem] font-extrabold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  The Fastest Delivery In{' '}
                  <span className="text-amber-500 dark:text-amber-400 font-black">
                    Your City.
                  </span>
                </h2>
                <p
                  className="mt-2.5 max-w-lg text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Flame-grilled double smashed patties, hand-kneaded artisan crusts, and melted cheddar —
                  crafted with passion and delivered fresh to your doorstep in Panchwati & across Udaipur.
                </p>
              </div>

              {/* CTAs matching luxury design tokens */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToAnchor('#menu')}
                  className="group inline-flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2.5 text-sm font-bold shadow-[0_12px_28px_-10px_rgba(24,59,43,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(24,59,43,0.45)] active:translate-y-0"
                  style={{
                    backgroundColor: 'var(--color-brand-primary)',
                    color: '#FFFFFF',
                  }}
                >
                  <span>Order / Explore Menu</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToAnchor('#story')}
                  className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 active:translate-y-0"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Our Story</span>
                </button>
              </div>

              {/* 3 Metric Cards */}
              <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
                {/* Card 1: 8.4k Reviews */}
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-3.5 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span
                    className="text-xs sm:text-[13px] font-extrabold tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    8.4k Reviews
                  </span>
                  <span
                    className="mt-0.5 text-[10px] sm:text-[11px] font-medium"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    (4.9) Rating
                  </span>
                </div>

                {/* Card 2: 2500+ */}
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-3.5 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 6v3" />
                      <circle cx="16" cy="5" r="1.5" fill="currentColor" />
                      <path d="M6 17c0-5.523 4.477-8 10-8s10 2.477 10 8" />
                      <path d="M5 17h22v2H5z" />
                      <path d="M7 23h18" />
                      <path d="M9 26h14" />
                    </svg>
                  </div>
                  <span
                    className="text-xs sm:text-[13px] font-extrabold tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    2500+
                  </span>
                  <span
                    className="mt-0.5 text-[10px] sm:text-[11px] font-medium"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Happy Foodies
                  </span>
                </div>

                {/* Card 3: 60+ Items */}
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-3.5 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 6c-.5 1.5.5 2.5 0 4" />
                      <path d="M16 5c-.5 1.5.5 2.5 0 4" />
                      <path d="M21 6c-.5 1.5.5 2.5 0 4" />
                      <path d="M6 14h20c0 6-4 10-10 10s-10-4-10-10Z" fill="currentColor" fillOpacity="0.15" />
                      <circle cx="27" cy="8" r="2" />
                      <path d="M27 10v14" />
                    </svg>
                  </div>
                  <span
                    className="text-xs sm:text-[13px] font-extrabold tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    60+
                  </span>
                  <span
                    className="mt-0.5 text-[10px] sm:text-[11px] font-medium"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Gourmet Items
                  </span>
                </div>
              </div>

            </div>

            {/* ============================================================
                RIGHT COLUMN: SCROLL-DRIVEN BURGER ASSEMBLY + LUXURY ORDER CARD
               ============================================================ */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-6 xl:col-span-5.5">
              
              {/* Interactive Burger Assembly (Scrolls to assemble directly in hero!) */}
              <HeroBurgerAssembly scrollProgress={scrollYProgress} />

              {/* Floating Luxury Order Card */}
              <div
                className="relative z-20 -mt-2 sm:-mt-4 w-full max-w-[390px] rounded-[22px] border p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 95%, transparent)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-elevated)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-sm sm:text-base font-extrabold tracking-tight"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        Mexican Premium Burger
                      </h3>
                      
                      {/* Dynamic Badge: Chef's Pick -> Flame-Grilled when assembled */}
                      <div className="relative">
                        <motion.span
                          style={{ opacity: defaultBadgeOpacity }}
                          className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400"
                        >
                          <Flame className="h-3 w-3" /> Chef&rsquo;s Pick
                        </motion.span>
                        <motion.span
                          style={{ opacity: isAssembledOpacity }}
                          className="absolute inset-0 inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-950/70 px-2 py-0.5 text-[10px] font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap shadow-xs"
                        >
                          <Flame className="h-3 w-3 text-red-500 animate-pulse" /> Flame-Grilled!
                        </motion.span>
                      </div>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                      Double smashed patty · melted gouda · smoked paprika
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400">
                      ₹289
                    </span>
                  </div>
                </div>

                {/* Quantity selector & Add Cart CTA */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  {/* Stepper counter */}
                  <div
                    className="flex items-center gap-2.5 rounded-full border px-3 py-1.5"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-bg-subtle)',
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="h-3 w-3 stroke-[2.5]" />
                    </button>
                    <span
                      className="w-3 text-center text-xs font-bold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(qty + 1)}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-zinc-950 shadow-xs hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3 stroke-[3]" />
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-brand-primary)',
                      color: '#FFFFFF',
                    }}
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
                    <span>{isOrdered ? 'Added to Tray! ✓' : 'Add to Order'}</span>
                  </button>

                  {/* Quick Next Item button */}
                  <button
                    type="button"
                    aria-label="Browse next item"
                    onClick={() => scrollToAnchor('#menu')}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-amber-400/60 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-bg-subtle)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Scroll To Build Hint (At bottom center of hero) */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 select-none pointer-events-none"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Scroll to assemble burger & explore
          </span>
          <span className="h-4 w-0.5 rounded-full bg-amber-500 animate-bounce" />
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
