import React from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import StarBorder from '@/components/ui/StarBorder';
import Antigravity from '@/components/ui/Antigravity';
import { useTheme } from '../../context/ThemeContext';
import { HeroCulinaryShowcase } from './HeroCulinaryShowcase';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  const scrollToAnchor = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-main-heading"
      className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden"
    >
      {/* Background Interactive Antigravity Canvas */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: theme === 'dark' ? 0.75 : 0.6 }}
        aria-hidden="true"
      >
        <Antigravity
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          count={1500}
          magnetRadius={9}
          ringRadius={7}
          particleSize={0.9}
          autoAnimate={true}
          interactive={true}
          clickBurst={true}
          lightMode={theme !== 'dark'}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text Content & CTAs (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 animate-hero-fade-rise">
            {/* Brand Eyebrow with Four Accent Pips */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 select-none"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Four Google-inspired subtle accent dots */}
              <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-red)' }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-yellow)' }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-green)' }} />
              </div>

              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                FOOGLE • CAFE &amp; GOOD FOOD
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-main-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
              style={{
                color: 'var(--color-text-primary)',
                textWrap: 'balance',
                letterSpacing: '-0.035em',
              }}
            >
              Good Food.
              <br />
              <span
                className="relative inline-block"
                style={{
                  color: 'var(--color-brand-primary)',
                }}
              >
                Great Moods.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl"
              style={{
                color: 'var(--color-text-secondary)',
                textWrap: 'pretty',
              }}
            >
              Discover your next favourite bite at Foogle, where comforting classics meet
              exciting cafe flavours in the heart of Udaipur.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
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
                onClick={() => scrollToAnchor('#menu')}
                className="shadow-md hover:shadow-lg transition-all cursor-pointer font-semibold"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </StarBorder>

              <Button
                variant="secondary"
                size="lg"
                iconLeft={<MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                onClick={() => scrollToAnchor('#contact')}
              >
                Find Us
              </Button>
            </div>

            {/* Curated Culinary Quality Highlights (Clean unboxed text, zero pills) */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-8 mt-8 border-t text-xs font-medium w-full"
              style={{
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-primary)' }} />
                <span>Woodfired Artisan Crusts</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Handcrafted Espresso &amp; Beverages</span>
              <span aria-hidden="true">·</span>
              <span>Panchwati, Udaipur</span>
            </div>
          </div>

          {/* Right Column: Layered Food Photography Composition (Cols 8-12) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <HeroCulinaryShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
};
