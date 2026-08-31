import { Link } from "@tanstack/react-router";
import { categories, restaurant } from "@/data/menu";
import cheeseLogoFull from "@/assets/cheesy-ocean-logo-full.jpg";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border/60 bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <img
            src={cheeseLogoFull}
            alt="Cheesy Ocean logo"
            className="h-16 w-16 rounded-lg object-cover ring-1 ring-accent/40"
          />
          <h2 className="mt-3 font-display text-2xl font-extrabold text-gradient-gold">
            {restaurant.name}
          </h2>
          <p className="mt-1 text-xs tracking-[0.2em] text-accent uppercase">Love at first slice</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Fresh dough, real cheese and desi flavours — baked to order every single day.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase">Menu</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/menu/$category"
                  params={{ category: c.id }}
                  className="transition-colors hover:text-accent"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase">Order Now</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {restaurant.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/-/g, "")}`} className="hover:text-accent">
                  {p}
                </a>
              </li>
            ))}
            <li>{restaurant.hours}</li>
            <li>{restaurant.address}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        Developed by Ahmed Khan, contact: uptouploads@gmail.com
      </p>
    </footer>
  );
}
