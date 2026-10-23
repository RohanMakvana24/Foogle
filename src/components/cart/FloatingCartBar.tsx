'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { totalItems, subtotal, openCart, isCartOpen } = useCart();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (totalItems === 0 || isCartOpen) return null;

  return (
    <aside
      aria-label="Active order floating bar"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto select-none"
    >
      <div
        onClick={openCart}
        className="w-full p-3 sm:p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] group"
        style={{
          backgroundColor: isDark ? 'rgba(18, 24, 20, 0.94)' : 'rgba(255, 255, 255, 0.96)',
          borderColor: isDark ? 'rgba(245, 158, 11, 0.35)' : 'rgba(217, 119, 6, 0.3)',
          boxShadow: isDark
            ? '0 12px 36px rgba(0,0,0,0.7), 0 0 20px rgba(245, 158, 11, 0.2)'
            : '0 12px 32px rgba(24, 59, 43, 0.18)',
        }}
      >
        {/* Left: Badge & Count */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border relative"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
            }}
          >
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center shadow-xs">
              {totalItems}
            </span>
          </div>

          <div className="leading-tight">
            <span
              className="text-xs font-bold block"
              style={{ color: isDark ? '#FFFFFF' : '#183B2B' }}
            >
              Foogle Tray ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
            <span className="text-[11px] font-mono opacity-60">Tap to review &amp; order</span>
          </div>
        </div>

        {/* Right: Subtotal & WhatsApp CTA Preview */}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-black text-amber-500">₹{subtotal}</span>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs text-white shadow-sm transition-all group-hover:bg-amber-400 group-hover:text-black"
            style={{
              backgroundColor: 'var(--color-brand-primary)',
            }}
          >
            <span>Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FloatingCartBar;
