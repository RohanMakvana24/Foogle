import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b backdrop-blur-md ${
        isScrolled ? 'shadow-sm' : ''
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

            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => handleNavClick('#menu')}
            >
              Explore Menu
            </Button>
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

      {/* Mobile Navigation Drawer / Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 top-18 z-40 md:hidden flex flex-col justify-between p-6 transition-all duration-200"
          style={{
            backgroundColor: 'var(--color-bg-page)',
          }}
        >
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-2 pt-2">
            <span
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Navigation
            </span>

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
                  className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-semibold border transition-all focus-visible:outline-2 ${
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
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </a>
              );
            })}
          </div>

          {/* Mobile Bottom Action Strip */}
          <div className="pt-6 border-t space-y-4" style={{ borderColor: 'var(--color-border)' }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth={true}
              iconRight={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => handleNavClick('#menu')}
            >
              Explore Full Menu
            </Button>

            <div
              className="flex items-center justify-center gap-2 text-xs font-medium"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <span>Panchwati, Udaipur</span>
              <span aria-hidden="true">·</span>
              <span>Rajasthan, India</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
