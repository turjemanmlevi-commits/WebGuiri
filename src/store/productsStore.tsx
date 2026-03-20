import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';
import { supabase, supabaseEnabled } from '../lib/supabase';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  decreaseStock: (items: CartItem[]) => void;
  adjustStock: (productId: string, delta: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  // Fetch from Supabase on mount if configured
  useEffect(() => {
    if (!supabaseEnabled) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(
            data.map((p: any) => ({
              id: p.id,
              sku: p.sku,
              name: p.name,
              categoryId: p.category_id,
              subcategoryId: p.subcategory_id ?? undefined,
              categoryName: p.category_name ?? undefined,
              subcategoryName: p.subcategory_name ?? undefined,
              price: Number(p.price),
              stock: p.stock,
              description: p.description ?? undefined,
              brand: p.brand ?? undefined,
              unitMeasure: p.unit_measure ?? undefined,
              imageUrl: p.image_url ?? undefined,
              weightKg: p.weight_kg ? Number(p.weight_kg) : undefined,
              iva: p.iva ?? 21,
              active: p.active,
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  const decreaseStock = useCallback((items: CartItem[]) => {
    setProducts(prev =>
      prev.map(product => {
        const cartItem = items.find(i => i.product.id === product.id);
        if (cartItem) return { ...product, stock: Math.max(0, product.stock - cartItem.quantity) };
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
    value: { products, loading, decreaseStock, adjustStock },
    children,
  });
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}
