'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface LetterMeta {
  id: string;
  label: string;
  desc: string;
  color: string;
}

const LETTERS_INFO: Record<string, LetterMeta> = {
  F: {
    id: 'F',
    label: 'Garden Fork',
    desc: 'Farm-fresh greens & handcrafted comfort food',
    color: '#22c55e',
  },
  o1: {
    id: 'o1',
    label: 'Vine Tomato',
    desc: 'Sun-ripened tomatoes & rich artisan sauces',
    color: '#ef4444',
  },
  o2: {
    id: 'o2',
    label: 'Woodfired Pizza',
    desc: '450°C stone-oven pizzas with melted mozzarella',
    color: '#f59e0b',
  },
  g: {
    id: 'g',
    label: 'Barista Mug',
    desc: 'Freshly roasted coffee brews & latte art',
    color: '#a855f7',
  },
  l: {
    id: 'l',
    label: 'Triple Gelato',
    desc: 'Vanilla, strawberry & Belgian chocolate cone',
    color: '#ec4899',
  },
  e: {
    id: 'e',
    label: 'Golden Pastry',
    desc: 'Warm baked croissants & playful sweet treats',
    color: '#eab308',
  },
};

export interface AnimatedFooterLogoProps {
  isDark?: boolean;
  className?: string;
}

export const AnimatedFooterLogo: React.FC<AnimatedFooterLogoProps> = ({
  isDark = false,
  className = '',
}) => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isDancing, setIsDancing] = useState<boolean>(false);
  const [waveIndex, setWaveIndex] = useState<number>(-1);

  // Trigger continuous gentle wave cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDancing(true);
      // Run cascade across letters 0 to 5
      for (let i = 0; i < 6; i++) {
        setTimeout(() => setWaveIndex(i), i * 160);
      }
      setTimeout(() => {
        setWaveIndex(-1);
        setIsDancing(false);
      }, 6 * 160 + 600);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleManualDance = () => {
    if (isDancing) return;
    setIsDancing(true);
    for (let i = 0; i < 6; i++) {
      setTimeout(() => setWaveIndex(i), i * 140);
    }
    setTimeout(() => {
      setWaveIndex(-1);
      setIsDancing(false);
    }, 6 * 140 + 600);
  };

  const isHighlighted = (id: string, index: number) => {
    return activeLetter === id || waveIndex === index;
  };

  const currentInfo = activeLetter ? LETTERS_INFO[activeLetter] : null;

  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}>
      <style>{`
        @keyframes steam-drift-1 {
          0% { opacity: 0; transform: translateY(0) scaleX(0.7); }
          50% { opacity: 0.9; transform: translateY(-6px) scaleX(1.1); }
          100% { opacity: 0; transform: translateY(-13px) scaleX(1.4); }
        }
        @keyframes steam-drift-2 {
          0% { opacity: 0; transform: translateY(0) scaleX(0.8); }
          50% { opacity: 0.85; transform: translateY(-7px) scaleX(1.2); }
          100% { opacity: 0; transform: translateY(-14px) scaleX(1.5); }
        }
        @keyframes drip-stream {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4) translateY(1.5px); }
        }
        @keyframes gentle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3.5px); }
        }
        @keyframes pizza-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-tomato {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ear-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .anim-steam-1 {
          animation: steam-drift-1 2.2s ease-out infinite;
        }
        .anim-steam-2 {
          animation: steam-drift-2 2.2s ease-out infinite 0.7s;
        }
        .anim-drip {
          animation: drip-stream 2.8s ease-in-out infinite;
        }
        .anim-bob-subtle {
          animation: gentle-bob 4s ease-in-out infinite;
        }
      `}</style>

      {/* Atmospheric Radial Ambient Glow behind Logo */}
      <div
        className="absolute pointer-events-none -inset-10 opacity-60 blur-3xl rounded-full transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(72,191,103,0.18) 0%, rgba(224,159,62,0.14) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(24,59,43,0.08) 0%, rgba(245,158,11,0.1) 40%, transparent 70%)',
        }}
      />

      {/* The Master Official Foogle SVG Doodle Artwork */}
      <div
        className="relative z-10 w-full flex items-center justify-center py-4 cursor-pointer"
        onClick={handleManualDance}
        title="Click to trigger Foogle Logo Dance!"
      >
        <svg
          viewBox="0 0 290 76"
          className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[760px] xl:max-w-[880px] h-auto overflow-visible transition-all duration-300"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="footerForkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <radialGradient id="footerTomatoGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="60%" stopColor="#e02424" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>

            <radialGradient id="footerPizzaCrust" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#fef08a" />
              <stop offset="90%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>

            <linearGradient id="footerPurpleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            <linearGradient id="footerConeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="footerCroissantGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* High-fidelity drop shadow */}
            <filter id="footerFoodShadow" x="-15%" y="-15%" width="135%" height="135%">
              <feDropShadow
                dx="0"
                dy="3.5"
                stdDeviation="2.5"
                floodColor="#000"
                floodOpacity={isDark ? '0.45' : '0.22'}
              />
            </filter>
          </defs>

          {/* ══════════════════════════════════════════════════
              LETTER 1: 'F' — The Emerald Garden Fork
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-F"
            className="transition-transform duration-300 origin-bottom cursor-pointer"
            style={{
              transform: isHighlighted('F', 0)
                ? 'scale(1.18) rotate(-7deg) translateY(-5px)'
                : 'scale(1) rotate(0deg)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('F')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Fork Stem & Top bar forming F */}
            <path
              d="M 12 12 C 12 10, 36 10, 36 12 C 36 15, 20 15, 20 25 C 26 25, 32 25, 32 28 C 32 31, 20 31, 20 44 L 20 54 L 12 54 Z"
              fill="url(#footerForkGrad)"
              stroke="#15803d"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Lower Fork Prongs forming bottom base */}
            <path
              d="M 12 50 L 12 66 C 12 68, 14 68, 14 66 L 14 54 L 17 54 L 17 66 C 17 68, 19 68, 19 66 L 19 54 L 22 54 L 22 66 C 22 68, 24 68, 24 66 L 24 50 Z"
              fill="#16a34a"
              stroke="#15803d"
              strokeWidth="0.6"
            />
            {/* Gloss shine highlight */}
            <path
              d="M 14 13 L 34 13"
              stroke="#bbf7d0"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="16" cy="18" r="1.3" fill="#fff" opacity="0.95" />
          </g>

          {/* ══════════════════════════════════════════════════
              LETTER 2: 'o' — The Juicy Red Farm Tomato
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-o1"
            className="transition-transform duration-300 origin-center cursor-pointer"
            style={{
              transform: isHighlighted('o1', 1)
                ? 'scale(1.2) translateY(-6px)'
                : 'scale(1)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('o1')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Tomato Body */}
            <ellipse
              cx="68"
              cy="42"
              rx="20"
              ry="18"
              fill="url(#footerTomatoGrad)"
              stroke="#991b1b"
              strokeWidth="0.8"
            />
            {/* Gloss highlight */}
            <ellipse
              cx="62"
              cy="36"
              rx="6"
              ry="3.5"
              fill="#ffffff"
              opacity="0.6"
              transform="rotate(-25 62 36)"
            />
            {/* Green Stem & Star Leaf on Top */}
            <g transform="translate(68, 24)">
              <path
                d="M 0 0 C -1 -5, -4 -7, -3 -10 C -2 -7, 1 -5, 0 0"
                fill="#15803d"
                stroke="#166534"
                strokeWidth="0.5"
              />
              <path
                d="M 0 0 L -6 2 L -2 -2 L 0 -5 L 3 -2 L 7 2 L 2 3 Z"
                fill="#22c55e"
                stroke="#15803d"
                strokeWidth="0.5"
              />
            </g>
            <circle cx="68" cy="44" r="1.5" fill="#fca5a5" opacity="0.6" />
          </g>

          {/* ══════════════════════════════════════════════════
              LETTER 3: 'o' — The Golden Cheesy Woodfired Pizza
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-o2"
            className="transition-transform duration-300 origin-center cursor-pointer"
            style={{
              transform: isHighlighted('o2', 2)
                ? 'scale(1.22) rotate(20deg) translateY(-6px)'
                : 'scale(1)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('o2')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Outer Crust Circle */}
            <circle
              cx="120"
              cy="42"
              r="19"
              fill="url(#footerPizzaCrust)"
              stroke="#b45309"
              strokeWidth="1.2"
            />
            {/* Cheese & Sauce Surface */}
            <circle
              cx="120"
              cy="42"
              r="16"
              fill="#fef08a"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />

            {/* Pizza Slices Cut Lines */}
            <line x1="120" y1="23" x2="120" y2="61" stroke="#b45309" strokeWidth="1.2" strokeDasharray="1 1.5" />
            <line x1="103.5" y1="32.5" x2="136.5" y2="51.5" stroke="#b45309" strokeWidth="1.2" strokeDasharray="1 1.5" />
            <line x1="103.5" y1="51.5" x2="136.5" y2="32.5" stroke="#b45309" strokeWidth="1.2" strokeDasharray="1 1.5" />

            {/* Toppings: Basil Leaves (green) & Tomato/Pepperoni slices (red) */}
            <circle cx="114" cy="35" r="2.2" fill="#ef4444" />
            <circle cx="127" cy="38" r="2" fill="#ef4444" />
            <circle cx="118" cy="48" r="2.3" fill="#ef4444" />
            <circle cx="125" cy="46" r="1.6" fill="#15803d" />
            <circle cx="113" cy="43" r="1.5" fill="#15803d" />
            <circle cx="121" cy="33" r="1.5" fill="#22c55e" />

            {/* Golden Melt highlight */}
            <path
              d="M 115 28 A 12 12 0 0 1 128 32"
              fill="none"
              stroke="#fff"
              strokeWidth="1.3"
              opacity="0.75"
              strokeLinecap="round"
            />
          </g>

          {/* ══════════════════════════════════════════════════
              LETTER 4: 'g' — The Purple Cafe Cup & Barista Doodle
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-g"
            className="transition-transform duration-300 origin-center cursor-pointer"
            style={{
              transform: isHighlighted('g', 3)
                ? 'scale(1.2) translateY(-6px)'
                : 'scale(1)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('g')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Animated Coffee Steam rising from the cup */}
            <path
              d="M 166 22 C 164 17, 168 13, 166 9"
              fill="none"
              stroke="#c084fc"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="anim-steam-1"
            />
            <path
              d="M 172 20 C 174 15, 170 12, 173 7"
              fill="none"
              stroke="#e9d5ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="anim-steam-2"
            />

            {/* Top Bowl of the 'g' (The Cafe Mug) */}
            <circle
              cx="168"
              cy="36"
              r="12"
              fill="none"
              stroke="url(#footerPurpleGrad)"
              strokeWidth="4"
            />
            {/* Mug Handle */}
            <path
              d="M 180 32 C 185 32, 185 40, 180 40"
              fill="none"
              stroke="url(#footerPurpleGrad)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            {/* Lower Loop of 'g' (The playful tail) */}
            <path
              d="M 178 36 L 178 50 C 178 58, 158 58, 158 50 C 158 45, 172 45, 178 45"
              fill="none"
              stroke="url(#footerPurpleGrad)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cute Cafe Face inside the mug loop */}
            <circle cx="165" cy="35" r="1.3" fill="#581c87" />
            <circle cx="171" cy="35" r="1.3" fill="#581c87" />
            <path
              d="M 166 38 Q 168 40 170 38"
              fill="none"
              stroke="#581c87"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </g>

          {/* ══════════════════════════════════════════════════
              LETTER 5: 'l' — Triple-Scoop Ice Cream Cone
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-l"
            className="transition-transform duration-300 origin-bottom cursor-pointer"
            style={{
              transform: isHighlighted('l', 4)
                ? 'scale(1.18) rotate(6deg) translateY(-5px)'
                : 'scale(1)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('l')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Top Scoop 1: Mango / Vanilla (Yellow) */}
            <ellipse cx="206" cy="18" rx="6.5" ry="5.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
            <circle cx="204" cy="16" r="1" fill="#fff" opacity="0.9" />

            {/* Middle Scoop 2: Strawberry Gelato (Pink) */}
            <ellipse cx="206" cy="27" rx="7.5" ry="6" fill="#f472b6" stroke="#db2777" strokeWidth="0.6" />
            <circle cx="203" cy="25" r="1.2" fill="#fff" opacity="0.8" />

            {/* Bottom Scoop 3: Belgian Dark Chocolate (Mocha Brown) */}
            <ellipse cx="206" cy="37" rx="8" ry="6.5" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
            <circle cx="203" cy="35" r="1.2" fill="#a16207" opacity="0.6" />

            {/* Waffle Cone Body (Forms the stem of letter 'l') */}
            <polygon
              points="199,41 213,41 206,64"
              fill="url(#footerConeGrad)"
              stroke="#b45309"
              strokeWidth="0.8"
            />
            {/* Waffle Crosshatch lines */}
            <line x1="202" y1="44" x2="210" y2="52" stroke="#b45309" strokeWidth="0.6" opacity="0.65" />
            <line x1="210" y1="44" x2="202" y2="52" stroke="#b45309" strokeWidth="0.6" opacity="0.65" />
            <line x1="204" y1="52" x2="208" y2="58" stroke="#b45309" strokeWidth="0.6" opacity="0.65" />

            {/* Strawberry Cream Drip trickling down the cone */}
            <path
              d="M 203 40 C 203 48, 201 54, 201 58 C 201 60, 203 60, 203 58 C 203 53, 206 46, 206 40"
              fill="#ec4899"
              className="origin-top anim-drip"
            />
          </g>

          {/* ══════════════════════════════════════════════════
              LETTER 6: 'e' — Golden Croissant & Baker Rabbit
              ══════════════════════════════════════════════════ */}
          <g
            id="footer-letter-e"
            className="transition-transform duration-300 origin-center cursor-pointer"
            style={{
              transform: isHighlighted('e', 5)
                ? 'scale(1.2) rotate(-9deg) translateY(-5px)'
                : 'scale(1)',
              filter: 'url(#footerFoodShadow)',
            }}
            onMouseEnter={() => setActiveLetter('e')}
            onMouseLeave={() => setActiveLetter(null)}
          >
            {/* Cute Little Chef Bunny / Pastry Baker perched on top */}
            <g transform="translate(242, 14) scale(0.75)">
              <circle cx="6" cy="6" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
              <ellipse cx="2" cy="0" rx="2" ry="4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.7" />
              <ellipse cx="9" cy="0" rx="2" ry="4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.7" />
              <circle cx="4" cy="5" r="0.8" fill="#78350f" />
              <circle cx="8" cy="5" r="0.8" fill="#78350f" />
              <path d="M 5 8 Q 6 9 7 8" fill="none" stroke="#78350f" strokeWidth="0.6" />
            </g>

            {/* Curled Croissant forming the lowercase letter 'e' */}
            <path
              d="M 235 44 C 235 32, 255 30, 257 39 C 258 45, 235 45, 235 45 C 235 55, 255 58, 260 51"
              fill="none"
              stroke="url(#footerCroissantGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pastry layered crust lines */}
            <path
              d="M 240 37 Q 248 35 254 38"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.2"
              opacity="0.85"
              strokeLinecap="round"
            />
            <path
              d="M 238 49 Q 248 53 256 48"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="1"
              opacity="0.75"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Dynamic Interactive Flavor Pill below Logo */}
      <div className="relative z-10 mt-3 min-h-[38px] flex items-center justify-center">
        {currentInfo ? (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-md transition-all animate-in fade-in zoom-in-95 duration-200"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
              borderColor: currentInfo.color,
              color: isDark ? '#ffffff' : '#183B2B',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentInfo.color }}
            />
            <span className="font-bold">{currentInfo.label}:</span>
            <span className="opacity-90">{currentInfo.desc}</span>
          </div>
        ) : (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(24,59,43,0.04)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(24,59,43,0.1)',
              color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(24,59,43,0.65)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>Official Foogle Emblem · Good Food · Good Mood</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedFooterLogo;
