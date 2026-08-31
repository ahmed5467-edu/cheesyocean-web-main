import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { CategorySection } from "@/components/site/CategorySection";
import { Reviews } from "@/components/site/Reviews";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { appetizers, classicPizzas, specialPizzas, drinks, restaurant } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cheesy Ocean — Karachi's Cheesiest Pizza, Delivered Hot" },
      {
        name: "description",
        content:
          "Order hand-stretched pizzas, creamy pastas and loaded appetizers from Cheesy Ocean Karachi. Classic flavours from Rs 300.",
      },
      { property: "og:title", content: "Cheesy Ocean — Love at First Slice" },
      {
        property: "og:description",
        content: "Fresh dough, real cheese and desi flavours, baked to order daily in Karachi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HOME SECTION */}
      <section id="home">
        <Hero />
      </section>

      {/* MENU SECTION */}
      <section id="menu">
        <div className="pt-8 sm:pt-12">
          <div className="px-4 pb-4">
            <h2 className="font-display text-4xl font-extrabold text-gradient-gold">Menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Explore our signature pizzas and desi flavors</p>
          </div>
        </div>

        <CategorySection
          title="Special Flavours"
          tagline="Our loaded signature pizzas — from Rs 500"
          items={specialPizzas.slice(0, 8)}
          categoryId="special"
          ctaLabel="See all"
        />
        <CategorySection
          title="Classic Flavours"
          tagline="Spicy, mild & non-spicy — from Rs 300"
          items={classicPizzas.slice(0, 8)}
          categoryId="classic"
          ctaLabel="See all"
        />
        <CategorySection
          title="Appetizers"
          tagline="Starters worth arriving early for"
          items={appetizers.slice(0, 8)}
          categoryId="appetizers"
          ctaLabel="See all"
        />
        <CategorySection
          title="Drinks & Extras"
          tagline="Chilled bottles to go with the cheese"
          items={drinks}
          categoryId="drinks"
          ctaLabel="See all"
        />
      </section>

      {/* REVIEWS SECTION */}
      <Reviews />

      {/* ABOUT US SECTION */}
      <About />

      {/* CONTACT US SECTION */}
      <Contact />

      {/* FOOTER-LIKE INFO SECTION */}
      <section className="mx-auto mt-6 max-w-6xl px-4 pb-8">
        <div className="surface-card grid gap-4 rounded-3xl p-6 sm:grid-cols-3 text-sm text-muted-foreground">
          <div>
            <h3 className="font-display text-sm font-extrabold text-gradient-gold">Quick Order</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {restaurant.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/-/g, "")}`} className="hover:text-accent">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-gradient-gold">Hours</h3>
            <p className="mt-2 text-xs">{restaurant.hours}</p>
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-gradient-gold">Location</h3>
            <p className="mt-2 text-xs">{restaurant.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
