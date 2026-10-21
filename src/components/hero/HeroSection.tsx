import React from 'react';
import { Container } from '../common/Container';
import { HeroCharacterShowcase } from './HeroCharacterShowcase';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
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
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden py-14 sm:py-20 lg:py-24"
      style={{
        backgroundColor: '#C51E28', // Exact matching rich red from the video
      }}
    >
      {/* 1. Full-Size Mouse-Scrubbed 3D Cartoon Character (No box, no border, full size) */}
      <HeroCharacterShowcase />

      {/* 2. Soft Gradient Vignette on Left for Crisp Text Readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/55 sm:via-black/20 lg:from-black/40"
        aria-hidden="true"
      />

      {/* 3. Hero Content Container on the Left */}
      <Container className="relative z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl flex flex-col items-start animate-hero-fade-rise">
          {/* Brand Eyebrow with Four Google Accent Pips */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border mb-6 select-none shadow-md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4285F4' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EA4335' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FBBC05' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34A853' }} />
            </div>

            <span className="text-xs font-bold tracking-wider uppercase text-white/95">
              FOOGLE • CAFE &amp; GOOD FOOD
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1
            id="hero-main-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-white drop-shadow-sm"
            style={{
              textWrap: 'balance',
              letterSpacing: '-0.035em',
            }}
          >
            Good Food.
            <br />
            <span
              className="relative inline-block text-amber-200"
            >
              Great Moods.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl text-white/90 font-medium drop-shadow-xs"
            style={{
              textWrap: 'pretty',
            }}
          >
            Discover your next favourite bite at Foogle, where comforting classics meet
            exciting cafe flavours in the heart of Udaipur.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => scrollToAnchor('#menu')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-zinc-950 font-bold text-sm sm:text-base hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToAnchor('#contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-md border border-white/30 text-white font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Find Us</span>
            </button>
          </div>

          {/* Curated Culinary Quality Highlights */}
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-8 mt-8 border-t border-white/20 text-xs font-medium w-full text-white/80"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Woodfired Artisan Crusts</span>
            </div>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>Handcrafted Espresso &amp; Beverages</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>Panchwati, Udaipur</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
