import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable centered layout container ensuring consistent page gutters
 * and zero horizontal overflow across mobile (320px+), tablet, and desktop viewports.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const maxWidthClass = {
    narrow: 'max-w-3xl',
    default: 'max-w-[1200px]',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size];

  return (
    <Component
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
