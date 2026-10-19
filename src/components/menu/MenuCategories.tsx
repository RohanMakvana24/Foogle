import React, { useRef } from 'react';
import { MenuCategory, MenuCategoryId } from '../../types/menu';

export interface MenuCategoriesProps {
  categories: MenuCategory[];
  activeCategory: MenuCategoryId;
  onSelectCategory: (id: MenuCategoryId) => void;
  itemCounts: Record<MenuCategoryId, number>;
}

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  itemCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      {/* Scrollable Container with horizontal touch scroll on mobile */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label="Food menu category filters"
        className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory focus-visible:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const count = itemCounts[category.id] ?? 0;

          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="menu-items-grid"
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`
                snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                whitespace-nowrap transition-all duration-150 cursor-pointer select-none
                focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'shadow-sm text-white'
                    : 'hover:border-[var(--color-border-hover)] border'
                }
              `}
              style={{
                backgroundColor: isActive
                  ? 'var(--color-brand-primary)'
                  : 'var(--color-bg-surface)',
                color: isActive ? '#FFFFFF' : 'var(--color-text-primary)',
                borderColor: isActive ? 'transparent' : 'var(--color-border)',
              }}
            >
              <span>{category.label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-black/5 dark:bg-white/10'
                }`}
                style={{
                  color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
