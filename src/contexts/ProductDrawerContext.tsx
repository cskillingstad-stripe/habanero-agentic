'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Item } from '@/components/ProductMessage';

type ProductDrawerContextValue = {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
};

const ProductDrawerContext = createContext<ProductDrawerContextValue | null>(null);

export function ProductDrawerProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  return (
    <ProductDrawerContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ProductDrawerContext.Provider>
  );
}

export function useProductDrawer() {
  const ctx = useContext(ProductDrawerContext);
  if (!ctx) throw new Error('useProductDrawer must be used within ProductDrawerProvider');
  return ctx;
}
