import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  className = '',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150 border focus-visible:outline-2 ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200" aria-hidden="true" />
        )}
      </span>
      {showLabel && (
        <span className="capitalize font-medium select-none">
          {theme} mode
        </span>
      )}
    </button>
  );
};
