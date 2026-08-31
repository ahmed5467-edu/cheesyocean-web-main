export function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Hassan",
      rating: 5,
      text: "Really good pizza and generous toppings. The Afghani Tikka is amazing. Delivery was quick even during rush hour!",
      location: "Gulberg, Karachi",
    },
    {
      id: 2,
      name: "Fatima Khan",
      rating: 5,
      text: "Finally a pizza place in Karachi that gets it right. Hand-stretched dough and real cheese. Worth every rupee.",
      location: "DHA, Karachi",
    },
    {
      id: 3,
      name: "Ali Raza",
      rating: 5,
      text: "Ordered for a party of 10. The pizzas arrived hot and fresh. Everyone loved the desi flavors. Highly recommended!",
      location: "Clifton, Karachi",
    },
    {
      id: 4,
      name: "Zainab Malik",
      rating: 5,
      text: "The Tikka Masala pizza is heaven. Love the crunchy crust and the unique Pakistani flavors. This is love at first slice!",
      location: "Saddar, Karachi",
    },
    {
      id: 5,
      name: "Hassan Ahmad",
      rating: 5,
      text: "Best pizza in Karachi without a doubt. The appetizers are also excellent. Became a regular customer in just 3 orders.",
      location: "Karachi",
    },
    {
      id: 6,
      name: "Saira Younis",
      rating: 5,
      text: "Cheesy Ocean has ruined me for other pizza places. The quality is consistent, and customer service is outstanding.",
      location: "Zamzama, Karachi",
    },
  ];

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
          <span className="text-gradient-gold">Loved</span> by Karachi
        </h2>
        <p className="mt-4 text-muted-foreground">Real reviews from real pizza lovers</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="surface-card rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-accent">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
              </div>
            </div>
            <div className="mt-4 border-t border-border/40 pt-4">
              <p className="font-semibold text-foreground">— {review.name}</p>
              <p className="text-xs text-muted-foreground">{review.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
