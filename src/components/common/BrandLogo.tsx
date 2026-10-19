import React from 'react';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Original Foogle Brand Wordmark & Emblem.
 * Designed for Foogle Cafe & Restaurant, Panchwati, Udaipur.
 * Features an original culinary emblem with four subtle Google-inspired accent dots
 * anchored in a rich forest-green typographic lockup.
 * Implementation is fully modular and replaceable.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      mark: 'w-6 h-6',
      text: 'text-lg',
      sub: 'text-[9px]',
      gap: 'gap-2',
      dot: 'w-1 h-1',
    },
    md: {
      mark: 'w-8 h-8',
      text: 'text-2xl',
      sub: 'text-[10px]',
      gap: 'gap-2.5',
      dot: 'w-1.5 h-1.5',
    },
    lg: {
      mark: 'w-10 h-10',
      text: 'text-3xl',
      sub: 'text-xs',
      gap: 'gap-3',
      dot: 'w-2 h-2',
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center ${sizeClasses.gap} select-none ${className}`}
      aria-label="Foogle Cafe and Restaurant"
    >
      {/* Original Culinary Emblem: Minimalist geometric plate & cloche with four accent pips */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-lg ${sizeClasses.mark}`}
        style={{
          background: 'var(--color-brand-primary)',
          color: '#FAF8F5',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4/5 h-4/5"
        >
          {/* Subtle cloche / dome representing culinary hospitality */}
          <path d="M4 17h16" />
          <path d="M12 5v2" />
          <path d="M5 17c0-4 3-7 7-7s7 3 7 7" />
          <path d="M9 17v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1" />
        </svg>
      </div>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight ${sizeClasses.text}`}
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            Foogle
          </span>

          {/* Four Google-inspired discreet accent pips (Blue, Red, Yellow, Green) */}
          <span className="inline-flex items-center gap-0.5 ml-0.5" aria-hidden="true">
            <span
              className={`rounded-full ${sizeClasses.dot}`}
              style={{ backgroundColor: 'var(--color-accent-blue)' }}
            />
            <span
              className={`rounded-full ${sizeClasses.dot}`}
              style={{ backgroundColor: 'var(--color-accent-red)' }}
            />
            <span
              className={`rounded-full ${sizeClasses.dot}`}
              style={{ backgroundColor: 'var(--color-accent-yellow)' }}
            />
            <span
              className={`rounded-full ${sizeClasses.dot}`}
              style={{ backgroundColor: 'var(--color-accent-green)' }}
            />
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-semibold tracking-wider uppercase mt-1 ${sizeClasses.sub}`}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Cafe &amp; Restaurant · Udaipur
          </span>
        )}
      </div>
    </div>
  );
};
