import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TabletopBrandCard } from '../common/TabletopBrandCard';
import { Sparkles, Utensils, HeartHandshake, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="story"
      aria-labelledby="about-main-heading"
      className="py-16 sm:py-24 border-t scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Cafe Dining Atmosphere Frame (Cols 1-6) */}
          <div className="lg:col-span-6 relative select-none">
            {/* Ambient Background Warmth */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 40% 50%, var(--color-brand-primary-light), var(--color-accent-yellow), transparent 75%)',
              }}
              aria-hidden="true"
            />

            {/* Visual Frame */}
            <div
              className="relative rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 hover:shadow-2xl bg-stone-900"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* Real Cafe Photography */}
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80"
                  alt="Foogle cafe dining space with warm ambiance and modern seating in Panchwati, Udaipur"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />

                {/* Subtle Bottom Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.15) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Tabletop Brand Card "FOOGLE" standing naturally on the cafe table */}
                <TabletopBrandCard
                  placement="bottom-right"
                  size="sm"
                  theme="cream"
                />

                {/* Subtle Image Tag */}
                <div className="absolute bottom-3 left-4 flex flex-col text-white/95 text-xs drop-shadow-md">
                  <span className="font-bold tracking-tight">
                    Panchwati Dining Space
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">
                    Udaipur, Rajasthan · Contemporary Cafe
                  </span>
                </div>
              </div>
            </div>

            {/* Small Floating Quality Pip Card */}
            <div
              className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 px-4 py-2.5 rounded-xl border shadow-lg backdrop-blur-md flex items-center gap-3 select-none"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--color-brand-surface-tint)',
                  color: 'var(--color-brand-primary)',
                }}
              >
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                  Warm Hospitality
                </span>
                <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>
                  A Relaxed Food Break
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy (Cols 7-12) */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <SectionHeading
              eyebrow="OUR STORY &amp; PHILOSOPHY"
              title="More Than Just a Food Stop"
              titleLevel="h2"
            />

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{
                color: 'var(--color-text-secondary)',
                textWrap: 'pretty',
              }}
            >
              Good food has a way of bringing people together. Foogle is a place to explore cafe favourites,
              enjoy a relaxed food break, and discover something delicious in Udaipur.
            </p>

            {/* 3 Core Experience Pillars (Clean unboxed text, no pills) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2">
              <div
                className="p-4 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{
                    backgroundColor: 'var(--color-accent-blue-subtle)',
                    color: 'var(--color-accent-blue)',
                  }}
                >
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Comforting Classics
                  </h3>
                  <p className="text-xs mt-1 leading-normal" style={{ color: 'var(--color-text-secondary)' }}>
                    Familiar cafe flavours made with care, quality ingredients, and generous portions.
                  </p>
                </div>
              </div>

              <div
                className="p-4 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{
                    backgroundColor: 'var(--color-accent-green-subtle)',
                    color: 'var(--color-accent-green)',
                  }}
                >
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Relaxed Cafe Pace
                  </h3>
                  <p className="text-xs mt-1 leading-normal" style={{ color: 'var(--color-text-secondary)' }}>
                    A welcoming neighborhood stop in Panchwati to catch up, unwind, or refuel.
                  </p>
                </div>
              </div>
            </div>

            {/* Four Google-inspired subtle accent bar */}
            <div className="flex items-center gap-1.5 pt-2" aria-hidden="true">
              <span className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
              <span className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent-red)' }} />
              <span className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent-yellow)' }} />
              <span className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent-green)' }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
