import React, { useEffect, useRef } from 'react';
import { GalleryItem } from '../../types/gallery';
import { GalleryVisual } from './GalleryVisual';
import { X } from 'lucide-react';

export interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ item, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation: Escape key closes lightbox
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      // Focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} enlarged view`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-md bg-black/80 animate-hero-fade-rise"
      onClick={onClose}
    >
      {/* Lightbox Dialog Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header bar with title and close button */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{
            borderColor: 'var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-surface)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.accentColor }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              {item.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image lightbox"
            className="p-2 rounded-lg transition-colors cursor-pointer border focus-visible:outline-2"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/10">
          <GalleryVisual item={item} />
        </div>

        {/* Bottom Details Bar */}
        <div
          className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              {item.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Commercial Cafe Photoshoot
            </span>
            <span className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
              {item.tabletopMaterial || 'Travertine & Dark Oak Tabletop'} · Panchwati, Udaipur
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
