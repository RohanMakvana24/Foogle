import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import StarBorder from '@/components/ui/StarBorder';
import { Container } from '../common/Container';
import { Menu as MenuIcon, X, ArrowUpRight, MapPin, Clock, Phone } from 'lucide-react';


export interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'menu', label: 'Menu', href: '#menu' },
  { id: 'story', label: 'Our Story', href: '#story' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect scroll state for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'menu', 'story', 'gallery', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 border-b backdrop-blur-md ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
        }`}
        style={{
          backgroundColor: 'var(--color-nav-bg)',
          borderColor: isScrolled ? 'var(--color-border)' : 'var(--color-border-subtle)',
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
            {/* Zone 1: Wordmark */}
            <a
              href="#home"
              className="flex items-center shrink-0 focus-visible:outline-2 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
            >
              <BrandLogo size="md" />
            </a>

            {/* Zone 2: Desktop Navigation Links (Clean, unboxed typography with active state indicator) */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-7 text-sm font-medium"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative py-1.5 transition-colors whitespace-nowrap focus-visible:outline-2 rounded ${
                      isActive
                        ? 'font-bold'
                        : 'hover:text-[var(--color-brand-primary)]'
                    }`}
                    style={{
                      color: isActive
                        ? 'var(--color-brand-primary)'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all"
                        style={{ backgroundColor: 'var(--color-brand-primary)' }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Theme Toggle + Explore Menu CTA) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <ThemeToggle showLabel={false} />

              <StarBorder
                as="button"
                color="#ffffff"
                trailColor="#ffffff"
                duration={4}
                direction="clockwise"
                stars={1}
                trailLength={0.3}
                thickness={1}
                radius={12}
                glow={0.6}
                hover="lap"
                sparkle={false}
                clickPulse
                theme="dark"
                backgroundColor="var(--color-btn-primary-bg)"
                textColor="var(--color-btn-primary-text)"
                onClick={() => handleNavClick('#menu')}
                className="px-4 py-2 text-xs font-semibold cursor-pointer shadow-sm"
              >
                <span>Explore Menu</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </StarBorder>
            </div>

            {/* Mobile Right Bar: Mobile Theme Toggle + Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle showLabel={false} />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors cursor-pointer focus-visible:outline-2"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer & Backdrop (Rendered as SIBLING of header so not constrained by backdrop-filter) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Dim Overlay */}
          <div
            className="fixed inset-0 top-[72px] bg-black/60 z-40 md:hidden transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Solid Opaque Drawer Panel */}
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-x-0 top-[72px] bottom-0 z-50 md:hidden flex flex-col justify-between p-5 sm:p-6 overflow-y-auto border-t shadow-2xl transition-all duration-200 bg-[#FAF8F5] dark:bg-[#0E1411]"
            style={{
              backgroundColor: 'var(--color-bg-page)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-center justify-between mb-1 px-1">
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  Navigation
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">Foogle Cafe · Udaipur</span>
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-semibold border transition-all active:scale-[0.99] focus-visible:outline-2 shadow-2xs ${
                      isActive ? 'ring-1' : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? 'var(--color-brand-surface-tint)'
                        : 'var(--color-bg-surface)',
                      borderColor: isActive
                        ? 'var(--color-brand-primary)'
                        : 'var(--color-border-subtle)',
                      color: isActive
                        ? 'var(--color-brand-primary)'
                        : 'var(--color-text-primary)',
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-transform ${
                          isActive ? 'bg-amber-500 scale-125' : 'bg-zinc-300 dark:bg-zinc-600'
                        }`}
                      />
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-amber-600 dark:text-amber-400 scale-110' : 'opacity-40'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile Bottom Action Strip */}
            <div className="pt-5 mt-4 border-t space-y-4 pb-8" style={{ borderColor: 'var(--color-border)' }}>
              <StarBorder
                as="button"
                color="#ffffff"
                trailColor="#ffffff"
                duration={4}
                direction="clockwise"
                stars={1}
                trailLength={0.3}
                thickness={1}
                radius={12}
                glow={0.6}
                hover="lap"
                sparkle={false}
                clickPulse
                theme="dark"
                backgroundColor="var(--color-btn-primary-bg)"
                textColor="var(--color-btn-primary-text)"
                onClick={() => handleNavClick('#menu')}
                className="w-full py-3.5 text-sm font-semibold cursor-pointer shadow-sm"
              >
                <span>Explore Full Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </StarBorder>

              {/* Quick Info & Direct Contact Card */}
              <div
                className="p-3.5 rounded-xl border flex flex-col gap-2.5 text-xs shadow-2xs"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">Panchwati, Udaipur, Rajasthan 313001</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Open Daily: 10 AM – 11 PM</span>
                  </div>
                  <a
                    href="tel:+919414162725"
                    className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
