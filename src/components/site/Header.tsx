import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { restaurant } from "@/data/menu";
import cheeseLogoFull from "@/assets/cheesy-ocean-logo-full.jpg";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Reviews", id: "reviews" },
  { label: "About Us", id: "about" },
  { label: "Contact Us", id: "contact" },
];

function smoothScroll(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function Header() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <button
          onClick={() => smoothScroll("home")}
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src={cheeseLogoFull}
            alt="Cheesy Ocean logo"
            className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-accent/40"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none font-extrabold text-gradient-gold">
              {restaurant.name}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">Pizza · Karachi</span>
          </span>
        </button>

        <nav className="hidden justify-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => smoothScroll(item.id)}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative rounded-full btn-gold px-4 py-2 text-sm"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-border px-3 py-2 text-sm md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border/60 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                smoothScroll(item.id);
                setOpen(false);
              }}
              className="rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
