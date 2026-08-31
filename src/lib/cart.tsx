import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  image: string;
  sizeLabel?: string;
  unitPrice: number;
  quantity: number;
  toppings: { id: string; name: string; price: number }[];
  instructions?: string;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cheesy-ocean-cart";

export function lineTotal(line: CartLine): number {
  const toppings = line.toppings.reduce((sum, t) => sum + t.price, 0);
  return (line.unitPrice + toppings) * line.quantity;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    return {
      lines,
      subtotal,
      count,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addLine: (line) => {
        setLines((prev) => {
          const signature = (l: Omit<CartLine, "lineId">) =>
            `${l.itemId}|${l.sizeLabel ?? ""}|${l.toppings.map((t) => t.id).sort().join(",")}|${l.instructions ?? ""}`;
          const existing = prev.find((l) => signature(l) === signature(line));
          if (existing) {
            return prev.map((l) =>
              l.lineId === existing.lineId ? { ...l, quantity: l.quantity + line.quantity } : l,
            );
          }
          return [...prev, { ...line, lineId: `${line.itemId}-${Date.now()}-${prev.length}` }];
        });
        setIsOpen(true);
      },
      setQuantity: (lineId, quantity) =>
        setLines((prev) =>
          quantity <= 0
            ? prev.filter((l) => l.lineId !== lineId)
            : prev.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)),
        ),
      removeLine: (lineId) => setLines((prev) => prev.filter((l) => l.lineId !== lineId)),
      clear: () => setLines([]),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
