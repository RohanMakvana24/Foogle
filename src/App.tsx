/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { SignatureDishesSection } from './components/signature/SignatureDishesSection';
import { MenuSection } from './components/menu/MenuSection';
import { AboutSection } from './components/about/AboutSection';
import { GallerySection } from './components/gallery/GallerySection';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { LocationSection } from './components/location/LocationSection';
import { ContactSection } from './components/contact/ContactSection';
import { VisitCtaSection } from './components/cta/VisitCtaSection';
import { DesignSystemPreview } from './components/preview/DesignSystemPreview';
import { Container } from './components/common/Container';
import { Button } from './components/common/Button';
import { GravityFooter } from './components/footer/GravityFooter';
import { SocialProofSection } from './components/social/SocialProofSection';
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';


function FoogleWebsite() {
  const { theme } = useTheme();
  const [showDesignTokens, setShowDesignTokens] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-clip">
      {/* 1. Premium Fixed Navigation Bar */}
      <Navbar />

      {/* 2. Main Page Content (offset by fixed 72px navbar) */}
      <main className="flex-1 pt-[72px]">
        {/* Phase 2: Hero Section (Anchor #home) */}
        <HeroSection />

        {/* Phase 4: Signature Dishes Editorial Showcase */}
        <SignatureDishesSection />

        {/* Phase 3: Premium Digital Menu Section (Anchor #menu) */}
        <MenuSection />

        {/* Phase 5: About Section (Anchor #story) */}
        <AboutSection />

        {/* Phase 4: Premium Food & Cafe Gallery (Anchor #gallery) */}
        <GallerySection />

        {/* Phase 5: Customer Reviews Destination */}
        <ReviewsSection />

        {/* Hanging 3D Badges: Google Review, Instagram, Facebook, Twitter on suspension wire */}
        <SocialProofSection />

        {/* Phase 5: Location Information */}
        <LocationSection />

        {/* Phase 5: Contact Channels & Service Hours (Anchor #contact) */}
        <ContactSection />

        {/* Phase 5: Final Call to Action (Scroll to #menu) */}
        <VisitCtaSection />

        {/* Phase 1 Design System Inspector (Collapsible for Developer & Design Review) */}
        <section
          aria-labelledby="tokens-inspector-heading"
          className="py-10 border-t"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <Container>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--color-brand-primary)' }} />
                  <span
                    id="tokens-inspector-heading"
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--color-brand-primary)' }}
                  >
                    Foundation Inspector
                  </span>
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Phase 1 Design System &amp; Tokens Explorer
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  View color palettes, typography scale, single-elevation cards, and button matrices.
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDesignTokens(!showDesignTokens)}
                iconRight={
                  showDesignTokens ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )
                }
              >
                {showDesignTokens ? 'Hide Design Tokens' : 'Inspect Tokens'}
              </Button>
            </div>

            {showDesignTokens && (
              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <DesignSystemPreview />
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* 3. Gravity Letters Interactive Footer */}
      <GravityFooter />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FoogleWebsite />
    </ThemeProvider>
  );
}
