# Ocean Pizza Online

Build Part 1 of a modern, premium, mobile-first customer-facing website for Cheesy Ocean, a pizza restaurant.

I am attaching an image of Cheesy Ocean's current menu. Use the attached menu image as the source of truth for all menu item names, categories, sizes, and prices. Do not invent or change the listed prices.

For this stage, focus ONLY on the customer-facing website and menu browsing experience. Do not build the kitchen/admin dashboard, Supabase integration, backend, authentication, online payments, or delivery system yet.

Overall website structure

Create a polished restaurant homepage with:

Header/navigation

Hero section

Featured/popular items

Appetizers section

Pizza sections

Special flavours

Drinks/extras

About/restaurant section

Location/contact section

Footer

The main goal is to make the website feel like a real online pizza ordering platform, not simply a restaurant information website.

Menu presentation

Do NOT display the entire menu immediately on the homepage.

For each major category, show a horizontal row/carousel containing approximately 3–4 featured items.

For example:

Appetizers

[Image] Creamy Pasta
[Image] Cheesy Lasagna
[Image] Mexican Sandwich
[Image] Mozzarella Cheese Sandwich

Then show a clear button:

See All Appetizers →

When the customer clicks "See All Appetizers", take them to a dedicated menu/category view showing all appetizer items from the attached menu, each with:

AI-generated food image

Item name

Price

Short description if appropriate

Add/Customize button

Pizza section

Create a prominent Pizza section because pizza is the restaurant's main product.

Show pizza items with attractive food images and their available sizes/prices.

Use the exact pizza flavours from the attached menu, including the Classic Flavours and Special Flavours.

Organize them clearly into:

Classic Flavours

Spicy Flavours

Mild Flavours

Non-Spicy Flavours

Special Flavours

Each pizza should have its own attractive food image.

Since accurate photographs of every menu item are not available, use appropriate AI-generated food imagery/placeholders for the products. The images should look like realistic professional restaurant food photography and should visually match the item name.

Do not make the images look obviously AI-generated.

Product interaction

When a customer clicks a pizza or other food item, open a polished product customization modal/page.

For pizzas, allow:

Small

Medium

Large

Display the correct price according to the attached menu.

Also include:

Quantity selector

Extra toppings

Additional instructions

Add to Cart button

For now, the cart can use frontend state/localStorage. No backend is required yet.

Cart

Create a functional cart UI.

Customers should be able to:

See selected items

Change quantity

Remove items

See subtotal

Continue shopping

Proceed to checkout

Checkout itself can be a placeholder for the next development stage.

Design direction

The existing menu image uses a strong red, dark, yellow/orange visual identity. Take inspiration from that branding while making the website much more modern and premium.

Use:

Deep red/dark background elements

Warm yellow/orange accents

White/light text

Premium food photography

Rounded cards

Subtle shadows/glows

Smooth animations

Clean modern typography

Do NOT simply copy the menu image's design. Modernize it into a professional restaurant website.

The website should feel similar in quality to a modern food-ordering website.

Responsive design

This is primarily a mobile-first website because most customers will access it from their phones.

Make sure:

Menu cards work beautifully on mobile

Horizontal item sections can be swiped

Buttons are easy to tap

Product customization works well on small screens

Cart is easy to access

Desktop/tablet layouts are also responsive

Technical requirements

Use React and keep the project modular.

Create clean reusable components for:

Header

Hero

CategorySection

ProductCard

ProductModal

MenuCategory

PizzaCard

Cart

Footer

Keep menu information in a separate clean data structure/file so that later we can replace the static data with Supabase without rebuilding the UI.

For now:

DO NOT use Supabase.
DO NOT create a backend.
DO NOT create a kitchen dashboard.
DO NOT implement authentication.
DO NOT implement online payments.
DO NOT implement delivery calculations.

The purpose of this stage is to build the polished customer-facing restaurant website and menu/cart experience.

Use the attached Cheesy Ocean menu image carefully and make sure every menu item and price is represented accurately.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cheesy-ocean-delight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e9f30db4-a87e-4eb1-873c-d1b982f452da).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
