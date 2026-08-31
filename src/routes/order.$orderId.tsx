import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatPrice, restaurant } from "@/data/menu";
import { lineTotal } from "@/lib/cart";
import { getOrder, type Order } from "@/lib/orders";

export const Route = createFileRoute("/order/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Cheesy Ocean" },
      {
        name: "description",
        content:
          "Your Cheesy Ocean order has been received. We'll call you to confirm the order and delivery fee.",
      },
      { property: "og:title", content: "Order Confirmed — Cheesy Ocean" },
      {
        property: "og:description",
        content: "Thank you for ordering from Cheesy Ocean — love at first slice.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getOrder(orderId));
    setReady(true);
  }, [orderId]);

  if (!ready) return <div className="px-4 py-24 text-center text-sm text-muted-foreground">Loading…</div>;

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Order not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find order #{orderId} on this device.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-full btn-heat px-6 py-3 text-sm font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <div className="surface-card rounded-3xl p-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-3xl">
          🎉
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Order Placed!</h1>
        <p className="mt-1 font-display text-xl font-extrabold text-accent">
          Order #{order.orderId}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you for ordering from {restaurant.name}. Your order has been received and the
          restaurant will contact you on your provided phone/WhatsApp number to confirm the order and
          delivery fee.
        </p>
      </div>

      <section className="surface-card mt-5 rounded-3xl p-5">
        <h2 className="font-display text-lg font-extrabold text-gradient-gold">Order Details</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Name</dt>
            <dd className="font-semibold">{order.customerName}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Phone / WhatsApp</dt>
            <dd className="font-semibold">{order.phone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-muted-foreground uppercase">Delivery address</dt>
            <dd className="font-semibold">{order.address}</dd>
            {order.latitude != null && order.longitude != null && (
              <dd className="text-xs text-accent">
                Pinned at {order.latitude.toFixed(4)}, {order.longitude.toFixed(4)}
              </dd>
            )}
          </div>
          {order.instructions && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase">Instructions</dt>
              <dd className="text-muted-foreground italic">“{order.instructions}”</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="surface-card mt-5 rounded-3xl p-5">
        <h2 className="font-display text-lg font-extrabold text-gradient-gold">Your Items</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((line) => (
            <li key={line.lineId} className="flex justify-between gap-3 border-b border-border/50 pb-3">
              <div className="min-w-0">
                <p className="text-sm font-bold">
                  {line.name} <span className="text-muted-foreground">× {line.quantity}</span>
                </p>
                {line.sizeLabel && <p className="text-xs text-muted-foreground">{line.sizeLabel}</p>}
                {line.toppings.length > 0 && (
                  <p className="text-xs text-accent">
                    {line.toppings.map((t) => t.name).join(", ")}
                  </p>
                )}
                {line.instructions && (
                  <p className="text-[11px] text-muted-foreground italic">“{line.instructions}”</p>
                )}
              </div>
              <span className="text-sm font-bold">{formatPrice(lineTotal(line))}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery fee</span>
            <span className="font-semibold">To be confirmed</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-bold">Total</span>
            <span className="font-display text-2xl font-extrabold text-accent">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </section>

      <Link
        to="/"
        className="mt-6 block rounded-full btn-heat py-4 text-center text-base font-extrabold tracking-wide"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
