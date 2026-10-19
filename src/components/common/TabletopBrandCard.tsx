import React from 'react';

export interface TabletopBrandCardProps {
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'cream' | 'white' | 'slate';
  className?: string;
  showSubtitle?: boolean;
}

/**
 * TabletopBrandCard Component
 * Renders an authentic, realistic restaurant photoshoot tabletop brand tent-card.
 * Features:
 * - 3D angled paper fold with subtle specular highlight along the crease
 * - Soft ambient contact shadow on the table surface
 * - Exact typography "FOOGLE" with Google-inspired four-color accent dots
 * - Natural placement on the cafe table next to the dish, enhancing culinary authenticity
 */
export const TabletopBrandCard: React.FC<TabletopBrandCardProps> = ({
  placement = 'bottom-right',
  size = 'md',
  theme = 'cream',
  className = '',
  showSubtitle = true,
}) => {
  const placementClasses = {
    'bottom-right': 'bottom-3 right-3 sm:bottom-4 sm:right-4',
    'bottom-left': 'bottom-3 left-3 sm:bottom-4 sm:left-4',
    'top-right': 'top-3 right-3 sm:top-4 sm:right-4',
    'top-left': 'top-3 left-3 sm:top-4 sm:left-4',
  }[placement];

  // Perspective tilt based on corner placement for maximum realism
  const tiltStyles: Record<string, string> = {
    'bottom-right': 'rotate(-2.5deg) skewX(-1.5deg)',
    'bottom-left': 'rotate(3deg) skewX(2deg)',
    'top-right': 'rotate(-3deg) skewX(-2deg)',
    'top-left': 'rotate(2.5deg) skewX(1.5deg)',
  };

  const sizeScale = {
    sm: 'px-2.5 py-1.5 text-[10px]',
    md: 'px-3.5 py-2 text-xs',
    lg: 'px-4 py-2.5 text-sm',
  }[size];

  const bgStyle =
    theme === 'white'
      ? 'bg-[#FFFFFF] text-stone-900'
      : theme === 'slate'
      ? 'bg-[#1E293B] text-amber-50'
      : 'bg-[#FCF9F2] text-stone-900';

  return (
    <aside
      aria-label="Tabletop brand card with text FOOGLE"
      className={`absolute ${placementClasses} z-10 pointer-events-none select-none transition-transform duration-300 ${className}`}
      style={{
        transform: tiltStyles[placement],
        filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
      }}
    >
      {/* 3D Folded Tent Card Container */}
      <div
        className={`relative ${sizeScale} ${bgStyle} rounded-[3px] border border-stone-300/80 shadow-sm flex flex-col items-center justify-center`}
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.15)',
        }}
      >
        {/* Paper Tent Card Center Crease / Highlight */}
        <div
          className="absolute -top-[1px] left-0 right-0 h-[1.5px] bg-white/90 rounded-t"
          aria-hidden="true"
        />

        {/* Delicate Inner Border / Emboss */}
        <div className="flex flex-col items-center leading-none">
          {/* Brand Wordmark "FOOGLE" */}
          <div className="flex items-center gap-1">
            <span
              className="font-black tracking-[0.14em] text-stone-900"
              style={{
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.12em',
              }}
            >
              FOOGLE
            </span>
          </div>

          {/* Subtitle / Location */}
          {showSubtitle && (
            <div className="flex items-center gap-1 mt-0.5 text-[8px] sm:text-[9px] font-bold tracking-widest text-stone-500 uppercase">
              <span>Panchwati</span>
              <span className="inline-block w-1 h-1 rounded-full bg-stone-400" aria-hidden="true" />
              <span>Udaipur</span>
            </div>
          )}

          {/* 4 Brand Color Accent Pips */}
          <div className="flex items-center gap-1 mt-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
          </div>
        </div>

        {/* Ambient base shadow mimicking table contact */}
        <div
          className="absolute -bottom-1 left-2 right-2 h-1 bg-black/40 blur-[2px] -z-10 rounded-full"
          aria-hidden="true"
        />
      </div>
    </aside>
  );
};
