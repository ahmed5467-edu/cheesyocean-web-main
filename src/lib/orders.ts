import type { CartLine } from "@/lib/cart";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";

export type Order = {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  items: CartLine[];
  subtotal: number;
  deliveryFee: number | null;
  total: number;
  instructions: string;
  status: OrderStatus;
  createdAt: string;
};

export type NewOrderInput = Omit<Order, "orderId" | "status" | "createdAt">;

const STORAGE_KEY = "cheesy-ocean-orders";

function nextOrderNumber(): string {
  try {
    const last = Number(localStorage.getItem("cheesy-ocean-last-order") ?? "1041");
    const next = last + 1;
    localStorage.setItem("cheesy-ocean-last-order", String(next));
    return String(next);
  } catch {
    return String(1042 + Math.floor(Math.random() * 500));
  }
}

/**
 * Temporary frontend-only order creation.
 * Replace the body with a Cloud insert later — the signature stays the same.
 */
export async function createOrder(input: NewOrderInput): Promise<Order> {
  const order: Order = {
    ...input,
    orderId: nextOrderNumber(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Order[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, order]));
  } catch {
    /* ignore storage errors */
  }
  return order;
}

export function getOrder(orderId: string): Order | null {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Order[];
    return all.find((o) => o.orderId === orderId) ?? null;
  } catch {
    return null;
  }
}
