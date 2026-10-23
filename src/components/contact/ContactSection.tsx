import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SurfaceCard } from '../common/SurfaceCard';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import {
  Phone,
  Mail,
  Instagram,
  Clock,
  MapPin,
  ExternalLink,
  Utensils,
  Wallet,
  Sparkles,
  Info,
  Navigation,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact, operatingHours, location, dining } = FOOGLE_BUSINESS_INFO;

  return (
    <section
      id="contact"
      aria-labelledby="contact-main-heading"
      className="py-16 sm:py-24 border-t scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title="Let's Make It a Foogle Day"
            description="Planning a visit or have a question? Get in touch with Foogle Café in Panchwati, Udaipur."
            titleLevel="h2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Channels & Verified Presence (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <SurfaceCard elevation="flat" className="p-6 sm:p-8 space-y-6 border flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                  style={{
                    backgroundColor: 'var(--color-brand-surface-tint)',
                    borderColor: 'var(--color-brand-primary)',
                    color: 'var(--color-brand-primary)',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hospitality &amp; Direct Connect</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  We’re Here to Welcome You
                </h3>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Planning a catch-up, late-night craving, or takeaway? Connect with Foogle Café in Panchwati directly through phone, email, or social channels.
                </p>
              </div>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telephone Channel */}
                <div
                  className="p-4 rounded-xl border flex flex-col justify-between gap-3 group transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{
                        backgroundColor: 'var(--color-brand-surface-tint)',
                        color: 'var(--color-brand-primary)',
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                        Phone / Call
                      </span>
                      <span className="text-xs font-semibold block text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                        {contact.phone}
                      </span>
                    </div>
                  </div>
                  <a
                    href={contact.phoneCallHref}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg text-white transition-transform active:scale-95"
                    style={{ backgroundColor: 'var(--color-brand-primary)' }}
                  >
                    <span>Call Now</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>

                {/* Email Channel */}
                <div
                  className="p-4 rounded-xl border flex flex-col justify-between gap-3 group transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{
                        backgroundColor: 'var(--color-accent-blue-subtle)',
                        color: 'var(--color-accent-blue)',
                      }}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                        Email Inquiries
                      </span>
                      <span className="text-xs font-semibold block text-blue-600 dark:text-blue-400 truncate mt-0.5" title={contact.email}>
                        {contact.email}
                      </span>
                    </div>
                  </div>
                  <a
                    href={contact.emailMailtoHref}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg text-white transition-transform active:scale-95 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Send Email</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>

                {/* Instagram Channel */}
                <div
                  className="p-4 rounded-xl border flex flex-col justify-between gap-3 group transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{
                        backgroundColor: 'var(--color-accent-red-subtle)',
                        color: 'var(--color-accent-red)',
                      }}
                    >
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                        Instagram
                      </span>
                      <span className="text-xs font-semibold block text-rose-500 truncate mt-0.5">
                        @{contact.instagram}
                      </span>
                    </div>
                  </div>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg text-white transition-transform active:scale-95 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                  >
                    <span>Visit Instagram</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>

                {/* Physical Location Card */}
                <div
                  className="p-4 rounded-xl border flex flex-col justify-between gap-3 group transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{
                        backgroundColor: 'var(--color-accent-green-subtle)',
                        color: 'var(--color-accent-green)',
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                        Panchwati Hub
                      </span>
                      <span className="text-xs font-medium block text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                        Opposite RK Mall
                      </span>
                    </div>
                  </div>
                  <a
                    href={location.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border transition-transform active:scale-95"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-500" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Full Address Banner */}
              <div
                className="p-4 rounded-xl border space-y-2"
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Confirmed Physical Address:
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {location.fullStreetAddress}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                  <span>Landmarks:</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">Behind Lord Shiv Temple</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">Opposite RK Mall</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">Next to Gold’s Gym</span>
                </div>
              </div>

              {/* Direct External Discovery Links */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold block" style={{ color: 'var(--color-text-tertiary)' }}>
                  Explore on Public Restaurant Listings:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={contact.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                      color: '#E23744',
                    }}
                  >
                    <span>Zomato</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={contact.tripadvisorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                      color: '#00AA6C',
                    }}
                  >
                    <span>Tripadvisor</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={contact.restaurantGuruUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span>Restaurant Guru</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={location.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:scale-105 text-blue-600 dark:text-blue-400"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </SurfaceCard>
          </div>

          {/* Right Column: Operating Hours & Dining Overview (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SurfaceCard elevation="flat" className="p-6 sm:p-8 space-y-6 border flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--color-brand-surface-tint)',
                      color: 'var(--color-brand-primary)',
                    }}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      Opening Hours
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      Panchwati Dining Schedule
                    </p>
                  </div>
                </div>

                {/* Schedule Table / Structure */}
                <div
                  className="p-4 rounded-xl border divide-y"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {operatingHours.schedule.map((item) => (
                    <div
                      key={item.day}
                      className="py-2.5 flex items-center justify-between text-xs first:pt-0 last:pb-0"
                      style={{ borderColor: 'var(--color-border-subtle)' }}
                    >
                      <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {item.day}
                      </span>
                      <span
                        className="font-bold text-emerald-600 dark:text-emerald-400"
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Transparency Note */}
                <div
                  className="p-3.5 rounded-xl border text-xs space-y-1.5"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 90%, transparent)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>Schedule Verification Note:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {operatingHours.statusNote}
                  </p>
                </div>
              </div>

              {/* Dining & Pricing Highlights */}
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <Wallet className="w-3.5 h-3.5 text-amber-500" />
                    Estimated Spend:
                  </span>
                  <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {dining.estimatedSpend}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                    Vegetarian Status:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {dining.dietary}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Dining Options:
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {dining.options}
                  </span>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Container>
    </section>
  );
};
