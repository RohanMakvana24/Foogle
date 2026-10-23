'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { FOOGLE_BUSINESS_INFO } from '../data/businessInfo';

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
  imageUrl?: string;
  notes?: string;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  orderType: OrderType;
  customerName: string;
  tableOrAddress: string;
  orderNotes: string;
  lastAddedItem: CartItem | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setOrderType: (type: OrderType) => void;
  setCustomerName: (name: string) => void;
  setTableOrAddress: (val: string) => void;
  setOrderNotes: (notes: string) => void;
  getWhatsAppOrderUrl: () => string;
  getFormattedOrderMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'foogle_cafe_cart_v1';

// Default starter item from Hero: Mexican Premium Burger
export const HERO_BURGER_ITEM: Omit<CartItem, 'quantity'> = {
  id: 'hero-mexican-burger',
  name: 'Mexican Premium Burger',
  price: 289,
  category: 'Burgers & Specials',
  description: 'Double smashed patty · melted gouda · smoked paprika',
  imageUrl: '/images/photos/aloo-tikki-burger.webp',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const addItem = useCallback((itemData: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    if (quantity <= 0) return;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemData.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { ...itemData, quantity }];
      }
    });

    setLastAddedItem({ ...itemData, quantity });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const getFormattedOrderMessage = useCallback(() => {
    const orderTypeLabel =
      orderType === 'dine-in'
        ? '🍽️ Dine-in (Table Service)'
        : orderType === 'takeaway'
        ? '🛍️ Takeaway / Counter Pickup'
        : '🛵 Courtyard Delivery';

    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.quantity}x ${item.name}* — ₹${item.price * item.quantity}${
            item.notes ? `\n   ↳ _Note: ${item.notes}_` : ''
          }`
      )
      .join('\n');

    return [
      '🍽️ *NEW ORDER — FOOGLE CAFÉ*',
      '_Panchwati, Udaipur, Rajasthan_',
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *Customer Name:* ${customerName.trim() || 'Guest'}`,
      `📍 *Order Type:* ${orderTypeLabel}`,
      tableOrAddress.trim()
        ? `📌 *${orderType === 'dine-in' ? 'Table No.' : 'Delivery Location'}:* ${tableOrAddress.trim()}`
        : '',
      orderNotes.trim() ? `📝 *Special Notes:* ${orderNotes.trim()}` : '',
      '━━━━━━━━━━━━━━━━━━━━',
      '🛒 *ITEMS ORDERED:*',
      itemsList || '(No items added yet)',
      '━━━━━━━━━━━━━━━━━━━━',
      `💰 *Subtotal:* ₹${subtotal}`,
      '🏷️ *Taxes & Packing:* Free (₹0)',
      `✨ *GRAND TOTAL:* ₹${subtotal}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '📍 *Pickup / Dine-in Address:*',
      'Foogle Café, G1 Tirupati Balaji Apt, Panchwati, Udaipur',
      '',
      'Please confirm my order and let me know the preparation time! 🙏',
    ]
      .filter(Boolean)
      .join('\n');
  }, [items, customerName, orderType, tableOrAddress, orderNotes, subtotal]);

  const getWhatsAppOrderUrl = useCallback(() => {
    // Official phone number: +91 82792 11527 -> clean to digits '918279211527'
    const rawPhone = FOOGLE_BUSINESS_INFO.contact.phone || '918279211527';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const message = getFormattedOrderMessage();
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }, [getFormattedOrderMessage]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        orderType,
        customerName,
        tableOrAddress,
        orderNotes,
        lastAddedItem,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        setOrderType,
        setCustomerName,
        setTableOrAddress,
        setOrderNotes,
        getWhatsAppOrderUrl,
        getFormattedOrderMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
