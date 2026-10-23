import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { buildSrcSet } from '../../lib/imageSrcSet';

export interface MediaFrameProps {
  src?: string;
  alt: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2';
  placeholderTitle?: string;
  placeholderCategory?: string;
  className?: string;
}

/**
 * Reusable Media Frame enforcing:
 * - Fixed aspect ratios to eliminate layout shifts (CLS)
 * - Zero-broken-image resilience with elegant styled fallback
 * - Prepared for real culinary photography integration in future phases
 */
export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  aspectRatio = '4:3',
  placeholderTitle,
  placeholderCategory,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
  }[aspectRatio];

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[var(--radius-md)] border ${aspectClass} ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        borderColor: 'var(--color-border)',
      }}
    >
      {!showFallback ? (
        <img
          src={src}
          srcSet={buildSrcSet(src)}
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{
              backgroundColor: 'var(--color-brand-surface-tint)',
              color: 'var(--color-brand-primary)',
            }}
          >
            <Utensils className="w-5 h-5" aria-hidden="true" />
          </div>
          {placeholderCategory && (
            <span
              className="text-[11px] font-semibold tracking-wider uppercase mb-1"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              {placeholderCategory}
            </span>
          )}
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {placeholderTitle || alt}
          </span>
          <span
            className="text-xs mt-1"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Commercial Food Photography Asset ({aspectRatio}) · Foogle Studio
          </span>
        </div>
      )}
    </div>
  );
};
