import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { MenuFoodVisual } from '../menu/MenuFoodVisual';
import { MENU_ITEMS } from '../../data/menuData';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SignatureDishesSection: React.FC = () => {
  // Select the 3 highlighted dishes from our existing menu data
  const mainFeature = MENU_ITEMS.find((item) => item.id === 'pizza-foogle-special') || MENU_ITEMS[0];
  const supportingDish1 = MENU_ITEMS.find((item) => item.id === 'pizza-paneer-tikka') || MENU_ITEMS[1];
  const supportingDish2 = MENU_ITEMS.find((item) => item.id === 'dessert-sizzling-brownie') || MENU_ITEMS[MENU_ITEMS.length - 2];

  const scrollToMenu = () => {
    const menuElement = document.querySelector('#menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-labelledby="signature-dishes-heading"
      className="py-16 sm:py-24 border-t transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="CURATED PICKS"
            title="Foogle Favourites"
            description="A closer look at the flavours that make every craving worth following."
            titleLevel="h2"
          />

          <button
            type="button"
            onClick={scrollToMenu}
            className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap self-start md:self-auto hover:underline focus-visible:outline-2 rounded cursor-pointer"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Desktop Composition: 1 Large Feature Card (left) + 2 Stacked Supporting Cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Large Feature Card (Cols 1 to 7) */}
          <article
            className="lg:col-span-7 group flex flex-col justify-between rounded-[var(--radius-xl)] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-card-border)',
            }}
          >
            <div>
              {/* Feature Food Visual Frame */}
              <div className="relative w-full overflow-hidden">
                <MenuFoodVisual item={mainFeature} aspectRatio="16/10" className="rounded-none" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white shadow-md z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chef Highlight</span>
                </div>
              </div>

              {/* Feature Card Text Content */}
              <div className="p-6 sm:p-8 space-y-3">
                <div
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  {mainFeature.categoryLabel} Specialty
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-[var(--color-brand-primary)] transition-colors"
                  style={{
                    color: 'var(--color-text-primary)',
                    textWrap: 'balance',
                  }}
                >
                  {mainFeature.name}
                </h3>

                <p
                  className="text-sm sm:text-base leading-relaxed max-w-xl"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {mainFeature.description}
                </p>
              </div>
            </div>

            {/* Feature Card Bottom Meta */}
            <div
              className="px-6 sm:px-8 py-4 border-t flex items-center justify-between text-xs"
              style={{
                borderColor: 'var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              <span className="font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                Panchwati Kitchen Selection
              </span>
              <span className="font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                Woodfired Special
              </span>
            </div>
          </article>

          {/* Two Supporting Stacked Cards (Cols 8 to 12) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            {/* Supporting Dish 1 */}
            <article
              className="group flex-1 flex flex-col justify-between rounded-[var(--radius-xl)] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-card-border)',
              }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0 relative">
                  <MenuFoodVisual item={supportingDish1} className="h-full rounded-none" />
                </div>
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-1.5">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      {supportingDish1.categoryLabel}
                    </span>
                    <h3
                      className="text-lg font-bold tracking-tight group-hover:text-[var(--color-brand-primary)] transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {supportingDish1.name}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed line-clamp-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {supportingDish1.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-medium pt-3 text-right" style={{ color: 'var(--color-text-tertiary)' }}>
                    Seasonal Favourite
                  </div>
                </div>
              </div>
            </article>

            {/* Supporting Dish 2 */}
            <article
              className="group flex-1 flex flex-col justify-between rounded-[var(--radius-xl)] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-card-border)',
              }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0 relative">
                  <MenuFoodVisual item={supportingDish2} className="h-full rounded-none" />
                </div>
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-1.5">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      {supportingDish2.categoryLabel}
                    </span>
                    <h3
                      className="text-lg font-bold tracking-tight group-hover:text-[var(--color-brand-primary)] transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {supportingDish2.name}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed line-clamp-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {supportingDish2.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-medium pt-3 text-right" style={{ color: 'var(--color-text-tertiary)' }}>
                    Dessert Highlight
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};
