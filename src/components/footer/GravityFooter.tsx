'use client';

import React, { useRef } from 'react';
import { GravityLetters, GravityLettersRef } from '@/components/ui/GravityLetters';
import { useTheme } from '../../context/ThemeContext';
import { ArrowUp, Scissors, Sparkles, RefreshCw } from 'lucide-react';


export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Menu', href: '#menu' },
      { label: 'Signature Dishes', href: '#signatures' },
      { label: 'Our Story', href: '#story' },
      { label: 'Photo Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Customer Reviews', href: '#reviews' },
      { label: 'Find Us in Panchwati', href: '#contact' },
      { label: 'Table Reservations', href: '#contact' },
      { label: 'Dine-in Hours', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: '+91 294 242 0000', href: 'tel:+912942420000' },
      { label: 'hello@fooglecafe.com', href: 'mailto:hello@fooglecafe.com' },
      { label: 'Panchwati, Udaipur', href: '#contact' },
      { label: 'Instagram @fooglecafe', href: 'https://instagram.com' },
    ],
  },
];

export const GravityFooter: React.FC = () => {
  const { theme } = useTheme();
  const gravityRef = useRef<GravityLettersRef>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManualCollapse = () => {
    gravityRef.current?.collapse(0.5, 0.4);
  };

  const handleManualRebuild = () => {
    gravityRef.current?.rebuild();
  };

  const isDark = theme === 'dark';

  return (
    <footer
      className="relative w-full overflow-hidden border-t select-none transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#090D0B' : '#FAF8F5',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 59, 43, 0.12)',
        color: isDark ? '#EAF0EC' : '#183B2B',
      }}
    >
      {/* 1. Top Section: Studio Branding & Tracked Link Columns */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(24, 59, 43, 0.05)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(24, 59, 43, 0.15)',
              }}
            >
              <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span>Foogle Cafe &amp; Restaurant</span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: isDark ? 'rgba(234, 240, 236, 0.72)' : 'rgba(24, 59, 43, 0.75)' }}
            >
              Comforting cafe flavours, handcrafted espresso, and woodfired artisan treats in the heart of Panchwati, Udaipur.
            </p>

            <span className="text-xs font-mono opacity-50 tracking-wider">
              ©2026 · Panchwati, Udaipur, Rajasthan
            </span>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {DEFAULT_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-45 font-mono">
                  {col.title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href || '#'}
                        className="transition-all duration-200 hover:opacity-100 hover:translate-x-1 inline-block"
                        style={{
                          opacity: 0.78,
                          color: 'inherit',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls & Interactive Slicing Hint */}
        <div
          className="mt-12 pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 59, 43, 0.08)' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-medium"
              style={{
                backgroundColor: isDark ? 'rgba(72, 191, 103, 0.12)' : 'rgba(24, 59, 43, 0.08)',
                color: isDark ? '#48BF67' : '#183B2B',
              }}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Slice through letters to cut</span>
            </span>

            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-medium"
              style={{
                backgroundColor: isDark ? 'rgba(251, 188, 5, 0.12)' : 'rgba(217, 119, 6, 0.08)',
                color: isDark ? '#FBBC05' : '#B45309',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click to shatter &amp; pour back</span>
            </span>

            <button
              type="button"
              onClick={handleManualCollapse}
              title="Crumble headline"
              className="px-2.5 py-1 rounded-md border text-[11px] font-sans transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-70 hover:opacity-100"
              style={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(24, 59, 43, 0.2)',
              }}
            >
              Crumble
            </button>

            <button
              type="button"
              onClick={handleManualRebuild}
              title="Rebuild headline"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-sans transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-70 hover:opacity-100"
              style={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(24, 59, 43, 0.2)',
              }}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Rebuild</span>
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(24, 59, 43, 0.06)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(24, 59, 43, 0.16)',
            }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Headline of Glyph Sand you can slice: GRAVITY LETTERS */}
      <div className="w-full relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px] xl:h-[680px] overflow-hidden mt-4">
        <GravityLetters
          ref={gravityRef}
          text="FOOGLE"
          fontSize={380}
          fontWeight={900}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
          colors={
            isDark
              ? ['#FFFFFF', '#48BF67']
              : ['#183B2B', '#E09F3E']
          }
          grain="glyph"
          grainSize={7}
          grainScale={1.15}
          gravity={1.15}
          anchor="bottom"
          cut={true}
          cutWidth={18}
          throwForce={1.35}
          clickToCollapse={true}
          collapseSpeed={1500}
          erosion={0.06}
          healDelay={1.8}
          holdTime={0.9}
          rebuild="sweep"
          rebuildDuration={0.7}
          className="w-full h-full"
        />
      </div>
    </footer>
  );
};

export default GravityFooter;
