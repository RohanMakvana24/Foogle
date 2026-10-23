import React, { useState } from 'react';
import { GalleryItem } from '../../types/gallery';
import { buildSrcSet, buildAvifSrcSet } from '../../lib/imageSrcSet';
import { TabletopBrandCard } from '../common/TabletopBrandCard';

export interface GalleryVisualProps {
  item: GalleryItem;
  className?: string;
  showBrandCard?: boolean;
}

export const GalleryVisual: React.FC<GalleryVisualProps> = ({
  item,
  className = '',
  showBrandCard = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const renderSvgFallback = () => {
    switch (item.id) {
      case 'gallery-woodfired-pizza':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-pizza-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251710" />
                <stop offset="100%" stopColor="#140C07" />
              </linearGradient>
              <radialGradient id="g-pizza-crust" cx="50%" cy="50%" r="50%">
                <stop offset="65%" stopColor="#E08B38" />
                <stop offset="88%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
            </defs>
            <rect width="600" height="450" fill="url(#g-pizza-bg)" />
            <circle cx="300" cy="225" r="195" fill="#58341D" />
            <circle cx="300" cy="225" r="190" fill="#4A2B17" />
            <circle cx="300" cy="225" r="170" fill="url(#g-pizza-crust)" />
            <circle cx="300" cy="225" r="145" fill="#B91C1C" />
            <g fill="#FEF3C7">
              <ellipse cx="260" cy="180" rx="36" ry="28" />
              <ellipse cx="350" cy="190" rx="34" ry="30" />
              <ellipse cx="250" cy="270" rx="38" ry="32" />
              <circle cx="300" cy="225" r="38" />
            </g>
            <g fill="#15803D">
              <path d="M 285,180 C 265,140 290,130 305,150 C 315,165 300,180 285,180 Z" />
              <path d="M 330,225 C 370,210 375,235 355,250 C 340,260 325,245 330,225 Z" />
            </g>
          </svg>
        );

      case 'gallery-specialty-latte':
        return (
          <svg viewBox="0 0 450 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-latte-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1915" />
                <stop offset="100%" stopColor="#100D0B" />
              </linearGradient>
            </defs>
            <rect width="450" height="600" fill="url(#g-latte-bg)" />
            <polygon points="150,120 300,120 275,500 175,500" fill="#78350F" />
            <ellipse cx="225" cy="120" rx="75" ry="15" fill="#FAF5ED" />
            <ellipse cx="225" cy="126" rx="66" ry="14" fill="#FFFFFF" />
            <path d="M 152,125 Q 225,145 298,125 L 293,175 Q 225,190 157,175 Z" fill="#FFFDF5" opacity="0.9" />
          </svg>
        );

      case 'gallery-sizzler-brownie':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-brownie-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#181411" />
                <stop offset="100%" stopColor="#0B0907" />
              </linearGradient>
            </defs>
            <rect width="500" height="500" fill="url(#g-brownie-bg)" />
            <ellipse cx="250" cy="275" rx="190" ry="115" fill="#1E293B" />
            <ellipse cx="250" cy="275" rx="175" ry="100" fill="#0F172A" />
            <rect x="180" y="210" width="140" height="85" rx="10" fill="#3E1A08" />
            <circle cx="250" cy="180" r="48" fill="#FFFDF5" />
          </svg>
        );

      case 'gallery-creamy-pasta':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-pasta-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#211B17" />
                <stop offset="100%" stopColor="#110E0C" />
              </linearGradient>
            </defs>
            <rect width="500" height="500" fill="url(#g-pasta-bg)" />
            <circle cx="250" cy="250" r="190" fill="#FAF5ED" />
            <circle cx="250" cy="250" r="130" fill="#FEF9C3" />
            <g stroke="#EAB308" strokeWidth="8" strokeLinecap="round" fill="none">
              <path d="M 190,210 Q 220,180 270,195" />
              <path d="M 180,260 Q 230,230 290,250" />
            </g>
          </svg>
        );

      case 'gallery-crisp-waffles':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-waffle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251D18" />
                <stop offset="100%" stopColor="#150E0A" />
              </linearGradient>
            </defs>
            <rect width="600" height="450" fill="url(#g-waffle-bg)" />
            <rect x="75" y="75" width="450" height="300" rx="24" fill="#FAF5ED" />
            <rect x="125" y="140" width="170" height="170" rx="14" fill="#D97706" />
            <rect x="305" y="140" width="170" height="170" rx="14" fill="#D97706" />
          </svg>
        );

      case 'gallery-cafe-nachos':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-nacho-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#221C16" />
                <stop offset="100%" stopColor="#120E09" />
              </linearGradient>
            </defs>
            <rect width="500" height="500" fill="url(#g-nacho-bg)" />
            <circle cx="250" cy="250" r="180" fill="#FAF5ED" />
            <circle cx="250" cy="250" r="60" fill="#DC2626" />
          </svg>
        );

      case 'gallery-espresso-pour':
      default:
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={item.alt}>
            <defs>
              <linearGradient id="g-espresso-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1611" />
                <stop offset="100%" stopColor="#0F0A07" />
              </linearGradient>
            </defs>
            <rect width="500" height="500" fill="url(#g-espresso-bg)" />
            <circle cx="250" cy="250" r="185" fill="#FAF5ED" />
            <circle cx="250" cy="250" r="115" fill="#1E293B" />
            <circle cx="250" cy="250" r="90" fill="#24140E" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-stone-900 ${className}`}>
      {/* 1. Real Cafe Photoshoot Photography */}
      {item.imageUrl && !hasError && (
        <picture className="contents">
          <source
            type="image/avif"
            srcSet={buildAvifSrcSet(item.imageUrl)}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
          />
          <img
            src={item.imageUrl}
            srcSet={buildSrcSet(item.imageUrl)}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
            alt={item.alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              imageLoaded ? 'scale-100' : 'scale-[1.01]'
            }`}
          />
        </picture>
      )}

      {/* 2. Resilient Vector Fallback / Loading Shimmer */}
      {(!imageLoaded || hasError || !item.imageUrl) && (
        <div className="absolute inset-0 w-full h-full">
          {renderSvgFallback()}
        </div>
      )}

      {/* 3. Subtle Lighting Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
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
    </div>
  );
};
