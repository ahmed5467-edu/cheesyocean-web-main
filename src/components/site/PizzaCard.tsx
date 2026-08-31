import { formatPrice, type MenuItem } from "@/data/menu";
import { useProductModal } from "@/lib/product-modal";

export function PizzaCard({ item }: { item: MenuItem }) {
  const { openProduct } = useProductModal();

  return (
    <article className="surface-card group overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4">
          <h3 className="font-display text-lg leading-tight font-extrabold">
            {item.name}
            {item.note && (
              <span className="ml-2 align-middle text-[10px] font-semibold text-muted-foreground uppercase">
                {item.note}
              </span>
            )}
          </h3>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
        <div className="flex flex-wrap gap-2">
          {item.sizes?.map((s) => (
            <span
              key={s.key}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-semibold"
            >
              {s.label} · <span className="text-accent">{formatPrice(s.price)}</span>
            </span>
          ))}
        </div>
        <button
          onClick={() => openProduct(item)}
          className="w-full rounded-full btn-heat py-2.5 text-sm font-bold"
        >
          Customize & Add
        </button>
      </div>
    </article>
  );
}
