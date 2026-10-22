import React, { useState } from 'react';
import { Container } from '../common/Container';
import { HeroBurger3D } from './HeroBurger3D';
import { ArrowRight, MapPin, Sparkles, Flame, Star, ShieldCheck, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [modelReady, setModelReady] = useState(false);

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
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden py-12 lg:py-16 bg-[#0c1310] text-white"
    >
      {/* 1. Dramatic Dark Ambient Gradients & Atmospheric Glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full blur-[140px] opacity-35"
        style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-20 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full blur-[160px] opacity-40"
        style={{ background: 'radial-gradient(circle, #E65100 0%, #B71C1C 40%, transparent 75%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 w-[500px] h-48 rounded-full blur-[120px] opacity-20"
        style={{ background: '#F59E0B' }}
        aria-hidden="true"
      />

      {/* Subtle Grid Accent Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* =========================================
              LEFT COLUMN: Editorial Typography & Actions
             ========================================= */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Eyebrow with Google Colors and Live Status */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl mb-6 shadow-xl select-none">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: '#4285F4' }} />
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: '#EA4335' }} />
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: '#FBBC05' }} />
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: '#34A853' }} />
              </div>

              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                FOOGLE • PANCHWATI, UDAIPUR
              </span>

              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Kitchen Open
              </span>
            </div>

            {/* Main Editorial Hero Headline */}
            <h1
              id="hero-main-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white"
              style={{
                textWrap: 'balance',
                letterSpacing: '-0.04em',
              }}
            >
              Crafted Burgers.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
                Unmatched Taste.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl text-zinc-300 font-normal"
              style={{
                textWrap: 'pretty',
              }}
            >
              Step into Udaipur’s favourite culinary hotspot. From double-stacked smashed patties
              to hand-kneaded artisan crusts and craft brews — made with passion every single day.
            </p>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToAnchor('#menu')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-zinc-950 font-extrabold text-base transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-98 cursor-pointer overflow-hidden"
              >
                <span>Order / Explore Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToAnchor('#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-base backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer shadow-lg"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Visit Us in Udaipur</span>
              </button>
            </div>

            {/* Quick Metrics & Highlights Strip */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-10 border-t border-white/10 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                  4.9
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 ml-1 inline" />
                </span>
                <span className="text-xs text-zinc-400 font-medium mt-0.5">Over 1,200+ Reviews</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">100%</span>
                <span className="text-xs text-zinc-400 font-medium mt-0.5">Fresh Gourmet Ingredients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">#1</span>
                <span className="text-xs text-zinc-400 font-medium mt-0.5">Trending Cafe in Udaipur</span>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: Glass Card 3D Showcase
             ========================================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* The Main Showcase Glass Pedestal Card */}
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 overflow-hidden">
              
              {/* Internal Accent Glow */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30"
                style={{ background: '#F59E0B' }}
                aria-hidden="true"
              />

              {/* Floating Badge Top Left: Signature Double Stack */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-white shadow-lg select-none">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs">
                  🔥
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    Foogle Signature
                  </span>
                  <span className="text-xs font-bold text-white">
                    Monster Double Stack
                  </span>
                </div>
              </div>

              {/* Floating Badge Top Right: Freshness guarantee */}
              <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-xs font-semibold shadow-lg select-none">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Made to Order</span>
              </div>

              {/* The 3D Burger Canvas */}
              <div className="w-full">
                <HeroBurger3D onLoaded={() => setModelReady(true)} />
              </div>

              {/* Floating Bottom Card: Interactive details bar */}
              <div className="relative z-20 mt-1 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="font-medium text-white/90">Interactive 3D Model</span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/10">
                  <span>Drag to rotate 360°</span>
                </div>
              </div>

            </div>

            {/* Bottom floating micro badges */}
            <div className="flex items-center justify-center gap-3 mt-4 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Artisan Sesame Bun</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Flame Grilled Patty</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span>Secret Foogle Sauce</span>
              </span>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
