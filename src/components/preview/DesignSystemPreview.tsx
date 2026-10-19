import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { SurfaceCard } from '../common/SurfaceCard';
import { MediaFrame } from '../common/MediaFrame';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const DesignSystemPreview: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [buttonClicked, setButtonClicked] = useState<string | null>(null);

  const handleAction = (name: string) => {
    setButtonClicked(name);
    setTimeout(() => setButtonClicked(null), 1800);
  };

  const accentColors = [
    { name: 'Google Blue', hex: '#4285F4', variable: '--color-accent-blue', role: 'Interactive accents & links' },
    { name: 'Google Red', hex: '#EA4335', variable: '--color-accent-red', role: 'Highlights & alerts' },
    { name: 'Google Yellow', hex: '#FBBC05', variable: '--color-accent-yellow', role: 'Warmth & badges' },
    { name: 'Google Green', hex: '#34A853', variable: '--color-accent-green', role: 'Freshness & active states' },
  ];

  const primaryTokens = [
    { name: 'Forest Green (Brand)', value: isDark ? '#2D6A4F' : '#183B2B', role: 'Brand identity & primary actions' },
    { name: 'Canvas Background', value: isDark ? '#0E1411' : '#FAF8F5', role: isDark ? 'Charcoal / Deep Green' : 'Warm Ivory' },
    { name: 'Surface Background', value: isDark ? '#151E19' : '#FFFFFF', role: 'Cards and structural containers' },
    { name: 'Text Primary', value: isDark ? '#F5F2EB' : '#17211C', role: 'High contrast display & body' },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {/* 1. Header with Top Bar Contract (Zone 1: Wordmark, Zone 2: Navigation Links, Zone 3: Action / Theme Toggle) */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200"
        style={{
          backgroundColor: 'var(--color-nav-bg)',
          borderColor: 'var(--color-border)',
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-16 gap-4 sm:gap-8">
            {/* Zone 1: Brand Wordmark (Single text/emblem element) */}
            <BrandLogo size="md" />

            {/* Zone 2: Clean single-line navigation indicators */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#tokens"
                className="transition-colors hover:text-[var(--color-brand-primary)] whitespace-nowrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Tokens
              </a>
              <a
                href="#typography"
                className="transition-colors hover:text-[var(--color-brand-primary)] whitespace-nowrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Typography
              </a>
              <a
                href="#components"
                className="transition-colors hover:text-[var(--color-brand-primary)] whitespace-nowrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Components
              </a>
              <a
                href="#assets"
                className="transition-colors hover:text-[var(--color-brand-primary)] whitespace-nowrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Asset Rules
              </a>
            </nav>

            {/* Zone 3: Accessible Theme Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* 2. Welcome & Identity Section */}
        <section aria-labelledby="welcome-heading">
          <Container>
            <div className="max-w-3xl">
              {/* Clean unboxed metadata separator */}
              <div
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                <span>Phase 1 Foundation</span>
                <span aria-hidden="true">·</span>
                <span>Panchwati, Udaipur, Rajasthan</span>
                <span aria-hidden="true">·</span>
                <span>Design System &amp; Tokens</span>
              </div>

              {/* Required Heading: "Good food. Good mood." */}
              <h1
                id="welcome-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
                style={{
                  color: 'var(--color-text-primary)',
                  textWrap: 'balance',
                }}
              >
                Good food. Good mood.
              </h1>

              {/* Required Description */}
              <p
                className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl"
                style={{
                  color: 'var(--color-text-secondary)',
                  textWrap: 'pretty',
                }}
              >
                Foogle is a cafe and restaurant in Panchwati, Udaipur, Rajasthan, crafted for fresh flavours,
                contemporary hospitality, and energetic community gatherings. This foundation establishes
                the design tokens, accessible light/dark theming, and responsive layout primitives.
              </p>

              {/* Primary and Secondary button examples */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  onClick={() => handleAction('Primary Button')}
                >
                  Explore Design System
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleAction('Secondary Button')}
                >
                  View Color Tokens
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleAction('Ghost Button')}
                >
                  Reset Defaults
                </Button>
              </div>

              {buttonClicked && (
                <div
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md"
                  style={{
                    backgroundColor: 'var(--color-brand-surface-tint)',
                    color: 'var(--color-brand-primary)',
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Interaction verified: {buttonClicked} active</span>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* 3. Color Tokens Section (Google 4-Color Accents + Forest Green Brand Surfaces) */}
        <section id="tokens" aria-labelledby="tokens-heading" className="scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="Color Architecture"
              title="Accent Palette &amp; Brand Surfaces"
              description="A disciplined 60-30-10 distribution: Forest Green anchors the brand surfaces, Warm Ivory provides canvas serenity, and Google-inspired four colors serve exclusively as high-intent accents."
            />

            <div className="mt-8 space-y-8">
              {/* Four Google Accent Colors */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Four Google-Inspired Accent Swatches
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {accentColors.map((color) => (
                    <SurfaceCard key={color.name} padding="sm" className="space-y-3">
                      <div
                        className="w-full h-16 rounded-[var(--radius-sm)] flex items-end p-2 transition-transform duration-200 hover:scale-[1.02]"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="text-[11px] font-mono font-bold text-white/90 drop-shadow-sm">
                          {color.hex}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {color.name}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                          {color.role}
                        </div>
                        <code
                          className="block text-[11px] font-mono mt-2 px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: 'var(--color-bg-subtle)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {color.variable}
                        </code>
                      </div>
                    </SurfaceCard>
                  ))}
                </div>
              </div>

              {/* Primary & Surface Tokens */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Primary Brand &amp; Canvas Tokens ({theme} mode)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {primaryTokens.map((token) => (
                    <SurfaceCard key={token.name} padding="sm" className="space-y-3">
                      <div
                        className="w-full h-14 rounded-[var(--radius-sm)] border flex items-end p-2"
                        style={{
                          backgroundColor: token.value,
                          borderColor: 'var(--color-border)',
                        }}
                      >
                        <span
                          className={`text-[11px] font-mono font-bold ${
                            token.name === 'Canvas Background' && !isDark
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        >
                          {token.value}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {token.name}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {token.role}
                        </div>
                      </div>
                    </SurfaceCard>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Typography Scale Demonstration */}
        <section id="typography" aria-labelledby="typography-heading" className="scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="Type System"
              title="Typographic Hierarchy"
              description="Geometric neo-grotesque type scale paired with comfortable line heights, balance containment, and zero-pill editorial metadata."
            />

            <SurfaceCard elevation="elevated" className="mt-8 divide-y" padding="none">
              <div
                className="p-6 sm:p-8 space-y-2 border-b"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Display Scale · clamp(2.25rem, 5vw, 3.75rem)
                </div>
                <div
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Flavours crafted for Panchwati
                </div>
              </div>

              <div
                className="p-6 sm:p-8 space-y-2 border-b"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Heading 1 (H1) · 2.25rem / 36px
                </div>
                <h1
                  className="text-2xl sm:text-4xl font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Artisanal Coffee &amp; Contemporary Dining
                </h1>
              </div>

              <div
                className="p-6 sm:p-8 space-y-2 border-b"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Heading 2 (H2) · 1.875rem / 30px
                </div>
                <h2
                  className="text-xl sm:text-2xl font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Seasonal Ingredients from Regional Farms
                </h2>
              </div>

              <div
                className="p-6 sm:p-8 space-y-2 border-b"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Body Text · 1rem / 16px (1.6 Line Height)
                </div>
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Every recipe is developed with balance, quality ingredients, and welcoming hospitality.
                  Clean contrast ensures effortless reading in both daylight and evening dining ambiance.
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Unboxed Metadata &amp; Tabular Numerals
                </div>
                <div
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <span>Panchwati Location</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">24.5854° N, 73.7125° E</span>
                  <span aria-hidden="true">·</span>
                  <span>Udaipur, Rajasthan</span>
                </div>
              </div>
            </SurfaceCard>
          </Container>
        </section>

        {/* 5. Reusable Component Primitives & Sample Cards */}
        <section id="components" aria-labelledby="components-heading" className="scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="Foundation Components"
              title="Modular Surface Primitives"
              description="Demonstrating single-elevation depth, responsive touch targets, and consistent nested radius geometry."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Sample Surface Card 1: Flat */}
              <SurfaceCard elevation="flat" className="flex flex-col justify-between">
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-brand-primary)' }}
                  >
                    Flat Surface Card
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Hairline Border Primitive
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Standard flat container utilizing token-driven 1px hairline border without heavy elevation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <Button variant="ghost" size="sm" onClick={() => handleAction('Flat Card Action')}>
                    Card Action
                  </Button>
                </div>
              </SurfaceCard>

              {/* Sample Surface Card 2: Elevated with hover */}
              <SurfaceCard elevation="elevated" hoverable={true} className="flex flex-col justify-between">
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    Elevated Card
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Interactive Lift &amp; Soft Shadow
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Responsive card equipped with smooth 2px translateY lift and soft shadow expansion on hover.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <Button variant="secondary" size="sm" onClick={() => handleAction('Elevated Card Action')}>
                    Learn More
                  </Button>
                </div>
              </SurfaceCard>

              {/* Sample Surface Card 3: Button Matrix */}
              <SurfaceCard elevation="flat" className="flex flex-col justify-between">
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    Interactive States
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Button Variants &amp; Sizes
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm" onClick={() => handleAction('Primary Small')}>
                        Primary Sm
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleAction('Secondary Small')}>
                        Secondary Sm
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="accent" size="sm" onClick={() => handleAction('Accent Green')}>
                        Accent Green
                      </Button>
                      <Button variant="secondary" size="sm" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t text-xs" style={{ color: 'var(--color-text-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                  Complies with $\ge 40$px touch standards.
                </div>
              </SurfaceCard>
            </div>
          </Container>
        </section>

        {/* 6. Image & Asset Policy Demonstration */}
        <section id="assets" aria-labelledby="assets-heading" className="scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow="Asset Policy"
              title="Media Conventions &amp; Fallbacks"
              description="Phase 1 enforces strict aspect ratios (16:9, 4:3, 1:1) and zero-broken-image fallbacks to eliminate layout shift before real food photography is captured in Phase 2."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="space-y-2">
                <MediaFrame
                  alt="Foogle signature dish slot"
                  aspectRatio="16:9"
                  placeholderTitle="Hero Visual Slot"
                  placeholderCategory="Aspect 16:9"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Hero Banner / Spatial Ambience (16:9)
                </div>
              </div>

              <div className="space-y-2">
                <MediaFrame
                  alt="Foogle menu item slot"
                  aspectRatio="4:3"
                  placeholderTitle="Signature Dish Slot"
                  placeholderCategory="Aspect 4:3"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Menu Card / Dish Feature (4:3)
                </div>
              </div>

              <div className="space-y-2">
                <MediaFrame
                  alt="Foogle beverage slot"
                  aspectRatio="1:1"
                  placeholderTitle="Artisanal Beverage Slot"
                  placeholderCategory="Aspect 1:1"
                />
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Craft Drink / Square Showcase (1:1)
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 7. Architecture Status & Phase 1 Scope Card */}
        <section aria-labelledby="architecture-status">
          <Container>
            <SurfaceCard
              elevation="flat"
              className="border p-6 sm:p-8"
              style={{
                backgroundColor: 'var(--color-brand-surface-tint)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--color-brand-primary)' }} />
                    <span
                      id="architecture-status"
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      Phase 1 Architecture Complete
                    </span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Foundation Ready for Incremental Expansion
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-2xl"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    All Phase 1 requirements are established: Design tokens, light &amp; dark mode persistence,
                    original Foogle wordmark, typography scale, responsive container, and zero-pill discipline.
                    No unverified business claims, menu prices, or fake reviews were introduced.
                  </p>
                </div>

                <div className="shrink-0">
                  <div
                    className="text-xs font-mono font-medium px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--color-bg-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Current Mode: <span className="font-bold capitalize">{theme}</span>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </Container>
        </section>
      </main>

      {/* Footer conforming to quiet copyright, location info, and unboxed metadata */}
      <footer
        className="border-t py-8 mt-12 transition-colors duration-200"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-bg-surface)',
        }}
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>Foogle</span>
              <span aria-hidden="true">·</span>
              <span>Panchwati, Udaipur, Rajasthan, India</span>
              <span aria-hidden="true">·</span>
              <span>Cafe &amp; Restaurant</span>
            </div>

            <div style={{ color: 'var(--color-text-tertiary)' }}>
              Phase 1 Design System &amp; Responsive Foundation
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};
