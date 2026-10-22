/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import { GravityFooter } from './components/footer/GravityFooter';

function FoogleWebsite() {

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

        {/* Phase 5: Location Information */}
        <LocationSection />

        {/* Phase 5: Contact Channels & Service Hours (Anchor #contact) */}
        <ContactSection />

        {/* Phase 5: Final Call to Action (Scroll to #menu) */}
        <VisitCtaSection />
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
