import type { MenuItem } from "@/data/menu";
import { ProductCard } from "./ProductCard";
import { PizzaCard } from "./PizzaCard";

export function MenuCategory({
  title,
  items,
  variant = "product",
}: {
  title?: string;
  items: MenuItem[];
  variant?: "product" | "pizza";
}) {
  return (
    <section className="mt-8">
      {title && (
        <h2 className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-1.5 font-display text-sm font-extrabold tracking-wide text-accent uppercase">
          {title}
        </h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) =>
          variant === "pizza" ? (
            <PizzaCard key={item.id} item={item} />
          ) : (
            <ProductCard key={item.id} item={item} layout="grid" />
          ),
        )}
      </div>
    </section>
  );
}
