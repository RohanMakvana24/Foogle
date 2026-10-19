import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SurfaceCard } from '../common/SurfaceCard';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { MessageSquareHeart, ExternalLink, Star, Quote } from 'lucide-react';
import { MarqueeDemo } from '@/components/ui/marquee-01';

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-main-heading"
      className="py-16 sm:py-24 border-t transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="GUEST FEEDBACK &amp; COMMUNITY"
            title="What People Are Saying"
            description="Real experiences and impressions from visitors, diners, and our growing digital community."
            titleLevel="h2"
          />
        </div>

        {/* Dynamic Infinite Marquee Stream (marquee-01) */}
        <div className="mb-12 overflow-hidden rounded-2xl border bg-surface/50 p-2 sm:p-4 backdrop-blur-sm"
          style={{
            borderColor: 'var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-surface)',
          }}
        >
          <div className="px-4 py-2 flex items-center justify-between border-b mb-2"
            style={{ borderColor: 'var(--color-border-subtle)' }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Quote className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Live Testimonial Stream</span>
            </div>
            <span className="text-[11px] font-medium hidden sm:inline"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Hover to pause · Continuous loop
            </span>
          </div>

          <MarqueeDemo />
        </div>

        {/* Polished, Trustworthy Review Destination Card */}
        <SurfaceCard
          elevation="elevated"
          className="p-8 sm:p-12 border relative overflow-hidden"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-surface)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Visual Icon & Community Message (Cols 1-8) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--color-brand-surface-tint)',
                    color: 'var(--color-brand-primary)',
                  }}
                >
                  <MessageSquareHeart className="w-6 h-6" />
                </div>

                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Community Experiences on Google
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex items-center text-amber-400" aria-hidden="true">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Verified Public Reviews
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                We believe genuine recommendations speak for themselves. In accordance with our authenticity
                standards, we do not curate or fabricate customer testimonials here. Explore genuine diner
                impressions, photos, and ratings directly on our verified Google profile.
              </p>

              {/* Guest Mention Food Photography Thumbnails */}
              <div className="pt-2">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider block mb-2.5"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  Popular Dishes Mentioned by Diners
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      name: 'Woodfired Pizza',
                      tag: 'Crisp Crust',
                      img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&auto=format&fit=crop&q=80',
                    },
                    {
                      name: 'Sizzling Brownie',
                      tag: 'Hot Fudge',
                      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80',
                    },
                    {
                      name: 'Alfredo Pasta',
                      tag: 'Rich Cream',
                      img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300&auto=format&fit=crop&q=80',
                    },
                    {
                      name: 'Cold Foam Latte',
                      tag: 'Specialty Brew',
                      img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300&auto=format&fit=crop&q=80',
                    },
                  ].map((dish, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-2.5 p-2 rounded-xl border transition-all hover:shadow-sm"
                      style={{
                        backgroundColor: 'var(--color-bg-page)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-black/10">
                        <img
                          src={dish.img}
                          alt={dish.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className="text-xs font-bold block truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {dish.name}
                        </span>
                        <span
                          className="text-[10px] block truncate font-medium"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {dish.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-center gap-2 text-xs font-medium pt-1"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <span>Foogle Cafe &amp; Restaurant</span>
                <span aria-hidden="true">·</span>
                <span>Panchwati, Udaipur</span>
                <span aria-hidden="true">·</span>
                <span>Public Feedback Platform</span>
              </div>
            </div>

            {/* Right Column: Verified Action CTA Button (Cols 9-12) */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <a
                href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold text-sm px-6 py-3.5 rounded-[var(--radius-md)] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 w-full sm:w-auto"
                style={{
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'var(--color-btn-primary-text)',
                }}
              >
                <span>Read Google Reviews</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>

              <span className="text-[11px] mt-2 block" style={{ color: 'var(--color-text-tertiary)' }}>
                Opens verified listing in a new tab
              </span>
            </div>
          </div>
        </SurfaceCard>
      </Container>
    </section>
  );
};
