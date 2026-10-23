import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SurfaceCard } from '../common/SurfaceCard';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { LazyMount } from '../common/LazyMount';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

// MapLibre is ~700KB — load it only when the location section approaches the viewport.
const RotatingLocationMap = React.lazy(() => import('./RotatingLocationMap'));

export const LocationSection: React.FC = () => {
  return (
    <section
      id="location"
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

                  <div className="flex flex-col gap-1 text-xs pt-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Confirmed Address:
                    </span>
                    <span className="text-[11px] font-medium leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                      {FOOGLE_BUSINESS_INFO.location.fullStreetAddress}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Located opposite RK Mall and next to Gold's Gym behind Lord Shiv Temple in Panchwati, Foogle Café is easily accessible and offers relaxed cafe ambience. Use the live navigation button below to open directions.
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

          {/* Right Column: 360° Rotating 3D Location Map (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <LazyMount
              minHeight="460px"
              rootMargin="500px 0px"
              placeholder={
                <div
                  className="w-full min-h-[460px] rounded-2xl animate-pulse"
                  style={{ backgroundColor: 'rgba(127,127,127,0.12)' }}
                  aria-hidden="true"
                />
              }
            >
              <RotatingLocationMap />
            </LazyMount>
          </div>
        </div>
      </Container>
    </section>
  );
};
