import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleLevel?: 'h1' | 'h2' | 'h3';
}

/**
 * Standardized Section Heading conforming to Zero-Pill and Typographic Hierarchy rules:
 * - Quiet unboxed eyebrow kicker
 * - High-contrast display title with text-wrap: balance
 * - Balanced, comfortable line-height for body description
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  titleLevel: TitleTag = 'h2',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  const headingSize = {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight',
    h2: 'text-2xl sm:text-3xl font-bold tracking-tight',
    h3: 'text-xl sm:text-2xl font-bold tracking-tight',
  }[TitleTag];

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className="text-xs font-semibold tracking-wider uppercase select-none"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {eyebrow}
        </span>
      )}

      <TitleTag
        className={`${headingSize} leading-tight`}
        style={{
          color: 'var(--color-text-primary)',
          textWrap: 'balance',
        }}
      >
        {title}
      </TitleTag>

      {description && (
        <p
          className="text-sm sm:text-base leading-relaxed max-w-2xl"
          style={{
            color: 'var(--color-text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
