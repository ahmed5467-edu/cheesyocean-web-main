import { formatPrice, startingPrice, type MenuItem } from "@/data/menu";
import { useProductModal } from "@/lib/product-modal";

export function ProductCard({ item, layout = "tile" }: { item: MenuItem; layout?: "tile" | "grid" }) {
  const { openProduct } = useProductModal();
  const hasSizes = Boolean(item.sizes);

  return (
    <button
      type="button"
      onClick={() => openProduct(item)}
      className={`surface-card group flex flex-col overflow-hidden rounded-3xl text-left transition-transform duration-200 hover:-translate-y-1 ${
        layout === "tile" ? "w-[240px] shrink-0 snap-start" : "w-full"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.note && (
          <span className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase backdrop-blur">
            {item.note}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base leading-tight font-bold">{item.name}</h3>
        {item.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-sm font-bold text-accent">
            {hasSizes ? `From ${formatPrice(startingPrice(item))}` : formatPrice(startingPrice(item))}
          </span>
          <span className="rounded-full btn-heat px-3 py-1.5 text-xs font-bold">
            {hasSizes ? "Customize" : "Add"}
          </span>
        </div>
      </div>
    </button>
  );
}
