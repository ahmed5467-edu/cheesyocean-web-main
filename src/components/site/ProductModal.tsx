import { useEffect, useMemo, useState } from "react";
import { extraToppings, formatPrice, type SizeKey } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { useProductModal } from "@/lib/product-modal";

export function ProductModal() {
  const { item, closeProduct } = useProductModal();
  const { addLine } = useCart();
  const [size, setSize] = useState<SizeKey | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (!item) return;
    setSize(item.sizes ? (item.sizes[item.sizes.length - 1]?.key ?? null) : null);
    setQuantity(1);
    setToppings([]);
    setInstructions("");
  }, [item]);

  const selected = useMemo(
    () => item?.sizes?.find((s) => s.key === size) ?? null,
    [item, size],
  );

  const isPizza = item?.category === "classic" || item?.category === "special";
  const unitPrice = selected?.price ?? item?.price ?? 0;
  const toppingTotal = isPizza
    ? extraToppings.filter((t) => toppings.includes(t.id)).reduce((sum, t) => sum + t.price, 0)
    : 0;
  const total = (unitPrice + toppingTotal) * quantity;

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Close"
        onClick={closeProduct}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative max-h-[92vh] w-full max-w-lg animate-[fade-in_0.25s_ease-out] overflow-y-auto rounded-t-3xl border border-border bg-card sm:rounded-3xl">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            width={768}
            height={768}
            className="h-48 w-full object-cover sm:h-56"
          />
          <button
            onClick={closeProduct}
            aria-label="Close product"
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-lg backdrop-blur"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <h2 className="font-display text-2xl font-extrabold">{item.name}</h2>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
            {item.note && <p className="mt-1 text-xs text-accent">{item.note}</p>}
          </div>

          {item.sizes && (
            <div>
              <h3 className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Choose size
              </h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {item.sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSize(s.key)}
                    className={`rounded-2xl border px-2 py-3 text-center transition-colors ${
                      size === s.key
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border bg-secondary/50 text-foreground"
                    }`}
                  >
                    <span className="block text-sm font-bold">{s.label}</span>
                    <span className="block text-xs">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isPizza && (
            <div>
              <h3 className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                Extra toppings
              </h3>
              <div className="mt-2 grid gap-2">
                {extraToppings.map((t) => {
                  const active = toppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() =>
                        setToppings((prev) =>
                          active ? prev.filter((x) => x !== t.id) : [...prev, t.id],
                        )
                      }
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors ${
                        active ? "border-accent bg-accent/10" : "border-border bg-secondary/40"
                      }`}
                    >
                      <span className="font-medium">{t.name}</span>
                      <span className={active ? "font-bold text-accent" : "text-muted-foreground"}>
                        + {formatPrice(t.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {isPizza && (
            <div>
              <label
                htmlFor="instructions"
                className="text-xs font-bold tracking-wide text-muted-foreground uppercase"
              >
                Additional instructions
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={2}
                placeholder="Less spicy, cut in 8 slices…"
                className="mt-2 w-full rounded-2xl border border-border bg-input/60 px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>
          )}


          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-2 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-8 w-8 place-items-center rounded-full bg-background text-lg"
              >
                −
              </button>
              <span className="w-6 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-8 w-8 place-items-center rounded-full bg-background text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addLine({
                  itemId: item.id,
                  name: item.name,
                  image: item.image,
                  unitPrice,
                  quantity,
                  toppings: extraToppings.filter((t) => toppings.includes(t.id)),
                  ...(selected ? { sizeLabel: selected.label } : {}),
                  ...(instructions.trim() ? { instructions: instructions.trim() } : {}),
                });
                closeProduct();
              }}
              className="flex-1 rounded-full btn-heat px-5 py-3 text-sm font-bold"
            >
              Add to Cart · {formatPrice(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
