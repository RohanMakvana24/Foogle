import React, { useState, useMemo } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { MenuCategories } from './MenuCategories';
import { MenuCard } from './MenuCard';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import { MenuCategoryId } from '../../types/menu';
import { Sparkles, Info, ArrowRight } from 'lucide-react';

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

  return (
    <section
      id="menu"
      aria-labelledby="menu-main-heading"
      className="py-16 sm:py-24 border-t scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="MADE FOR YOUR CRAVINGS"
            title="Explore Our Menu"
            description="From comforting classics to exciting cafe favourites, find something you'll love."
            titleLevel="h2"
          />

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
        <div className="mb-10">
          <MenuCategories
            categories={MENU_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            itemCounts={itemCounts}
          />
        </div>

        {/* Responsive Food Cards Grid */}
        <div
          id="menu-items-grid"
          role="region"
          aria-label="Menu Items List"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Informative Disclaimer Banner (Phase 3 Owner Confirmation Note) */}
        <div
          className="mt-14 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
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
