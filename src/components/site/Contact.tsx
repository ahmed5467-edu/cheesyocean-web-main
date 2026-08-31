import { restaurant } from "@/data/menu";

const mapsLink =
  "https://www.google.com/maps/place/Cheesy+Ocean/@24.9308931,67.0783377,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33f4433cdb3af:0x7129e8bbc6e694d3!8m2!3d24.9308931!4d67.0783377!16s%2Fg%2F11c1s1l9vy?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D";

export function Contact() {
  const primaryPhone = restaurant.phones[0] ?? "";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
          Get in <span className="text-gradient-gold">Touch</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Order now or find us in Karachi</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="surface-card rounded-2xl p-8">
          <h3 className="font-display text-lg font-extrabold text-gradient-gold">Call to Order</h3>
          <ul className="mt-4 space-y-3">
            {restaurant.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="text-sm font-medium text-accent transition-colors hover:text-primary"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="surface-card rounded-2xl p-8">
          <h3 className="font-display text-lg font-extrabold text-gradient-gold">Hours</h3>
          <p className="mt-4 text-sm text-muted-foreground">{restaurant.hours}</p>
          <p className="mt-3 text-xs text-muted-foreground italic">Open for dine-in, delivery & takeout</p>
        </div>

        {/* Location */}
        <div className="surface-card rounded-2xl p-8">
          <h3 className="font-display text-lg font-extrabold text-gradient-gold">Location</h3>
          <p className="mt-4 text-sm text-muted-foreground">{restaurant.address}</p>
          <p className="mt-3">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-accent transition-colors hover:text-primary"
            >
              View on Google Maps →
            </a>
          </p>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-12">
        <div className="relative w-full overflow-hidden rounded-2xl bg-secondary/50 aspect-video flex items-center justify-center border border-border/40">
          <div className="text-center">
            <p className="font-display text-xl font-extrabold text-gradient-gold">Find Us in Karachi</p>
            <p className="mt-2 text-sm text-muted-foreground">Google Maps integration coming soon</p>
            <a
              href="https://maps.google.com/?q=Karachi,+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-accent px-6 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </div>

      {/* Social / Quick Info */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center">
        <h3 className="font-display text-lg font-extrabold">Questions?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team is ready to help. Call us or visit — we'd love to hear from you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={primaryPhone ? `tel:${primaryPhone.replace(/-/g, "")}` : undefined}
            className="rounded-full btn-heat px-6 py-3 text-sm font-bold"
            aria-disabled={!primaryPhone}
            onClick={(event) => {
              if (!primaryPhone) event.preventDefault();
            }}
          >
            Call Now
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            Find Us
          </a>
        </div>
      </div>
    </section>
  );
}
