import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

/**
 * Reusable Foogle Button Component.
 * Implements accessible focus rings, single-line text discipline,
 * touch-target compliance (>=40px), and semantic design tokens.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-1.5 rounded-[var(--radius-sm)]',
    md: 'text-sm font-semibold px-5 py-2.5 min-h-[44px] gap-2 rounded-[var(--radius-md)]',
    lg: 'text-base font-semibold px-6 py-3.5 min-h-[48px] gap-2.5 rounded-[var(--radius-md)]',
  }[size];

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-btn-primary-bg)',
          color: 'var(--color-btn-primary-text)',
          border: '1px solid transparent',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-btn-secondary-bg)',
          color: 'var(--color-btn-secondary-text)',
          border: '1px solid var(--color-btn-secondary-border)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--color-accent-green)',
          color: '#FFFFFF',
          border: '1px solid transparent',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid transparent',
        };
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium
        whitespace-nowrap shrink-0 select-none
        transition-all duration-150 cursor-pointer
        hover:opacity-95 active:scale-[0.98]
        focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${sizeStyles}
        ${className}
      `}
      style={getVariantStyles()}
      {...rest}
    >
      {iconLeft && <span className="shrink-0 flex items-center">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
    </button>
  );
};
