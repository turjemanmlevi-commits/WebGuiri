import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getGroupedByCategory: () => Record<string, CartItem[]>;
  getCategoryTotal: (categoryName: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemCount = useCallback(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const getTotal = useCallback(() =>
    items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [items]
  );

  const getGroupedByCategory = useCallback(() => {
    return items.reduce((acc, item) => {
      const cat = item.product.categoryName || 'Sin Categoría';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);
  }, [items]);

  const getCategoryTotal = useCallback((categoryName: string) => {
    return items
      .filter(item => item.product.categoryName === categoryName)
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  return React.createElement(CartContext.Provider, {
    value: { items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getTotal, getGroupedByCategory, getCategoryTotal },
    children,
  });
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
