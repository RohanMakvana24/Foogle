import React, { useState } from 'react';

export interface FoodDoodleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Animated Foogle Food-Doodle Logo
 * Faithfully inspired by the authentic Foogle cafe emblem:
 *  - F: Emerald Garden Fork with fork tines & stem
 *  - o: Ripe Juicy Tomato with green leaf stem
 *  - o: Fresh Oven Pizza with 6 cheesy slices & oregano dots
 *  - g: Purple Cafe Barista Cup / Doodle with steam & smile
 *  - l: Triple-scoop Ice Cream Waffle Cone with strawberry drip
 *  - e: Golden Baked Croissant / Pastry curl
 */
export const FoodDoodleLogo: React.FC<FoodDoodleLogoProps> = ({
  size = 'md',
  showTagline = false,
  animated = true,
  className = '',
  onClick,
}) => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  // Scaled dimensions
  const scaleConfig = {
    sm: { heightClass: 'h-7 sm:h-8' },
    md: { heightClass: 'h-8 sm:h-11' },
    lg: { heightClass: 'h-11 sm:h-14' },
    xl: { heightClass: 'h-14 sm:h-18' },
  }[size];

  const handleMouseEnter = () => {
    if (animated) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1200);
    }
  };

  return (
    <div
      className={`inline-flex flex-col items-center select-none group cursor-pointer transition-transform duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      aria-label="Foogle Cafe"
    >
      <style>{`
        @keyframes foogle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes foogle-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08) translateY(-2px); }
        }
        @keyframes foogle-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes foogle-steam {
          0% { opacity: 0; transform: translateY(0) scaleX(0.8); }
          50% { opacity: 0.8; transform: translateY(-4px) scaleX(1.1); }
          100% { opacity: 0; transform: translateY(-8px) scaleX(1.3); }
        }
        @keyframes foogle-drip {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.35) translateY(1px); }
        }
        @keyframes foogle-wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        @keyframes foogle-shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.6)); }
          100% { opacity: 0.6; }
        }
        .animate-steam-1 {
          animation: foogle-steam 2.2s infinite ease-out;
        }
        .animate-steam-2 {
          animation: foogle-steam 2.2s infinite ease-out 0.8s;
        }
        .animate-idle-float {
          animation: foogle-float 4s ease-in-out infinite;
        }
      `}</style>

      {/* SVG Letter Artworks */}
      <svg
        viewBox="0 0 290 74"
        className={`${scaleConfig.heightClass} w-auto overflow-visible`}
      >
        <defs>
          {/* Gradients for authentic realistic food colors */}
          <linearGradient id="forkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="60%" stopColor="#e02424" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          <radialGradient id="pizzaCrust" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="90%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id="coneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="croissantGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="foodShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════
            LETTER 1: 'F' — The Garden Green Fork
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-F"
          className="transition-all duration-300 origin-bottom"
          style={{
            transform:
              hoveredLetter === 'F' || isWaving
                ? 'scale(1.12) rotate(-5deg) translateY(-3px)'
                : 'rotate(0deg)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('F')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Fork Stem & Top bar forming F */}
          <path
            d="M 12 12 C 12 10, 36 10, 36 12 C 36 15, 20 15, 20 25 C 26 25, 32 25, 32 28 C 32 31, 20 31, 20 44 L 20 54 L 12 54 Z"
            fill="url(#forkGrad)"
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
          {/* Subtle shine highlight */}
          <path
            d="M 14 13 L 34 13"
            stroke="#bbf7d0"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="16" cy="18" r="1.2" fill="#fff" opacity="0.9" />
        </g>

        {/* ══════════════════════════════════════════════════
            LETTER 2: 'o' — The Juicy Red Farm Tomato
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-o1"
          className="transition-all duration-300 origin-center"
          style={{
            transform:
              hoveredLetter === 'o1' || isWaving
                ? 'scale(1.15) translateY(-4px)'
                : 'scale(1)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('o1')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Tomato Body */}
          <ellipse
            cx="68"
            cy="42"
            rx="20"
            ry="18"
            fill="url(#tomatoGrad)"
            stroke="#991b1b"
            strokeWidth="0.8"
          />
          {/* Tomato Gloss Highlight */}
          <ellipse
            cx="62"
            cy="36"
            rx="6"
            ry="3.5"
            fill="#ffffff"
            opacity="0.55"
            transform="rotate(-25 62 36)"
          />
          {/* Fresh Green Stem & Leaf on Top */}
          <g transform="translate(68, 24)">
            {/* Stem curl */}
            <path
              d="M 0 0 C -1 -5, -4 -7, -3 -10 C -2 -7, 1 -5, 0 0"
              fill="#15803d"
              stroke="#166534"
              strokeWidth="0.5"
            />
            {/* Star Calyx leaves */}
            <path
              d="M 0 0 L -6 2 L -2 -2 L 0 -5 L 3 -2 L 7 2 L 2 3 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="0.5"
            />
          </g>
          {/* Cute subtle blush */}
          <circle cx="68" cy="44" r="1.5" fill="#fca5a5" opacity="0.6" />
        </g>

        {/* ══════════════════════════════════════════════════
            LETTER 3: 'o' — The Golden Cheesy Woodfired Pizza
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-o2"
          className="transition-all duration-300 origin-center"
          style={{
            transform:
              hoveredLetter === 'o2' || isWaving
                ? 'scale(1.15) rotate(15deg) translateY(-3px)'
                : 'scale(1)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('o2')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Outer Crust Circle */}
          <circle
            cx="120"
            cy="42"
            r="19"
            fill="url(#pizzaCrust)"
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
            strokeWidth="1.2"
            opacity="0.6"
            strokeLinecap="round"
          />
        </g>

        {/* ══════════════════════════════════════════════════
            LETTER 4: 'g' — The Purple Cafe Cup & Barista Doodle
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-g"
          className="transition-all duration-300 origin-center"
          style={{
            transform:
              hoveredLetter === 'g' || isWaving
                ? 'scale(1.15) translateY(-4px)'
                : 'scale(1)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('g')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Animated Steam rising from the cup */}
          <path
            d="M 166 22 C 164 17, 168 13, 166 9"
            fill="none"
            stroke="#c084fc"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-steam-1"
          />
          <path
            d="M 172 20 C 174 15, 170 12, 173 7"
            fill="none"
            stroke="#e9d5ff"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="animate-steam-2"
          />

          {/* Top Bowl of the 'g' (The Cafe Mug) */}
          <circle
            cx="168"
            cy="36"
            r="12"
            fill="none"
            stroke="url(#purpleGrad)"
            strokeWidth="4"
          />
          {/* Mug Handle */}
          <path
            d="M 180 32 C 185 32, 185 40, 180 40"
            fill="none"
            stroke="url(#purpleGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lower Loop of 'g' (The playful tail) */}
          <path
            d="M 178 36 L 178 50 C 178 58, 158 58, 158 50 C 158 45, 172 45, 178 45"
            fill="none"
            stroke="url(#purpleGrad)"
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
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* ══════════════════════════════════════════════════
            LETTER 5: 'l' — Triple-Scoop Ice Cream Cone
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-l"
          className="transition-all duration-300 origin-bottom"
          style={{
            transform:
              hoveredLetter === 'l' || isWaving
                ? 'scale(1.12) rotate(4deg) translateY(-3px)'
                : 'scale(1)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('l')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Top Scoop 1: Mango / Vanilla (Yellow) */}
          <ellipse cx="206" cy="18" rx="6.5" ry="5.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
          <circle cx="204" cy="16" r="1" fill="#fff" opacity="0.8" />

          {/* Middle Scoop 2: Strawberry Gelato (Pink) */}
          <ellipse cx="206" cy="27" rx="7.5" ry="6" fill="#f472b6" stroke="#db2777" strokeWidth="0.6" />
          <circle cx="203" cy="25" r="1.2" fill="#fff" opacity="0.7" />

          {/* Bottom Scoop 3: Belgian Dark Chocolate (Mocha Brown) */}
          <ellipse cx="206" cy="37" rx="8" ry="6.5" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
          <circle cx="203" cy="35" r="1.2" fill="#a16207" opacity="0.5" />

          {/* Waffle Cone Body (Forms the stem of letter 'l') */}
          <polygon
            points="199,41 213,41 206,64"
            fill="url(#coneGrad)"
            stroke="#b45309"
            strokeWidth="0.8"
          />
          {/* Waffle Crosshatch lines */}
          <line x1="202" y1="44" x2="210" y2="52" stroke="#b45309" strokeWidth="0.6" opacity="0.6" />
          <line x1="210" y1="44" x2="202" y2="52" stroke="#b45309" strokeWidth="0.6" opacity="0.6" />
          <line x1="204" y1="52" x2="208" y2="58" stroke="#b45309" strokeWidth="0.6" opacity="0.6" />

          {/* Delicious Strawberry Cream Drip trickling down the cone */}
          <path
            d="M 203 40 C 203 48, 201 54, 201 58 C 201 60, 203 60, 203 58 C 203 53, 206 46, 206 40"
            fill="#ec4899"
            className="origin-top"
            style={{ animation: 'foogle-drip 3s infinite ease-in-out' }}
          />
        </g>

        {/* ══════════════════════════════════════════════════
            LETTER 6: 'e' — Golden Croissant & Warm Pastry
            ══════════════════════════════════════════════════ */}
        <g
          id="letter-e"
          className="transition-all duration-300 origin-center"
          style={{
            transform:
              hoveredLetter === 'e' || isWaving
                ? 'scale(1.15) rotate(-8deg) translateY(-3px)'
                : 'scale(1)',
            filter: 'url(#foodShadow)',
          }}
          onMouseEnter={() => setHoveredLetter('e')}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {/* Cute Little Chef Bunny / Pastry Baker perched on top */}
          <g transform="translate(242, 14) scale(0.75)">
            {/* Baker bun */}
            <circle cx="6" cy="6" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
            <ellipse cx="2" cy="0" rx="2" ry="4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.7" />
            <ellipse cx="9" cy="0" rx="2" ry="4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.7" />
            {/* Eyes */}
            <circle cx="4" cy="5" r="0.8" fill="#78350f" />
            <circle cx="8" cy="5" r="0.8" fill="#78350f" />
            <path d="M 5 8 Q 6 9 7 8" fill="none" stroke="#78350f" strokeWidth="0.6" />
          </g>

          {/* Curled Croissant forming the lowercase letter 'e' */}
          <path
            d="M 235 44 C 235 32, 255 30, 257 39 C 258 45, 235 45, 235 45 C 235 55, 255 58, 260 51"
            fill="none"
            stroke="url(#croissantGrad)"
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
            opacity="0.8"
            strokeLinecap="round"
          />
          <path
            d="M 238 49 Q 248 53 256 48"
            fill="none"
            stroke="#ca8a04"
            strokeWidth="1"
            opacity="0.7"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default FoodDoodleLogo;
