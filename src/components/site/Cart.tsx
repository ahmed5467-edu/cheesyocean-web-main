import { Link } from "@tanstack/react-router";
import { formatPrice, restaurant } from "@/data/menu";
import { lineTotal, useCart } from "@/lib/cart";

export function Cart() {
  const { isOpen, closeCart, lines, setQuantity, removeLine, subtotal } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close cart" onClick={closeCart} className="absolute inset-0 bg-black/70" />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-extrabold">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-lg"
          >
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty. Let's fix that.</p>
            <button onClick={closeCart} className="rounded-full btn-gold px-5 py-2.5 text-sm">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {lines.map((line) => (
                <div key={line.lineId} className="surface-card flex gap-3 rounded-2xl p-3">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-bold">{line.name}</h3>
                      <button
                        onClick={() => removeLine(line.lineId)}
                        className="shrink-0 text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {line.sizeLabel ? `${line.sizeLabel} · ` : ""}
                      {formatPrice(line.unitPrice)}
                    </p>
                    {line.toppings.length > 0 && (
                      <p className="text-xs text-accent">
                        {line.toppings.map((t) => t.name).join(", ")}
                      </p>
                    )}
                    {line.instructions && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground italic">
                        “{line.instructions}”
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                        <button
                          aria-label="Decrease"
                          onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-secondary"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{line.quantity}</span>
                        <button
                          aria-label="Increase"
                          onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-secondary"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-accent">
                        {formatPrice(lineTotal(line))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="space-y-3 border-t border-border px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span className="font-semibold">To be confirmed</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-display text-xl font-extrabold text-accent">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="block rounded-full btn-heat py-3 text-center text-sm font-bold"
              >
                Proceed to Checkout
              </Link>

              <a
                href={`tel:${(restaurant.phones[0] ?? "").replace(/-/g, "")}`}
                className="block rounded-full btn-gold py-2.5 text-center text-sm font-bold"
              >
                Call to Place Order
              </a>

              <button
                onClick={closeCart}
                className="w-full rounded-full border border-border py-2.5 text-sm font-semibold"
              >
                Continue Shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
