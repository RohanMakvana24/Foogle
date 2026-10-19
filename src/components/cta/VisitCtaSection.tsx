import React from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Utensils } from 'lucide-react';

export const VisitCtaSection: React.FC = () => {
  const scrollToMenu = () => {
    const menuElement = document.querySelector('#menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-labelledby="visit-cta-heading"
      className="py-16 sm:py-24 border-t relative overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-brand-surface-tint)',
        borderColor: 'var(--color-border)',
      }}
    >
      <Container size="narrow">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Eyebrow with 4 subtle accent pips */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm select-none"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-red)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-yellow)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-green)' }} />
            </div>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Panchwati, Udaipur
            </span>
          </div>

          {/* Heading */}
          <h2
            id="visit-cta-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
            style={{
              color: 'var(--color-text-primary)',
              textWrap: 'balance',
            }}
          >
            Your Next Favourite Bite Awaits
          </h2>

          {/* Supporting Text */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{
              color: 'var(--color-text-secondary)',
              textWrap: 'pretty',
            }}
          >
            Explore the menu and plan your next visit to Foogle. Fresh flavours, comforting cafe classics,
            and warm Rajasthan hospitality are waiting for you.
          </p>

          {/* Primary Action Button: Smooth scroll to #menu */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              iconRight={<Utensils className="w-4 h-4" />}
              onClick={scrollToMenu}
              className="shadow-md hover:shadow-lg"
            >
              Explore the Menu
            </Button>
          </div>

          {/* Quiet Note */}
          <span
            className="text-xs pt-4"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Foogle Cafe &amp; Restaurant · Dine-in &amp; Takeaway in Panchwati, Udaipur
          </span>
        </div>
      </Container>
    </section>
  );
};
