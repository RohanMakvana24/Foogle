'use client';

import React, { useEffect, useState } from 'react';
import { useCart, CartItem } from '../../context/CartContext';
import { buildSrcSet } from '../../lib/imageSrcSet';
import { useTheme } from '../../context/ThemeContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  Utensils,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  MessageCircle,
  Coffee,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';

// Recommended quick add-on favorites
const FOOGLE_ADDONS: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}> = [
  {
    id: 'addon-latte',
    name: 'Cold Foam Latte',
    price: 169,
    category: 'Coffee',
    image: '/images/photos/cold-coffee.webp',
  },
  {
    id: 'addon-fries',
    name: 'Peri Peri Crisp Fries',
    price: 149,
    category: 'Snacks',
    image: '/images/photos/peri-peri-fries.webp',
  },
  {
    id: 'addon-brownie',
    name: 'Sizzling Brownie & Gelato',
    price: 219,
    category: 'Desserts',
    image: '/images/photos/sizzling-brownie.webp',
  },
];

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    orderType,
    setOrderType,
    customerName,
    setCustomerName,
    tableOrAddress,
    setTableOrAddress,
    orderNotes,
    setOrderNotes,
    addItem,
    getWhatsAppOrderUrl,
  } = useCart();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when cart open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = getWhatsAppOrderUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* 1. Backdrop Overlay with Blur */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      {/* 2. Slide-in Cart Panel (Full screen on mobile, 480px width on desktop) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          className="w-screen max-w-md sm:max-w-lg flex flex-col shadow-2xl transition-all duration-300 animate-in slide-in-from-right duration-300"
          style={{
            backgroundColor: isDark ? '#0e1411' : '#FAF7F2',
            color: isDark ? '#EAF0EC' : '#183B2B',
            borderLeft: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(24,59,43,0.12)',
          }}
        >
          {/* ── Cart Header ────────────────────────────────────────────── */}
          <div
            className="p-5 sm:p-6 border-b flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md"
            style={{
              backgroundColor: isDark ? 'rgba(14,20,17,0.92)' : 'rgba(250,247,242,0.92)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(24,59,43,0.1)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-sm"
                style={{
                  backgroundColor: 'rgba(245,158,11,0.12)',
                  borderColor: 'rgba(245,158,11,0.3)',
                  color: '#fbbf24',
                }}
              >
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
                  Your Foogle Tray
                </h2>
                <p className="text-xs opacity-70">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} · Fresh from kitchen
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  title="Clear all items"
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg opacity-60 hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart tray"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Cart Body (Scrollable) ─────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {items.length === 0 ? (
              /* Empty Tray View */
              <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border shadow-inner"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(24,59,43,0.04)',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(24,59,43,0.08)',
                  }}
                >
                  <ShoppingBag className="w-9 h-9 opacity-40 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-2">Your Food Tray is Empty</h3>
                <p className="text-xs sm:text-sm opacity-70 max-w-xs mb-6 leading-relaxed">
                  Explore our handcrafted burgers, stone-oven pizzas, pastas, and shakes from Panchwati kitchen.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    const menuEl = document.querySelector('#menu');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-brand-primary)',
                    color: '#FFFFFF',
                  }}
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Browse Our Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* 1. Dining Mode Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-70">
                    Dining Preference
                  </label>
                  <div
                    className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl border"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    }}
                  >
                    {[
                      { id: 'dine-in', label: 'Dine-In', icon: Utensils },
                      { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
                      { id: 'delivery', label: 'Delivery', icon: MapPin },
                    ].map((mode) => {
                      const isSelected = orderType === mode.id;
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setOrderType(mode.id as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-black shadow-sm'
                              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Customer Name & Table/Address Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan Makwana"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
                        color: isDark ? '#FFFFFF' : '#183B2B',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      {orderType === 'dine-in'
                        ? 'Table No. (Optional)'
                        : orderType === 'takeaway'
                        ? 'Pickup Time'
                        : 'Courtyard / Area'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        orderType === 'dine-in'
                          ? 'e.g. Table 4 / Courtyard'
                          : orderType === 'takeaway'
                          ? 'e.g. In 15 minutes'
                          : 'e.g. Near RK Mall'
                      }
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
                        color: isDark ? '#FFFFFF' : '#183B2B',
                      }}
                    />
                  </div>
                </div>

                {/* 3. Special Requests / Chef Note */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, Jain preparation, less cheese..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
                      color: isDark ? '#FFFFFF' : '#183B2B',
                    }}
                  />
                </div>

                {/* 4. Tray Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold opacity-75">
                      Selected Dishes ({items.length})
                    </span>
                    <span className="text-xs font-medium opacity-60">Panchwati Kitchen</span>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all"
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
                        }}
                      >
                        {/* Food Image / Thumbnail */}
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            srcSet={buildSrcSet(item.imageUrl)}
                            sizes="56px"
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-black/10 dark:border-white/10"
                          />
                        ) : (
                          <div
                            className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center font-serif text-lg font-bold border"
                            style={{
                              backgroundColor: 'rgba(245,158,11,0.1)',
                              borderColor: 'rgba(245,158,11,0.25)',
                              color: '#fbbf24',
                            }}
                          >
                            🍽️
                          </div>
                        )}

                        {/* Title & Price */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold truncate leading-tight">
                            {item.name}
                          </h4>
                          {item.category && (
                            <span className="text-[10px] opacity-60 block truncate">
                              {item.category}
                            </span>
                          )}
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                              ₹{item.price * item.quantity}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] opacity-50">
                                (₹{item.price} each)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stepper Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div
                            className="flex items-center gap-2 rounded-full border px-2 py-1"
                            style={{
                              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Quick Add Popular Addons */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-mono uppercase tracking-wider font-bold opacity-80">
                      Popular Foogle Pairings
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {FOOGLE_ADDONS.map((addon) => {
                      const isAlreadyInCart = items.some((i) => i.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          className="p-2.5 rounded-xl border flex flex-col justify-between text-left transition-all hover:border-amber-500/50"
                          style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                          }}
                        >
                          <img
                            src={addon.image}
                            srcSet={buildSrcSet(addon.image)}
                            sizes="110px"
                            alt={addon.name}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                '/images/photos/food-fallback.webp';
                            }}
                            className="w-full h-14 rounded-lg object-cover mb-1.5"
                          />
                          <span className="text-[11px] font-bold truncate leading-tight block">
                            {addon.name}
                          </span>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400">
                              ₹{addon.price}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                addItem({
                                  id: addon.id,
                                  name: addon.name,
                                  price: addon.price,
                                  category: addon.category,
                                  imageUrl: addon.image,
                                })
                              }
                              className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-500 text-black hover:bg-amber-400 transition-all cursor-pointer font-bold"
                              title="Add to tray"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Cart Footer & WhatsApp Checkout ───────────────────────── */}
          {items.length > 0 && (
            <div
              className="p-5 sm:p-6 border-t space-y-4 sticky bottom-0 z-20 backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(14,20,17,0.95)' : 'rgba(250,247,242,0.96)',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(24,59,43,0.12)',
              }}
            >
              {/* Receipt Summary */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between opacity-70">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Taxes &amp; Packaging</span>
                  <span className="text-emerald-500 font-bold">FREE (₹0)</span>
                </div>
                <div
                  className="pt-2 border-t flex justify-between text-sm sm:text-base font-bold font-sans"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  }}
                >
                  <span>Grand Total</span>
                  <span className="text-lg font-black text-amber-500">₹{subtotal}</span>
                </div>
              </div>

              {/* Big High-Impact WhatsApp Order Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-5 rounded-2xl font-bold flex items-center justify-between text-white shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.82 2.791.82 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.156.57 4.18 1.572 5.928l-1.572 5.744 5.914-1.552c1.705.932 3.659 1.464 5.736 1.464 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-sm font-extrabold">Order on WhatsApp</span>
                    <span className="block text-[10px] opacity-85 font-mono">
                      Direct to Foogle Kitchen
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                  <span className="text-sm font-black">₹{subtotal}</span>
                  <ChevronRight className="w-4 h-4 opacity-75" />
                </div>
              </button>

              {/* Kitchen Confirmation note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] opacity-60">
                <Clock className="w-3 h-3 text-amber-500" />
                <span>Typical prep time: 15–20 mins · Panchwati, Udaipur</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
