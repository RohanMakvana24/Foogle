import React, { useState, useMemo } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { MenuCategories } from './MenuCategories';
import { MenuCard } from './MenuCard';
import { CoverflowCarousel, CoverflowSlide } from '@/components/ui/coverflow-carousel';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import { MenuCategoryId } from '../../types/menu';
import { Sparkles, Info, ArrowRight, HandMetal, Smartphone } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');

  // Compute item counts for each category
  const itemCounts = useMemo(() => {
    const counts: Record<MenuCategoryId, number> = {
      all: MENU_ITEMS.length,
      pizza: 0,
      sandwiches: 0,
      pasta: 0,
      'sides-snacks': 0,
      'cafe-specials': 0,
      desserts: 0,
    };

    MENU_ITEMS.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });

    return counts;
  }, []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return MENU_ITEMS;
    }
    return MENU_ITEMS.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory]);

  // Convert filtered items to Coverflow slides for interactive mobile carousel
  const coverflowSlides = useMemo<CoverflowSlide[]>(() => {
    return filteredItems.map((item) => ({
      src: item.imageUrl || '/images/photos/woodfired-pizza.webp',
      alt: item.name,
      title: item.name,
      subtitle: item.description,
      tag: item.categoryLabel,
      meta: [
        { label: 'Category', value: item.categoryLabel },
        { label: 'Crafted In', value: 'Panchwati, Udaipur' },
      ],
      isVeg: true,
    }));
  }, [filteredItems]);

  return (
    <section
      id="menu"
      aria-labelledby="menu-main-heading"
      className="py-14 sm:py-20 border-t scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <SectionHeading
              eyebrow="MADE FOR YOUR CRAVINGS"
              title="Explore Our Menu"
              description="From comforting classics to exciting cafe favourites, find something you'll love."
              titleLevel="h2"
            />
          </div>

          {/* Quick Stats / Active Category Indicator */}
          <div
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border self-start md:self-auto shrink-0"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-primary)' }} />
            <span>
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="mb-8">
          <MenuCategories
            categories={MENU_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            itemCounts={itemCounts}
          />
        </div>

        {/* MOBILE VIEW ONLY: 3D Coverflow Carousel (Eliminates excessive vertical scrolling) */}
        <div className="block sm:hidden mb-6">
          <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-semibold">
              <Smartphone className="w-3 h-3" />
              Swipe To Browse
            </span>
            <span>Explore dishes</span>
          </div>

          <CoverflowCarousel
            key={activeCategory}
            slides={coverflowSlides}
            showCaption={true}
            showNavigation={true}
            showPagination={true}
            cardWidth="clamp(210px, 66vw, 270px)"
            className="pb-2"
          />
        </div>

        {/* Scroll-Driven Animation Style Injection for Desktop Grid */}
        <style>{`
          @keyframes menu-slide-in {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(24px) rotate(calc(var(--side, 1) * (3deg * var(--amp, 1))));
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0) rotate(0deg);
            }
          }

          .menu-card-scroll-wrapper {
            &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
            &:nth-of-type(2n) { transform-origin: -25vw 100%; }

            @media (min-width: 768px) {
              &:nth-of-type(3n + 1) { transform-origin: 33vw 100%; }
              &:nth-of-type(3n + 2) { transform-origin: 0 100%; }
              &:nth-of-type(3n) { transform-origin: -33vw 100%; }
            }

            @media (prefers-reduced-motion: no-preference) {
              animation: menu-slide-in linear both;
              animation-timeline: view();
              animation-range: entry 0% cover 20%;
            }
          }
        `}</style>

        {/* DESKTOP & TABLET VIEW ONLY: Responsive Food Cards Bento Grid */}
        <div
          id="menu-items-grid"
          role="region"
          aria-label="Menu Items List"
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              className="menu-card-scroll-wrapper"
              style={
                {
                  '--side': index % 2 === 0 ? 1 : -1,
                  '--amp': Math.max(1, index % 3),
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Informative Disclaimer Banner (Phase 3 Owner Confirmation Note) */}
        <div
          className="mt-12 sm:mt-14 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--color-brand-primary)' }} />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Provisional menu selection for Foogle in Panchwati, Udaipur.
              Official dishes, pricing, and daily specials are subject to final confirmation with restaurant management.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap shrink-0 hover:underline focus-visible:outline-2 rounded"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            <span>Visit Us in Panchwati</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default MenuSection;
