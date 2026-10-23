import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { buildSrcSet, buildAvifSrcSet } from '../../lib/imageSrcSet';
import { TabletopBrandCard } from '../common/TabletopBrandCard';

export interface MenuFoodVisualProps {
  item: MenuItem;
  aspectRatio?: '4:3' | '16:9' | '1:1' | '16/10';
  className?: string;
  showBrandCard?: boolean;
}

/**
 * MenuFoodVisual Component
 * Renders realistic, authentic cafe-style food photography with a tabletop brand tent card.
 * Includes:
 * - Commercial cafe food photography with natural textures & appetizing lighting
 * - Tabletop tent card with exact text "FOOGLE" naturally placed beside the food
 * - Graceful fallback to rich dish vector artwork if offline or on network failure
 * - Elimination of Cumulative Layout Shifts (CLS) via fixed aspect ratio container
 */
export const MenuFoodVisual: React.FC<MenuFoodVisualProps> = ({
  item,
  aspectRatio = '4:3',
  className = '',
  showBrandCard = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
    '16/10': 'aspect-[16/10]',
  }[aspectRatio] || 'aspect-[4/3]';

  const renderDishIllustrationFallback = () => {
    switch (item.categoryId) {
      case 'pizza':
        return (
          <g transform="translate(200, 150)">
            {/* Wooden Board */}
            <circle cx="0" cy="0" r="110" fill="#6B4423" />
            <circle cx="0" cy="0" r="106" fill="#5A371B" />
            {/* Crust */}
            <circle cx="0" cy="0" r="95" fill="#D97706" />
            <circle cx="0" cy="0" r="91" fill="#B45309" />
            {/* Sauce Base */}
            <circle cx="0" cy="0" r="82" fill={item.id === 'pizza-paneer-tikka' ? '#EA580C' : '#DC2626'} />
            {/* Cheese Layer */}
            <circle cx="0" cy="0" r="76" fill="#FEF3C7" opacity="0.92" />

            {/* Dish-specific toppings */}
            {item.id === 'pizza-margherita' && (
              <g>
                <circle cx="-25" cy="-20" r="16" fill="#FFFDF5" />
                <circle cx="28" cy="-15" r="15" fill="#FFFDF5" />
                <circle cx="0" cy="25" r="17" fill="#FFFDF5" />
                <path d="M -15,-15 C -30,-30 -10,-40 0,-30 C -5,-20 -10,-15 -15,-15 Z" fill="#16A34A" />
                <path d="M 15,-10 C 35,-25 45,-10 35,5 C 20,5 15,-5 15,-10 Z" fill="#16A34A" />
                <path d="M -10,15 C -25,35 -5,45 5,30 C 5,20 -5,15 -10,15 Z" fill="#16A34A" />
              </g>
            )}

            {item.id === 'pizza-paneer-tikka' && (
              <g>
                <rect x="-35" y="-30" width="18" height="18" rx="2" fill="#F97316" transform="rotate(15 -26 -21)" />
                <rect x="15" y="-35" width="18" height="18" rx="2" fill="#F97316" transform="rotate(-20 24 -26)" />
                <rect x="-25" y="15" width="18" height="18" rx="2" fill="#F97316" transform="rotate(40 -16 24)" />
                <rect x="18" y="18" width="18" height="18" rx="2" fill="#F97316" transform="rotate(-10 27 27)" />
                <path d="M -15,-5 Q 0,-15 15,-5" stroke="#15803D" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M -5,10 Q 15,20 25,5" stroke="#15803D" strokeWidth="4" strokeLinecap="round" fill="none" />
              </g>
            )}

            {item.id === 'pizza-exotic' && (
              <g>
                <circle cx="-20" cy="-20" r="4" fill="#FACC15" />
                <circle cx="-10" cy="-30" r="4" fill="#FACC15" />
                <circle cx="20" cy="-25" r="4" fill="#FACC15" />
                <circle cx="35" cy="0" r="4" fill="#FACC15" />
                <circle cx="-25" cy="20" r="4" fill="#FACC15" />
                <circle cx="15" cy="25" r="4" fill="#FACC15" />
                <circle cx="0" cy="-10" r="6" fill="#1E293B" />
                <circle cx="0" cy="-10" r="2.5" fill="#FEF3C7" />
                <circle cx="-35" cy="0" r="6" fill="#1E293B" />
                <circle cx="-35" cy="0" r="2.5" fill="#FEF3C7" />
                <circle cx="25" cy="15" r="6" fill="#1E293B" />
                <circle cx="25" cy="15" r="2.5" fill="#FEF3C7" />
                <path d="M -15,10 Q -5,0 5,10" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 5,-20 Q 20,-10 15,5" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {(item.id === 'pizza-foogle-special' || item.id === 'pizza-jain-special') && (
              <g>
                <circle cx="-20" cy="-15" r="12" fill="#FEF08A" />
                <circle cx="25" cy="-20" r="14" fill="#FEF08A" />
                <circle cx="-15" cy="25" r="13" fill="#FEF08A" />
                <circle cx="20" cy="20" r="12" fill="#FEF08A" />
                <path d="M -25,-5 Q -10,-15 5,-5" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 0,15 Q 15,5 25,15" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="0" cy="0" r="3" fill="#EF4444" />
                <circle cx="-25" cy="15" r="3" fill="#F59E0B" />
                <circle cx="30" cy="-5" r="3" fill="#EF4444" />
              </g>
            )}
          </g>
        );

      case 'sandwiches':
        return (
          <g transform="translate(200, 150)">
            <rect x="-130" y="-85" width="260" height="170" rx="20" fill="#FAF5ED" />
            <rect x="-124" y="-79" width="248" height="158" rx="16" fill="#F3ECE0" />
            <g transform="translate(-40, 5) rotate(-15)">
              <polygon points="-60,-40 60,-40 -60,40" fill="#D97706" />
              <polygon points="-56,-36 52,-36 -56,36" fill="#FDE68A" />
              <line x1="-54" y1="-30" x2="40" y2="-30" stroke="#22C55E" strokeWidth="4" />
              <line x1="-50" y1="-22" x2="25" y2="-22" stroke="#EF4444" strokeWidth="4" />
              <line x1="-46" y1="-14" x2="10" y2="-14" stroke="#84CC16" strokeWidth="3.5" />
            </g>
            <g transform="translate(45, 10) rotate(20)">
              <polygon points="-60,-40 60,-40 -60,40" fill="#D97706" />
              <polygon points="-56,-36 52,-36 -56,36" fill="#FDE68A" />
              <line x1="-54" y1="-30" x2="40" y2="-30" stroke="#22C55E" strokeWidth="4" />
              <line x1="-50" y1="-22" x2="25" y2="-22" stroke="#EF4444" strokeWidth="4" />
              <line x1="-46" y1="-14" x2="10" y2="-14" stroke="#84CC16" strokeWidth="3.5" />
            </g>
          </g>
        );

      case 'pasta':
        return (
          <g transform="translate(200, 150)">
            <circle cx="0" cy="0" r="105" fill="#FAF5ED" />
            <circle cx="0" cy="0" r="82" fill="#E8DFCF" />
            <circle
              cx="0"
              cy="0"
              r="72"
              fill={
                item.id === 'pasta-arrabbiata'
                  ? '#DC2626'
                  : item.id === 'pasta-alfredo'
                  ? '#FEF9C3'
                  : '#FB7185'
              }
            />
            <g
              stroke={item.id === 'pasta-alfredo' ? '#EAB308' : '#B91C1C'}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            >
              <path d="M -30,-25 Q -10,-45 20,-30" />
              <path d="M -40,5 Q -15,-15 15,-5" />
              <path d="M -25,35 Q 10,25 35,35" />
            </g>
            <g fill="#15803D">
              <path d="M 0,-5 C 5,-20 20,-20 15,-5 Z" />
            </g>
          </g>
        );

      case 'sides-snacks':
      case 'cafe-specials':
      case 'desserts':
      default:
        return (
          <g transform="translate(200, 150)">
            <circle cx="0" cy="0" r="95" fill="#FAF5ED" />
            <circle cx="0" cy="0" r="75" fill="#FBBF24" opacity="0.8" />
            <circle cx="0" cy="0" r="30" fill="#DC2626" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-[calc(var(--radius-lg)-1px)] select-none bg-stone-900 ${className}`}
    >
      {/* 1. Realistic Food Photo Image (Lazy Loaded, Crisp Object Cover) */}
      {item.imageUrl && !hasError && (
        <picture className="contents">
          <source
            type="image/avif"
            srcSet={buildAvifSrcSet(item.imageUrl)}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
          />
          <img
            src={item.imageUrl}
            srcSet={buildSrcSet(item.imageUrl)}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
            alt={`${item.name} served at Foogle Cafe, Panchwati, Udaipur`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'scale-100' : 'scale-[1.01]'
            }`}
          />
        </picture>
      )}

      {/* 2. Seamless Vector Artwork Fallback / Loading Shimmer */}
      {(!imageLoaded || hasError || !item.imageUrl) && (
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={item.name}
        >
          <defs>
            <linearGradient id={`bg-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#251F1B" />
              <stop offset="100%" stopColor="#171310" />
            </linearGradient>
            <radialGradient id={`warmGlow-${item.id}`} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor={item.accentColor || '#FBBC05'} stopOpacity="0.22" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="400" height="300" fill={`url(#bg-${item.id})`} />
          <rect width="400" height="300" fill={`url(#warmGlow-${item.id})`} />
          {renderDishIllustrationFallback()}
        </svg>
      )}

      {/* 3. Subtle Bottom Vignette / Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 4. Natural Tabletop Brand Card "FOOGLE" */}
      {showBrandCard && (
        <TabletopBrandCard
          placement={item.tabletopCardPlacement || 'bottom-right'}
          size="sm"
          theme="cream"
        />
      )}

      {/* 5. Category Indicator Tag with Google Brand Color Accent */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-[10px] font-semibold text-white/95 shadow-sm">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: item.accentColor || 'var(--color-brand-primary)' }}
          aria-hidden="true"
        />
        <span>{item.categoryLabel}</span>
      </div>
    </div>
  );
};
