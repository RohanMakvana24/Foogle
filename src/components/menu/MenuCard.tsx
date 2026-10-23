import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { MenuFoodVisual } from './MenuFoodVisual';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import BorderGlow from '@/components/ui/BorderGlow';

export interface MenuCardProps {
  item: MenuItem;
  className?: string;
  style?: React.CSSProperties;
}

const CATEGORY_DEFAULT_PRICES: Record<string, number> = {
  pizza: 279,
  sandwiches: 189,
  pasta: 249,
  'sides-snacks': 159,
  'cafe-specials': 219,
  desserts: 199,
};

export const MenuCard: React.FC<MenuCardProps> = ({ item, className = '', style = {} }) => {
  const { addItem } = useCart();
  const { isDark } = useTheme();
  const [justAdded, setJustAdded] = useState(false);

  // Derive numeric price
  const numericPrice = item.price
    ? parseInt(item.price.replace(/\D/g, ''), 10) || 249
    : CATEGORY_DEFAULT_PRICES[item.categoryId] || 229;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: numericPrice,
      category: item.categoryLabel,
      description: item.description,
      imageUrl: item.imageUrl,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor={isDark ? '#151E19' : '#FFFFFF'}
      borderRadius={20}
      glowRadius={36}
      glowIntensity={1.0}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      className={`group h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)] ${className}`}
      style={style}
    >
      <article className="h-full flex flex-col justify-between">
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

        {/* Card Footer: Price + Add to Cart Button */}
        <div
          className="px-5 sm:px-6 pb-5 pt-3.5 border-t flex items-center justify-between text-xs"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              ₹{numericPrice}
            </span>
            <span
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Panchwati Kitchen
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${item.name} to tray`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
              justAdded
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ✓</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Tray</span>
              </>
            )}
          </button>
        </div>
      </article>
    </BorderGlow>
  );
};
