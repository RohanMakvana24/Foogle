import React from 'react';
import { FoodDoodleLogo } from './FoodDoodleLogo';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'animated-doodle' | 'badge-image' | 'classic';
  className?: string;
  onClick?: () => void;
}

/**
 * Foogle Brand Logo Lockup
 * - 'animated-doodle' (default): Custom animated vector food-letters inspired by the authentic
 *   Foogle cafe emblem (Fork, Tomato, Pizza, Coffee Cup, Ice Cream Cone, Croissant + Tagline Ribbon).
 * - 'badge-image': Displays the official high-resolution restaurant emblem PNG.
 * - 'classic': Original minimal culinary emblem with 4 accent pips.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  variant = 'animated-doodle',
  className = '',
  onClick,
}) => {
  // 1. Official Badge Image
  if (variant === 'badge-image') {
    const imgHeight = {
      sm: 'h-8',
      md: 'h-11',
      lg: 'h-14',
      xl: 'h-18',
    }[size];

    return (
      <div
        className={`inline-flex items-center select-none cursor-pointer group ${className}`}
        onClick={onClick}
        aria-label="Foogle Cafe & Restaurant"
      >
        <img
          src="/assets/aistudio/image_0f6dabd4.png"
          alt="Foogle Cafe Official Logo"
          className={`${imgHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  // 2. Animated Food-Doodle Logo (Default)
  if (variant === 'animated-doodle') {
    return (
      <FoodDoodleLogo
        size={size}
        showTagline={showSubtitle}
        animated={true}
        className={className}
        onClick={onClick}
      />
    );
  }

  // 3. Classic Minimalist Fallback
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
    xl: {
      mark: 'w-12 h-12',
      text: 'text-4xl',
      sub: 'text-sm',
      gap: 'gap-3.5',
      dot: 'w-2.5 h-2.5',
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center ${sizeClasses.gap} select-none ${className}`}
      onClick={onClick}
      aria-label="Foogle Cafe and Restaurant"
    >
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
          <path d="M4 17h16" />
          <path d="M12 5v2" />
          <path d="M5 17c0-4 3-7 7-7s7 3 7 7" />
          <path d="M9 17v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1" />
        </svg>
      </div>

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

export default BrandLogo;
