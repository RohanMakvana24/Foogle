import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SurfaceCard } from '../common/SurfaceCard';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section
      aria-labelledby="location-main-heading"
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
            eyebrow="LOCATION &amp; NEIGHBOURHOOD"
            title="Find Foogle"
            description="Conveniently situated in Panchwati, one of Udaipur's central dining and lifestyle hubs."
            titleLevel="h2"
          />
        </div>

        {/* 2-Column Responsive Layout: Information Card + Stylized Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Location Details & Verification Status (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <SurfaceCard elevation="flat" className="p-6 sm:p-8 space-y-6 border flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--color-brand-surface-tint)',
                      color: 'var(--color-brand-primary)',
                    }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      Panchwati Hub
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      Udaipur, Rajasthan, India
                    </p>
                  </div>
                </div>

                {/* Confirmed Details Strip */}
                <div
                  className="p-4 rounded-xl space-y-2 border"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Confirmed Area:
                    </span>
                    <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {FOOGLE_BUSINESS_INFO.location.area}, {FOOGLE_BUSINESS_INFO.location.city}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Region:
                    </span>
                    <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {FOOGLE_BUSINESS_INFO.location.state}, {FOOGLE_BUSINESS_INFO.location.country}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Detailed Street:
                    </span>
                    <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      Pending official owner confirmation
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Panchwati is easily accessible from major Udaipur landmarks and offers a relaxed cafe
                  ambience away from dense traffic. Use the live navigation button below to open the
                  confirmed search query on Google Maps.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold text-sm px-5 py-3 rounded-[var(--radius-md)] transition-colors focus-visible:outline-2 w-full gap-2"
                  style={{
                    backgroundColor: 'var(--color-btn-primary-bg)',
                    color: 'var(--color-btn-primary-text)',
                  }}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Live Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </SurfaceCard>
          </div>

          {/* Right Column: Stylized Map Frame Preview (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className="relative rounded-2xl overflow-hidden border shadow-md flex-1 min-h-[320px] flex flex-col justify-between p-6 select-none"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Stylized Vector Map Backdrop for Udaipur / Panchwati */}
              <svg
                viewBox="0 0 600 360"
                className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30 pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="map-water" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Lake / Water contour (Lake Pichola / Fateh Sagar aesthetic) */}
                <path d="M 0,40 Q 80,100 60,200 T 20,360 L 0,360 Z" fill="url(#map-water)" />
                <path d="M 520,0 Q 560,90 540,180 T 600,300 L 600,0 Z" fill="url(#map-water)" />

                {/* Road network grid */}
                <g stroke="#CBD5E1" strokeWidth="3" opacity="0.6" fill="none">
                  <path d="M 50,0 Q 150,150 250,180 T 550,220" />
                  <path d="M 200,0 L 200,360" />
                  <path d="M 350,0 L 350,360" strokeWidth="4" />
                  <path d="M 0,180 L 600,180" strokeWidth="4" />
                  <path d="M 100,280 L 500,280" />
                  <path d="M 120,80 L 480,80" />
                </g>

                {/* Concentric Neighbourhood Zone (Panchwati) */}
                <circle cx="350" cy="180" r="75" fill="#34A853" fillOpacity="0.12" stroke="#34A853" strokeWidth="1.5" strokeDasharray="4,4" />
                <circle cx="350" cy="180" r="25" fill="#34A853" fillOpacity="0.2" />
              </svg>

              {/* Map Top Floating Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold backdrop-blur-md"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Panchwati Zone · Udaipur</span>
                </div>

                <div className="flex items-center gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-red)' }} />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-yellow)' }} />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-green)' }} />
                </div>
              </div>

              {/* Map Center Marker Lockup */}
              <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-12 h-12 rounded-full border-2 shadow-lg flex items-center justify-center animate-subtle-float"
                  style={{
                    backgroundColor: 'var(--color-brand-primary)',
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                  }}
                >
                  <MapPin className="w-6 h-6" />
                </div>
                <div
                  className="mt-3 px-4 py-1.5 rounded-full border shadow-md backdrop-blur-md text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Foogle · Panchwati
                </div>
              </div>

              {/* Map Bottom Attribution Notice */}
              <div
                className="relative z-10 p-3 rounded-lg border text-[11px] backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span>Interactive map embed placeholder · Exact coordinates &amp; street number to be verified with restaurant management.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
