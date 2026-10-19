import React from 'react';

export interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'flat' | 'elevated';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  className?: string;
}

/**
 * Reusable SurfaceCard primitive.
 * Enforces single-elevation depth, hairline borders, and token-driven backgrounds.
 */
export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  elevation = 'flat',
  hoverable = false,
  padding = 'md',
  as: Component = 'div',
  className = '',
  ...rest
}) => {
  const paddingClass = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  return (
    <Component
      className={`
        rounded-[var(--radius-lg)] border transition-all duration-200
        ${paddingClass}
        ${hoverable ? 'hover:-translate-y-0.5 hover:shadow-md' : ''}
        ${className}
      `}
      style={{
        backgroundColor:
          elevation === 'elevated'
            ? 'var(--color-bg-elevated)'
            : 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)',
        boxShadow: elevation === 'elevated' ? 'var(--shadow-card)' : 'none',
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
