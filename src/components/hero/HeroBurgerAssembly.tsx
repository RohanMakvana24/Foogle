/**
 * HeroBurgerAssembly — Scroll-driven burger assembly inside the Hero Section.
 *
 * Replaces the static hero burger image.
 * Initially (scroll = 0): Exploded deconstructed view (matching user's reference photo).
 * As user scrolls Hero: Layers glide together into a tight, gapless, mouthwatering smash burger.
 * When assembled (scroll > 0.65): Flame-grill fire effect ignites beneath the bottom bun with dancing flames & embers!
 */

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

// Perfectly calibrated offsets from stage center for hero right column (zero gaps when assembled)
const LAYERS = [
  {
    src: '/layer-topbun-new.webp',
    alt: 'Sesame Brioche Top Bun',
    restingY: -94,
    explodedY: -188,
    zIndex: 50,
    maxWidth: 270,
  },
  {
    src: '/layer-lettuce-new.webp',
    alt: 'Fresh Crisp Lettuce & Farm Tomatoes',
    restingY: -32,
    explodedY: -75,
    zIndex: 40,
    maxWidth: 300,
  },
  {
    src: '/layer-patty-new.webp',
    alt: 'Double Smashed Patty with Melted Cheddar',
    restingY: 22,
    explodedY: 65,
    zIndex: 30,
    maxWidth: 300,
  },
  {
    src: '/layer-bottombun-new.webp',
    alt: 'Toasted Sesame Bottom Bun',
    restingY: 94,
    explodedY: 185,
    zIndex: 20,
    maxWidth: 270,
  },
] as const;

// ─── Realistic SVG Flame Tongue ──────────────────────────────────────────────
interface FlameTongueProps {
  left: string;
  width: number;
  height: number;
  duration: number;
  delay: number;
  flameOpacity: MotionValue<number>;
  id: string;
}

function FlameTongue({ left, width, height, duration, delay, flameOpacity, id }: FlameTongueProps) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none origin-bottom"
      style={{
        left,
        width,
        height,
        opacity: flameOpacity,
        transformOrigin: 'bottom center',
      }}
      animate={{
        scaleY: [0.86, 1.15, 0.90, 1.20, 0.86],
        scaleX: [0.94, 1.06, 0.96, 1.04, 0.94],
        x: ['-50%', '-48%', '-53%', '-49%', '-50%'],
        skewX: [-2, 3, -1, 4, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 100 160"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id={`hero-flame-outer-${id}`} cx="50%" cy="80%" r="65%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`hero-flame-inner-${id}`} cx="50%" cy="85%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#F97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glowing flame */}
        <path
          d="M 50 0 C 42 40 8 75 8 115 C 8 145 28 160 50 160 C 72 160 92 145 92 115 C 92 75 58 40 50 0 Z"
          fill={`url(#hero-flame-outer-${id})`}
          filter="blur(1.5px)"
        />
        {/* Core hot flame */}
        <path
          d="M 50 25 C 45 55 22 85 22 120 C 22 145 35 155 50 155 C 65 155 78 145 78 120 C 78 85 55 55 50 25 Z"
          fill={`url(#hero-flame-inner-${id})`}
        />
        {/* White-hot center tongue */}
        <path
          d="M 50 60 C 47 85 36 110 36 135 C 36 150 42 155 50 155 C 58 155 64 150 64 135 C 64 110 53 85 50 60 Z"
          fill="#FFFBEB"
          opacity="0.85"
        />
      </svg>
    </motion.div>
  );
}

// ─── Floating Ember Spark ───────────────────────────────────────────────────
interface EmberProps {
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  flameOpacity: MotionValue<number>;
  driftX: number;
}

function EmberSpark({ left, size, duration, delay, color, flameOpacity, driftX }: EmberProps) {
  return (
    <motion.div
      className="absolute bottom-2 pointer-events-none rounded-full"
      style={{
        left,
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px #F97316`,
        opacity: flameOpacity,
      }}
      animate={{
        y: [0, -60, -130, -200],
        x: [0, driftX * 0.4, driftX * 0.8, driftX],
        opacity: [0, 1, 0.85, 0],
        scale: [0.6, 1.3, 0.9, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Flame configuration along the bottom bun width
const FLAME_TONGUES = [
  { id: 'hf1', left: '16%', width: 38, height: 58, duration: 0.65, delay: 0.0  },
  { id: 'hf2', left: '28%', width: 46, height: 74, duration: 0.75, delay: 0.15 },
  { id: 'hf3', left: '40%', width: 52, height: 82, duration: 0.70, delay: 0.05 },
  { id: 'hf4', left: '50%', width: 56, height: 88, duration: 0.80, delay: 0.22 },
  { id: 'hf5', left: '60%', width: 52, height: 80, duration: 0.72, delay: 0.10 },
  { id: 'hf6', left: '72%', width: 46, height: 72, duration: 0.68, delay: 0.28 },
  { id: 'hf7', left: '84%', width: 36, height: 56, duration: 0.62, delay: 0.18 },
];

const EMBER_SPARKS = [
  { left: '12%', size: 4, duration: 1.4, delay: 0.0,  color: '#FEF08A', driftX: -20 },
  { left: '24%', size: 5, duration: 1.6, delay: 0.35, color: '#FBBF24', driftX: -14 },
  { left: '38%', size: 6, duration: 1.3, delay: 0.15, color: '#F97316', driftX: 12  },
  { left: '50%', size: 4, duration: 1.8, delay: 0.50, color: '#FEF08A', driftX: -10 },
  { left: '62%', size: 5, duration: 1.5, delay: 0.20, color: '#F59E0B', driftX: 18  },
  { left: '76%', size: 6, duration: 1.4, delay: 0.40, color: '#EF4444', driftX: 16  },
  { left: '88%', size: 4, duration: 1.7, delay: 0.10, color: '#FBBF24', driftX: 22  },
  { left: '30%', size: 3, duration: 1.2, delay: 0.60, color: '#FDE047', driftX: -12 },
  { left: '70%', size: 3, duration: 1.3, delay: 0.85, color: '#FEF08A', driftX: -16 },
];

// ─── Individual Animated Layer ────────────────────────────────────────────────
function HeroLayer({
  src,
  alt,
  restingY,
  explodedY,
  maxWidth,
  zIndex,
  scrollProgress,
}: {
  src: string;
  alt: string;
  restingY: number;
  explodedY: number;
  maxWidth: number;
  zIndex: number;
  scrollProgress: MotionValue<number>;
}) {
  // As user scrolls from 0 to 0.70, layer glides from explodedY to restingY
  const y = useTransform(scrollProgress, [0, 0.70], [explodedY, restingY]);

  return (
    <motion.div
      className="absolute left-1/2 pointer-events-none"
      style={{
        y,
        zIndex,
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: maxWidth,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="w-full h-auto object-contain select-none"
        draggable={false}
      />
    </motion.div>
  );
}

// ─── Main Hero Burger Assembly Component ─────────────────────────────────────
export const HeroBurgerAssembly: React.FC<{
  scrollProgress: MotionValue<number>;
}> = ({ scrollProgress }) => {
  // Fire appears when burger is almost fully assembled
  const fireOpacity = useTransform(scrollProgress, [0.65, 0.82], [0, 1]);

  // Warm backlight glow expands when assembled
  const glowOpacity = useTransform(scrollProgress, [0.55, 0.80], [0.15, 0.45]);
  const glowScale   = useTransform(scrollProgress, [0.55, 0.80], [0.85, 1.05]);

  // Subtle garnish particles fade out as burger closes
  const garnishOpacity = useTransform(scrollProgress, [0, 0.50], [1, 0]);
  const garnishSpread  = useTransform(scrollProgress, [0, 0.50], [1, 0.4]);

  return (
    <div
      className="relative flex items-center justify-center select-none scale-[1.18] sm:scale-[1.25] origin-center my-2 sm:my-3"
      style={{
        width: '100%',
        maxWidth: '440px',
        height: '430px',
      }}
    >
      {/* Warm Ambient Backlight Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(251,191,36,0.50) 0%, rgba(249,115,22,0.28) 45%, transparent 72%)',
          filter: 'blur(36px)',
          zIndex: 5,
        }}
        aria-hidden="true"
      />

      {/* Sizzling Grill Base Glow (under bottom bun) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          opacity: fireOpacity,
          bottom: '50px',
          width: '280px',
          height: '42px',
          background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.65) 0%, rgba(249,115,22,0.45) 45%, transparent 75%)',
          filter: 'blur(10px)',
          zIndex: 10,
        }}
        animate={{
          opacity: [0.75, 1, 0.8, 1, 0.75],
          scaleX: [0.95, 1.05, 0.98, 1.03, 0.95],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* 🔥 Flame Grill Tongues (rising behind bottom bun) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '72px',
          left: '14%',
          right: '14%',
          height: '95px',
          zIndex: 15, // behind bottom bun (zIndex 20)
        }}
      >
        {FLAME_TONGUES.map((ft) => (
          <FlameTongue key={ft.id} {...ft} flameOpacity={fireOpacity} />
        ))}
      </div>

      {/* Floating Garnishes (Exploded View Only) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: garnishOpacity, scale: garnishSpread, zIndex: 45 }}
      >
        {/* Floating herb sprig left */}
        <motion.div
          className="absolute left-[6%] top-[34%]"
          animate={{ y: [0, -6, 0], rotate: [-6, 2, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xl filter drop-shadow-md">🌿</span>
        </motion.div>
        {/* Flying sesame seed right */}
        <motion.div
          className="absolute right-[8%] top-[22%]"
          animate={{ y: [0, 5, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-amber-300 filter drop-shadow">✨</span>
        </motion.div>
        {/* Flying pepper flake bottom left */}
        <motion.div
          className="absolute left-[14%] bottom-[30%]"
          animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-orange-400">🌶️</span>
        </motion.div>
      </motion.div>

      {/* Burger 4 Layers */}
      {LAYERS.map((layer) => (
        <HeroLayer
          key={layer.src}
          {...layer}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* ✨ Rising Ember Sparks (floating up past burger) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ zIndex: 55 }}
      >
        {EMBER_SPARKS.map((es, i) => (
          <EmberSpark key={i} {...es} flameOpacity={fireOpacity} />
        ))}
      </div>
    </div>
  );
};

export default HeroBurgerAssembly;
