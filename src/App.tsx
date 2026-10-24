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
import { LocationSection } from './components/location/LocationSection';
import { ContactSection } from './components/contact/ContactSection';
import { VisitCtaSection } from './components/cta/VisitCtaSection';
import { GravityFooter } from './components/footer/GravityFooter';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { LazyMount } from './components/common/LazyMount';

// These sections contain the heaviest animation and media code.  Loading them
// shortly before they enter view keeps initial mobile scrolling responsive.
const GallerySection = React.lazy(() => import('./components/gallery/GallerySection'));
const ReviewsSection = React.lazy(() => import('./components/reviews/ReviewsSection'));

const DeferredSectionPlaceholder: React.FC<{ id: string; minHeight: string }> = ({ id, minHeight }) => (
  <section
    id={id}
    aria-busy="true"
    className="w-full"
    style={{ minHeight, backgroundColor: 'var(--color-bg-page)' }}
  />
);

function FoogleWebsite() {

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-clip">
      {/* 1. Premium Fixed Navigation Bar */}
      <Navbar />

      {/* 2. Main Page Content (offset by fixed 72px navbar) */}
      <main className="flex-1 pt-[72px]">
        {/* Phase 2: Hero Section (Anchor #home) — with integrated scroll-driven burger assembly */}
        <HeroSection />

        {/* Phase 4: Signature Dishes Editorial Showcase */}
        <SignatureDishesSection />

        {/* Phase 3: Premium Digital Menu Section (Anchor #menu) */}
        <MenuSection />

        {/* Phase 5: About Section (Anchor #story) */}
        <AboutSection />

        {/* Phase 4: Premium Food & Cafe Gallery (Anchor #gallery) */}
        <LazyMount
          minHeight="760px"
          rootMargin="900px 0px"
          placeholder={<DeferredSectionPlaceholder id="gallery" minHeight="760px" />}
        >
          <GallerySection />
        </LazyMount>

        {/* Phase 5: Customer Reviews Destination */}
        <LazyMount
          minHeight="620px"
          rootMargin="700px 0px"
          placeholder={<DeferredSectionPlaceholder id="reviews" minHeight="620px" />}
        >
          <ReviewsSection />
        </LazyMount>

        {/* Phase 5: Location Information */}
        <LocationSection />

        {/* Phase 5: Contact Channels & Service Hours (Anchor #contact) */}
        <ContactSection />

        {/* Phase 5: Final Call to Action (Scroll to #menu) */}
        <VisitCtaSection />
      </main>

      {/* 3. Gravity Letters Interactive Footer */}
      <GravityFooter />

      {/* 4. Luxury Cart Drawer & Floating Cart Bar for WhatsApp Ordering */}
      <CartDrawer />
      <FloatingCartBar />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FoogleWebsite />
      </CartProvider>
    </ThemeProvider>
  );
}
