import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SurfaceCard } from '../common/SurfaceCard';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { Phone, Mail, Instagram, Clock, MapPin, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact, operatingHours, location } = FOOGLE_BUSINESS_INFO;

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
            description="Planning a visit or have a question? Get in touch with Foogle."
            titleLevel="h2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Channels & Verified Presence (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <SurfaceCard elevation="flat" className="p-6 sm:p-8 space-y-6 border flex-1">
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  Hospitality &amp; Inquiries
                </h3>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  We are preparing official direct communication channels for Foogle in Panchwati.
                  Below is the verified contact status for the restaurant.
                </p>
              </div>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telephone Channel */}
                <div
                  className="p-4 rounded-xl border flex items-start gap-3.5"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{
                      backgroundColor: 'var(--color-brand-surface-tint)',
                      color: 'var(--color-brand-primary)',
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                      Telephone
                    </span>
                    {contact.phone ? (
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-xs font-medium hover:underline block truncate text-emerald-600 dark:text-emerald-400"
                      >
                        {contact.phone}
                      </a>
                    ) : (
                      <span className="text-[11px] block text-amber-600 dark:text-amber-400 font-medium">
                        Direct line awaiting owner confirmation
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Channel */}
                <div
                  className="p-4 rounded-xl border flex items-start gap-3.5"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{
                      backgroundColor: 'var(--color-accent-blue-subtle)',
                      color: 'var(--color-accent-blue)',
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                      Email Inquiries
                    </span>
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs font-medium hover:underline block truncate text-blue-600 dark:text-blue-400"
                      >
                        {contact.email}
                      </a>
                    ) : (
                      <span className="text-[11px] block text-amber-600 dark:text-amber-400 font-medium">
                        Official inbox awaiting owner confirmation
                      </span>
                    )}
                  </div>
                </div>

                {/* Social / Instagram */}
                <div
                  className="p-4 rounded-xl border flex items-start gap-3.5"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{
                      backgroundColor: 'var(--color-accent-red-subtle)',
                      color: 'var(--color-accent-red)',
                    }}
                  >
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                      Social Presence
                    </span>
                    {contact.instagram ? (
                      <a
                        href={`https://instagram.com/${contact.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium hover:underline block truncate"
                        style={{ color: 'var(--color-accent-red)' }}
                      >
                        @{contact.instagram}
                      </a>
                    ) : (
                      <span className="text-[11px] block text-amber-600 dark:text-amber-400 font-medium">
                        Social handles pending verification
                      </span>
                    )}
                  </div>
                </div>

                {/* Walk-in Dining */}
                <div
                  className="p-4 rounded-xl border flex items-start gap-3.5"
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{
                      backgroundColor: 'var(--color-accent-green-subtle)',
                      color: 'var(--color-accent-green)',
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                      Walk-ins
                    </span>
                    <span className="text-[11px] block" style={{ color: 'var(--color-text-secondary)' }}>
                      Always welcome in Panchwati, Udaipur
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirmed Map Destination Button */}
              <div className="pt-2">
                <a
                  href={location.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold text-sm px-5 py-3 rounded-[var(--radius-md)] transition-colors focus-visible:outline-2 w-full gap-2"
                  style={{
                    backgroundColor: 'var(--color-btn-primary-bg)',
                    color: 'var(--color-btn-primary-text)',
                  }}
                >
                  <span>Open Foogle on Google Maps</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>
              </div>
            </SurfaceCard>
          </div>

          {/* Right Column: Operating Hours Card (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col">
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
                      Service Hours
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
                        className="font-medium"
                        style={{
                          color: item.hours
                            ? 'var(--color-text-primary)'
                            : 'var(--color-text-tertiary)',
                        }}
                      >
                        {item.hours ? item.hours : 'Seasonal Hours TBA'}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {operatingHours.statusNote}
                </p>
              </div>

              <div
                className="p-3 rounded-lg border text-[11px] flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-accent-green)' }} />
                <span>Visit us in Panchwati, Udaipur for current service status.</span>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Container>
    </section>
  );
};
