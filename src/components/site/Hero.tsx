import { Link } from "@tanstack/react-router";
import heroPizza from "@/assets/hero-pizza.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 pt-6 pb-8 md:grid-cols-2 md:items-center md:pt-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
            Fresh from the oven
          </span>
          <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl md:text-5xl">
            Karachi's <span className="text-gradient-gold">cheesiest</span> pizza, delivered hot.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Hand-stretched dough, a molten mozzarella blanket and desi flavours you already love.
            Order in a few taps.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/menu/$category"
              params={{ category: "classic" }}
              className="rounded-full btn-heat px-6 py-3 text-sm font-bold"
            >
              Order Pizza Now
            </Link>
            <Link
              to="/menu/$category"
              params={{ category: "appetizers" }}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse Menu
            </Link>
          </div>
          <dl className="mt-8 grid max-w-sm grid-cols-3 gap-3 text-center">
            {[
              ["27+", "Flavours"],
              ["Rs 300", "Pizza from"],
              ["30 min", "Avg. prep"],
            ].map(([value, label]) => (
              <div key={label} className="surface-card rounded-2xl px-2 py-2">
                <dt className="font-display text-lg font-extrabold text-accent">{value}</dt>
                <dd className="text-[11px] text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-6 rounded-full bg-primary/40 blur-3xl" />
          <img
            src={heroPizza}
            alt="Wood-fired Cheesy Ocean pizza with a cheese pull"
            width={1280}
            height={1280}
            className="relative w-full rounded-[2rem] object-cover shadow-[var(--shadow-card)]"
          />
        </div>
      </div>
    </section>
  );
}
