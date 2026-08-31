import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice } from "@/data/menu";
import { lineTotal, useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Cheesy Ocean" },
      {
        name: "description",
        content:
          "Confirm your Cheesy Ocean order: delivery details, location and order summary before placing your order.",
      },
      { property: "og:title", content: "Checkout — Cheesy Ocean" },
      {
        property: "og:description",
        content: "Enter your delivery details and place your Cheesy Ocean order.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  function pickLocation() {
    setLocating(true);
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        () => {
          // Mock fallback (Karachi) until a real map provider is configured.
          setCoords({ lat: 24.8607, lng: 67.0011 });
          setLocating(false);
        },
        { timeout: 8000 },
      );
    } else {
      setCoords({ lat: 24.8607, lng: 67.0011 });
      setLocating(false);
    }
  }

  async function placeOrder() {
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "Please enter your full name.";
    if (!/^[0-9+\-\s]{10,}$/.test(phone.trim()))
      next["phone"] = "Enter a valid WhatsApp / phone number.";
    if (address.trim().length < 8) next["address"] = "Please enter your full delivery address.";
    setErrors(next);
    if (Object.keys(next).length > 0 || lines.length === 0) return;

    setPlacing(true);
    const order = await createOrder({
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      items: lines,
      subtotal,
      deliveryFee: null,
      total: subtotal,
      instructions: instructions.trim(),
    });
    clear();
    navigate({ to: "/order/$orderId", params: { orderId: order.orderId } });
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few slices before heading to checkout.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-full btn-heat px-6 py-3 text-sm font-bold">
          Browse the Menu
        </Link>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-2xl border border-border bg-input/60 px-4 py-3 text-sm outline-none focus:border-accent";
  const label = "text-xs font-bold tracking-wide text-muted-foreground uppercase";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Almost there — tell us where to send the cheese.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="surface-card rounded-3xl p-5">
            <h2 className="font-display text-lg font-extrabold text-gradient-gold">
              Customer Information
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className={label}>
                  Full name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={field}
                />
                {errors["name"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className={label}>
                  WhatsApp / Phone number
                </label>
                <input
                  id="phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your WhatsApp or phone number"
                  className={field}
                />
                {errors["phone"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>
                )}
              </div>
            </div>
          </section>

          <section className="surface-card rounded-3xl p-5">
            <h2 className="font-display text-lg font-extrabold text-gradient-gold">
              Delivery Information
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="address" className={label}>
                  Full delivery address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / flat, street, area, nearest landmark"
                  className={field}
                />
                {errors["address"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["address"]}</p>
                )}
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-4">
                <p className={label}>Location on map</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pin your location so the rider finds you faster.
                </p>
                <button
                  type="button"
                  onClick={pickLocation}
                  className="mt-3 w-full rounded-full btn-gold px-5 py-2.5 text-sm font-bold"
                >
                  {locating ? "Locating…" : coords ? "Update location" : "📍 Select my location"}
                </button>
                {coords && (
                  <p className="mt-2 text-center text-xs text-accent">
                    Pinned at {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="surface-card rounded-3xl p-5">
            <h2 className="font-display text-lg font-extrabold text-gradient-gold">
              Additional Instructions
            </h2>
            <textarea
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Any special instructions for your order?"
              className={field}
            />
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <section className="surface-card rounded-3xl p-5">
            <h2 className="font-display text-lg font-extrabold text-gradient-gold">Order Summary</h2>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.lineId} className="flex gap-3 border-b border-border/50 pb-3">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">
                      {line.name} <span className="text-muted-foreground">× {line.quantity}</span>
                    </p>
                    {line.sizeLabel && (
                      <p className="text-xs text-muted-foreground">{line.sizeLabel}</p>
                    )}
                    {line.toppings.length > 0 && (
                      <p className="text-xs text-accent">
                        {line.toppings.map((t) => t.name).join(", ")}
                      </p>
                    )}
                    {line.instructions && (
                      <p className="text-[11px] text-muted-foreground italic">
                        “{line.instructions}”
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-bold">{formatPrice(lineTotal(line))}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery fee</span>
                <span className="font-semibold">To be confirmed</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-bold">Total</span>
                <span className="font-display text-2xl font-extrabold text-accent">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing}
              className="mt-5 w-full rounded-full btn-heat py-4 text-base font-extrabold tracking-wide disabled:opacity-60"
            >
              {placing ? "PLACING ORDER…" : "PLACE ORDER"}
            </button>
            <Link
              to="/"
              className="mt-3 block rounded-full border border-border py-2.5 text-center text-sm font-semibold"
            >
              Continue Shopping
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
