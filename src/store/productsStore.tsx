import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';

interface ProductsContextType {
  products: Product[];
  decreaseStock: (items: CartItem[]) => void;
  adjustStock: (productId: string, delta: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const decreaseStock = useCallback((items: CartItem[]) => {
    setProducts(prev =>
      prev.map(product => {
        const cartItem = items.find(item => item.product.id === product.id);
        if (cartItem) {
          return { ...product, stock: Math.max(0, product.stock - cartItem.quantity) };
        }
        return product;
      })
    );
  }, []);

  const adjustStock = useCallback((productId: string, delta: number) => {
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p)
    );
  }, []);

  return React.createElement(ProductsContext.Provider, {
    value: { products, decreaseStock, adjustStock },
    children,
  });
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}
