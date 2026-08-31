import { createFileRoute, notFound } from "@tanstack/react-router";
import { MenuCategory } from "@/components/site/MenuCategory";
import {
  categories,
  classicGroups,
  itemsByCategory,
  extraToppings,
  formatPrice,
  type CategoryId,
} from "@/data/menu";

const validIds = categories.map((c) => c.id) as string[];

export const Route = createFileRoute("/menu/$category")({
  loader: ({ params }) => {
    if (!validIds.includes(params.category)) throw notFound();
    const category = categories.find((c) => c.id === params.category)!;
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Menu not found — Cheesy Ocean" }, { name: "robots", content: "noindex" }],
      };
    }
    const { title, tagline } = loaderData.category;
    return {
      meta: [
        { title: `${title} — Cheesy Ocean Menu` },
        { name: "description", content: `${tagline}. Order ${title.toLowerCase()} from Cheesy Ocean Karachi.` },
        { property: "og:title", content: `${title} — Cheesy Ocean` },
        { property: "og:description", content: tagline },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const id = category.id as CategoryId;
  const items = itemsByCategory(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{category.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{category.tagline}</p>

      {id === "classic" ? (
        classicGroups.map((group) => (
          <MenuCategory
            key={group}
            title={group}
            variant="pizza"
            items={items.filter((i) => i.group === group)}
          />
        ))
      ) : (
        <MenuCategory variant={id === "special" ? "pizza" : "product"} items={items} />
      )}

      {(id === "special" || id === "classic") && (
        <section className="surface-card mt-10 rounded-3xl p-6">
          <h2 className="font-display text-lg font-extrabold text-gradient-gold">Extra Toppings</h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {extraToppings.map((t) => (
              <li key={t.id} className="flex justify-between border-b border-border/50 pb-2">
                <span>{t.name}</span>
                <span className="font-semibold text-foreground">{formatPrice(t.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
