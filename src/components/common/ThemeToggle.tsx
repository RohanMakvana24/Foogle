import React from 'react';
import { AnimatedThemeToggle } from '../../../components/ui/animated-theme-toggle';

export interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
}) => {
  return <AnimatedThemeToggle className={className} />;
};

export default ThemeToggle;
