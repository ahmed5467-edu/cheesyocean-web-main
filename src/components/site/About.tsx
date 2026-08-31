import { restaurant } from "@/data/menu";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
            Cheesy <span className="text-gradient-gold">Ocean</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We started with a simple idea: bring authentic, hand-crafted pizza to Karachi without compromises. No frozen dough, no artificial flavors, no shortcuts.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every pizza begins with hand-stretched dough that's been rested and shaped to order. We source real mozzarella, fresh toppings, and blend them with the desi flavors Karachiites love — tikka masala, nihari spice, and more.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our ovens run hot. Our passion runs hotter. Every order gets the same care whether it's your first pizza or your fiftieth. We believe Karachi deserves cheesy, delicious pizza that celebrates both tradition and innovation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This is love at first slice.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div>
              <p className="font-display text-2xl font-extrabold text-gradient-gold">100%</p>
              <p className="text-xs text-muted-foreground">Fresh daily</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-gradient-gold">27+</p>
              <p className="text-xs text-muted-foreground">Unique flavors</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-gradient-gold">30 min</p>
              <p className="text-xs text-muted-foreground">Average prep</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="surface-card rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl font-extrabold text-gradient-gold">{restaurant.name}</h3>
            <p className="mt-2 text-sm text-accent">Love at first slice</p>
            <p className="mt-4 text-xs text-muted-foreground">
              {restaurant.address}
              <br />
              {restaurant.hours}
            </p>
            <div className="mt-6 space-y-2">
              {restaurant.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="block text-sm font-medium text-accent transition-colors hover:text-primary"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
