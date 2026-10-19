import React from 'react';
import { MenuItem } from '../../types/menu';
import { MenuFoodVisual } from './MenuFoodVisual';

export interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <article
      className="group h-full flex flex-col justify-between rounded-[var(--radius-lg)] border transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)',
      }}
    >
      <div>
        {/* Consistent 4:3 Food Visual Frame */}
        <MenuFoodVisual item={item} />

        {/* Card Content */}
        <div className="p-5 sm:p-6 space-y-2">
          {/* Metadata line (Clean unboxed text, no pills) */}
          <div
            className="flex items-center gap-2 text-xs font-semibold"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span>{item.categoryLabel}</span>

            {/* Optional Verified Classification (Only when explicitly in dish name) */}
            {item.name.toLowerCase().includes('jain') && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">Jain Special</span>
              </>
            )}
            {item.name.toLowerCase().includes('veg') && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">Veg Specialty</span>
              </>
            )}
          </div>

          {/* Dish Title */}
          <h3
            className="text-lg font-bold tracking-tight group-hover:text-[var(--color-brand-primary)] transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              textWrap: 'balance',
            }}
          >
            {item.name}
          </h3>

          {/* Dish Description */}
          <p
            className="text-sm leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              textWrap: 'pretty',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Status note or price container when available */}
      <div
        className="px-5 sm:px-6 pb-5 pt-3 border-t flex items-center justify-between text-xs"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <span
          className="font-medium"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {item.price ? item.price : 'Panchwati Kitchen'}
        </span>

        <span
          className="text-[11px] font-medium"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          Dine-in &amp; Cafe
        </span>
      </div>
    </article>
  );
};
