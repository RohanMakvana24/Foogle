/**
 * BurgerAssembly — Scroll-driven burger layer assembly + flame grill animation.
 *
 * Layers are cropped from ONE perfectly aligned exploded diagram photo.
 * In exploded view, each layer floats apart with its ingredient badge.
 * As the user scrolls down, all layers glide smoothly into a tight, authentic,
 * gapless assembled burger.
 * When fully assembled, an impressive flame-grilled fire effect emerges
 * from the base with dancing flames, glowing embers, and a warm grill glow! 🔥
 */

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

// restingY = perfectly calibrated offsets from stage center (tight_3 composite, zero gaps)
// explodedExtra = additional Y offset when fully exploded
const LAYERS = [
  {
    src: '/layer-topbun-new.webp',
    alt: 'Sesame Brioche Top Bun',
    label: 'Artisan Sesame Bun',
    restingY: -105,
    explodedExtra: -240,
    zIndex: 50,
    maxWidth: 300,
  },
  {
    src: '/layer-lettuce-new.webp',
    alt: 'Fresh Lettuce & Tomato',
    label: 'Crisp Lettuce & Tomatoes',
    restingY: -35,
    explodedExtra: -180,
    zIndex: 40,
    maxWidth: 330,
  },
  {
    src: '/layer-patty-new.webp',
    alt: 'Double Smashed Patty with Cheese',
    label: 'Double Smashed Patty & Cheddar',
    restingY: 25,
    explodedExtra: 180,
    zIndex: 30,
    maxWidth: 330,
  },
  {
    src: '/layer-bottombun-new.webp',
    alt: 'Toasted Sesame Bottom Bun',
    label: 'Toasted Brioche Bun',
    restingY: 105,
    explodedExtra: 240,
    zIndex: 20,
    maxWidth: 300,
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
          <radialGradient id={`flame-outer-${id}`} cx="50%" cy="80%" r="65%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`flame-inner-${id}`} cx="50%" cy="85%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#F97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glowing flame */}
        <path
          d="M 50 0 C 42 40 8 75 8 115 C 8 145 28 160 50 160 C 72 160 92 145 92 115 C 92 75 58 40 50 0 Z"
          fill={`url(#flame-outer-${id})`}
          filter="blur(1.5px)"
        />
        {/* Core hot flame */}
        <path
          d="M 50 25 C 45 55 22 85 22 120 C 22 145 35 155 50 155 C 65 155 78 145 78 120 C 78 85 55 55 50 25 Z"
          fill={`url(#flame-inner-${id})`}
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
      className="absolute bottom-1 pointer-events-none rounded-full"
      style={{
        left,
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px #F97316`,
        opacity: flameOpacity,
      }}
      animate={{
        y: [0, -70, -150, -230],
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
  { id: 'f1', left: '14%', width: 44, height: 68, duration: 0.65, delay: 0.0  },
  { id: 'f2', left: '26%', width: 54, height: 86, duration: 0.75, delay: 0.15 },
  { id: 'f3', left: '38%', width: 62, height: 96, duration: 0.70, delay: 0.05 },
  { id: 'f4', left: '50%', width: 68, height: 104, duration: 0.80, delay: 0.22 },
  { id: 'f5', left: '62%', width: 62, height: 94, duration: 0.72, delay: 0.10 },
  { id: 'f6', left: '74%', width: 54, height: 84, duration: 0.68, delay: 0.28 },
  { id: 'f7', left: '86%', width: 42, height: 66, duration: 0.62, delay: 0.18 },
];

const EMBER_SPARKS = [
  { left: '10%', size: 4, duration: 1.4, delay: 0.0,  color: '#FEF08A', driftX: -24 },
  { left: '22%', size: 5, duration: 1.6, delay: 0.35, color: '#FBBF24', driftX: -18 },
  { left: '35%', size: 6, duration: 1.3, delay: 0.15, color: '#F97316', driftX: 16  },
  { left: '48%', size: 4, duration: 1.8, delay: 0.50, color: '#FEF08A', driftX: -12 },
  { left: '58%', size: 5, duration: 1.5, delay: 0.20, color: '#F59E0B', driftX: 22  },
  { left: '72%', size: 6, duration: 1.4, delay: 0.40, color: '#EF4444', driftX: 18  },
  { left: '85%', size: 4, duration: 1.7, delay: 0.10, color: '#FBBF24', driftX: 26  },
  { left: '18%', size: 3, duration: 1.2, delay: 0.60, color: '#FDE047', driftX: -15 },
  { left: '42%', size: 4, duration: 1.5, delay: 0.75, color: '#F97316', driftX: 10  },
  { left: '65%', size: 3, duration: 1.3, delay: 0.85, color: '#FEF08A', driftX: -20 },
  { left: '80%', size: 5, duration: 1.6, delay: 0.65, color: '#EF4444', driftX: 14  },
];

// ─── Individual Animated Layer ────────────────────────────────────────────────
function BurgerLayer({
  src,
  alt,
  label,
  restingY,
  explodedExtra,
  maxWidth,
  zIndex,
  scrollProgress,
  index,
}: {
  src: string;
  alt: string;
  label: string;
  restingY: number;
  explodedExtra: number;
  maxWidth: number;
  zIndex: number;
  scrollProgress: MotionValue<number>;
  index: number;
}) {
  const explodedY = restingY + explodedExtra;
  const stagger = index * 0.05;

  // Smooth ease into assembled position
  const y = useTransform(
    scrollProgress,
    [stagger, 0.65 + stagger * 0.4],
    [explodedY, restingY],
  );
  const opacity = useTransform(
    scrollProgress,
    [stagger, stagger + 0.08],
    [0, 1],
  );
  // Labels fade in during exploded view, fade out as burger locks together
  const labelOpacity = useTransform(
    scrollProgress,
    [stagger, stagger + 0.12, 0.62],
    [0, 1, 0],
  );
  const labelX = useTransform(
    scrollProgress,
    [stagger, stagger + 0.15],
    [explodedExtra > 0 ? 20 : -20, 0],
  );

  const isAbove = explodedExtra < 0;

  return (
    <motion.div
      className="absolute left-1/2 pointer-events-none"
      style={{
        y,
        opacity,
        zIndex,
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: maxWidth,
      }}
    >
      <div className="relative flex flex-col items-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain select-none"
          style={{
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))',
          }}
          draggable={false}
        />

        {/* Ingredient label chip */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            opacity: labelOpacity,
            x: labelX,
            [isAbove ? 'bottom' : 'top']: '-1.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold shadow-sm backdrop-blur-md"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 90%, transparent)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.8)]" />
            {label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const BurgerAssembly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [showFire, setShowFire] = React.useState(false);

  // "Crafted to Perfection!" badge
  const assembledOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const assembledScale   = useTransform(scrollYProgress, [0.72, 0.88], [0.82, 1]);
  const assembledY       = useTransform(scrollYProgress, [0.72, 0.88], [14, 0]);

  // Flame effect emerges when assembled
  const fireOpacity = useTransform(scrollYProgress, [0.74, 0.88], [0, 1]);

  React.useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const isNearAssembled = v >= 0.70;
      setShowFire((prev) => (prev !== isNearAssembled ? isNearAssembled : prev));
    });
  }, [scrollYProgress]);

  // Warm amber glow behind assembled burger
  const glowOpacity = useTransform(scrollYProgress, [0.68, 0.88], [0, 0.42]);
  const glowScale   = useTransform(scrollYProgress, [0.68, 0.88], [0.7, 1]);

  // Scroll hint fades out immediately on scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Sticky viewport */}
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-page)' }}
      >
        {/* Dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          aria-hidden="true"
          style={{
            color: 'var(--color-text-primary)',
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Section Header */}
        <div className="relative z-10 mb-2 text-center select-none">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Scroll to Assemble
          </p>
          <h2
            className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Built{' '}
            <span className="text-amber-500 dark:text-amber-400">Layer by Layer</span>
          </h2>
        </div>

        {/* ── Burger Stage ───────────────────────────────────── */}
        <div
          className="relative z-10"
          style={{ width: '420px', height: '480px', maxWidth: '92vw' }}
        >
          {/* Warm ambient backlight glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              width: 380,
              height: 380,
              background: 'radial-gradient(circle, rgba(251,191,36,0.50) 0%, rgba(249,115,22,0.28) 45%, transparent 72%)',
              filter: 'blur(40px)',
              zIndex: 5,
            }}
            aria-hidden="true"
          />

          {/* Sizzling Grill Base Glow (under the bottom bun) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              opacity: fireOpacity,
              bottom: '55px',
              width: '320px',
              height: '50px',
              background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.65) 0%, rgba(249,115,22,0.45) 45%, transparent 75%)',
              filter: 'blur(12px)',
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

          {/* 🔥 Flame Grill Tongues (rising behind bottom bun - active when assembled) */}
          {showFire && (
            <>
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: '80px',
                  left: '12%',
                  right: '12%',
                  height: '110px',
                  zIndex: 15, // behind bottom bun (zIndex 20)
                }}
              >
                {FLAME_TONGUES.map((ft) => (
                  <FlameTongue key={ft.id} {...ft} flameOpacity={fireOpacity} />
                ))}
              </div>

              {/* ✨ Rising Ember Sparks (floating up past the burger) */}
              <div
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{ zIndex: 55 }}
              >
                {EMBER_SPARKS.map((es, i) => (
                  <EmberSpark key={i} {...es} flameOpacity={fireOpacity} />
                ))}
              </div>
            </>
          )}

          {/* Burger layers (z-index 20 to 50) */}
          {LAYERS.map((layer, index) => (
            <BurgerLayer
              key={layer.src}
              {...layer}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}

          {/* "🔥 Flame-Grilled to Perfection!" badge */}
          <motion.div
            className="absolute left-1/2 pointer-events-none"
            style={{
              opacity: assembledOpacity,
              scale: assembledScale,
              y: assembledY,
              bottom: '-55px',
              translateX: '-50%',
              zIndex: 70,
              whiteSpace: 'nowrap',
            }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xl border border-amber-500/30 backdrop-blur-md"
              style={{
                backgroundColor: 'var(--color-brand-primary)',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px -5px rgba(24,59,43,0.5), 0 0 20px rgba(245,158,11,0.25)',
              }}
            >
              <span className="text-base">🔥</span>
              <span>Flame-Grilled to Perfection!</span>
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-zinc-950 text-[10px] font-black shadow-sm">
                ✓
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 select-none"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Scroll to build
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="h-5 w-0.5 rounded-full bg-amber-400 animate-bounce" />
            <svg className="h-3.5 w-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BurgerAssembly;
