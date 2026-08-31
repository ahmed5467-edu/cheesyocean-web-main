import { Link } from "@tanstack/react-router";
import type { CategoryId, MenuItem } from "@/data/menu";
import { ProductCard } from "./ProductCard";

export function CategorySection({
  id,
  title,
  tagline,
  items,
  categoryId,
  ctaLabel,
}: {
  id?: string;
  title: string;
  tagline: string;
  items: MenuItem[];
  categoryId: CategoryId;
  ctaLabel: string;
}) {
  return (
    <section id={id} className="py-10">
      <div className="px-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
          </div>
          <Link
            to="/menu/$category"
            params={{ category: categoryId }}
            className="hidden shrink-0 rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 sm:block"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>

      <div className="no-scrollbar mt-5 overflow-x-auto pb-2">
        <div className="flex snap-x snap-mandatory gap-4 px-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="px-4">
        <Link
          to="/menu/$category"
          params={{ category: categoryId }}
          className="mt-3 block rounded-full border border-accent/50 py-3 text-center text-sm font-semibold text-accent sm:hidden"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}
