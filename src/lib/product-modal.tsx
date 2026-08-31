import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/menu";

type Ctx = {
  item: MenuItem | null;
  openProduct: (item: MenuItem) => void;
  closeProduct: () => void;
};

const ProductModalContext = createContext<Ctx | null>(null);

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<MenuItem | null>(null);
  return (
    <ProductModalContext.Provider
      value={{ item, openProduct: setItem, closeProduct: () => setItem(null) }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const ctx = useContext(ProductModalContext);
  if (!ctx) throw new Error("useProductModal must be used inside ProductModalProvider");
  return ctx;
}
