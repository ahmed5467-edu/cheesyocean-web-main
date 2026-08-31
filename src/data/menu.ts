import creamyPasta from "@/assets/creamy-pasta.jpg";
import cheesyLasagna from "@/assets/cheesy-lasagna.jpg";
import mexicanSandwich from "@/assets/mexican-sandwich.jpg";
import mozzarellaSandwich from "@/assets/mozzarella-sandwich.jpg";
import pizzaFries from "@/assets/pizza-fries.jpg";
import calzone from "@/assets/calzone.jpg";
import nuggets from "@/assets/nuggets.jpg";
import cheeseBread from "@/assets/cheese-bread.jpg";
import pizzaRoll from "@/assets/pizza-roll.jpg";
import dipSauce from "@/assets/dip-sauce.jpg";
import pizzaSpicy from "@/assets/pizza-spicy.jpg";
import pizzaMild from "@/assets/pizza-mild.jpg";
import pizzaNonSpicy from "@/assets/pizza-nonspicy.jpg";
import pizzaSpecial from "@/assets/pizza-special.jpg";
import beverages from "@/assets/beverages.jpg";

/**
 * Static menu data — mirrors the printed Cheesy Ocean menu exactly.
 * Shape is intentionally simple so it can later be served from a database
 * without changing any UI component.
 */

export type SizeKey = "small" | "medium" | "large";

export type MenuItem = {
  id: string;
  name: string;
  note?: string;
  description?: string;
  image: string;
  category: CategoryId;
  group?: string;
  /** Single fixed price (appetizers, drinks, extras) */
  price?: number;
  /** Size-based pricing (pizzas) */
  sizes?: { key: SizeKey; label: string; price: number }[];
};

export type CategoryId = "appetizers" | "classic" | "special" | "drinks";

export type Category = {
  id: CategoryId;
  title: string;
  tagline: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: "appetizers",
    title: "Appetizers",
    tagline: "Starters worth arriving early for",
    href: "/menu/appetizers",
  },
  {
    id: "classic",
    title: "Classic Flavours",
    tagline: "Spicy, mild & non-spicy — Rs 300 to Rs 800",
    href: "/menu/classic",
  },
  {
    id: "special",
    title: "Special Flavours",
    tagline: "Our loaded signature pizzas",
    href: "/menu/special",
  },
  {
    id: "drinks",
    title: "Drinks & Extras",
    tagline: "Chilled bottles and extra toppings",
    href: "/menu/drinks",
  },
];

const classicSizes = [
  { key: "small" as const, label: "Small", price: 300 },
  { key: "medium" as const, label: "Medium", price: 500 },
  { key: "large" as const, label: "Large", price: 800 },
];

const specialSizes = [
  { key: "small" as const, label: "Small", price: 500 },
  { key: "medium" as const, label: "Medium", price: 800 },
  { key: "large" as const, label: "Large", price: 1200 },
];

const classic = (
  name: string,
  group: string,
  image: string,
  description: string,
  note?: string,
): MenuItem => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  ...(note ? { note } : {}),
  description,
  image,
  category: "classic",
  group,
  sizes: classicSizes,
});

const special = (name: string, description: string): MenuItem => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  description,
  image: pizzaSpecial,
  category: "special",
  group: "Special Flavours",
  sizes: specialSizes,
});

export const appetizers: MenuItem[] = [
  {
    id: "creamy-pasta",
    name: "Creamy Pasta",
    note: "Regular",
    description: "Silky white sauce pasta tossed with tender chicken and herbs.",
    image: creamyPasta,
    category: "appetizers",
    price: 500,
  },
  {
    id: "cheesy-lasagna",
    name: "Cheesy Lasagna",
    note: "Regular",
    description: "Layered pasta baked with rich sauce and a mozzarella blanket.",
    image: cheesyLasagna,
    category: "appetizers",
    price: 500,
  },
  {
    id: "mexican-sandwich",
    name: "Mexican Sandwich",
    note: "Regular",
    description: "Smoky grilled chicken, jalapeños and molten cheddar.",
    image: mexicanSandwich,
    category: "appetizers",
    price: 700,
  },
  {
    id: "mozarella-cheese-sandwich",
    name: "Mozarella Cheese Sandwich",
    note: "Regular",
    description: "Golden toasted bread with a serious mozzarella pull.",
    image: mozzarellaSandwich,
    category: "appetizers",
    price: 500,
  },
  {
    id: "pizza-fries",
    name: "Pizza Fries",
    note: "Large",
    description: "Crispy fries loaded with pizza sauce, chicken and cheese.",
    image: pizzaFries,
    category: "appetizers",
    price: 600,
  },
  {
    id: "creamy-calzone",
    name: "Creamy Calzone",
    description: "Folded pizza dough stuffed with creamy chicken and cheese.",
    image: calzone,
    category: "appetizers",
    price: 850,
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    note: "6 pcs",
    description: "Six crunchy nuggets served with dip.",
    image: nuggets,
    category: "appetizers",
    price: 400,
  },
  {
    id: "cheese-bread",
    name: "Cheese Bread",
    description: "Warm bread baked with garlic butter and cheese.",
    image: cheeseBread,
    category: "appetizers",
    price: 100,
  },
  {
    id: "pizza-roll",
    name: "Pizza Roll",
    description: "Oven-baked rolls filled with chicken, sauce and cheese.",
    image: pizzaRoll,
    category: "appetizers",
    price: 500,
  },
  {
    id: "dip-sauce",
    name: "Dip Sauce",
    description: "Choose your favourite house dip.",
    image: dipSauce,
    category: "appetizers",
    price: 60,
  },
];

export const classicPizzas: MenuItem[] = [
  classic(
    "Arabic Shawarma",
    "Spicy Flavours",
    pizzaSpicy,
    "Shawarma-spiced chicken with garlic sauce and a fiery kick.",
  ),
  classic("Tandoori Tarka", "Spicy Flavours", pizzaSpicy, "Tandoori masala chicken with tarka heat."),
  classic(
    "Pepperoni Punch",
    "Spicy Flavours",
    pizzaSpicy,
    "Bold pepperoni-style topping over spicy tomato base.",
    "No Chicken",
  ),
  classic("Chicken Fajita", "Spicy Flavours", pizzaSpicy, "Fajita chicken, peppers and onions."),
  classic("BBQ Tikka", "Spicy Flavours", pizzaSpicy, "Smoky BBQ tikka chunks with melted cheese."),
  classic(
    "Cheesy Ocean Classic",
    "Mild Flavours",
    pizzaMild,
    "Our signature house pizza — balanced, cheesy, always right.",
  ),
  classic("Pakistani Shawarma", "Mild Flavours", pizzaMild, "Desi shawarma chicken with creamy garlic drizzle."),
  classic("Veggie Special", "Mild Flavours", pizzaMild, "Garden vegetables over herbed tomato sauce.", "No Chicken"),
  classic("Creamy Tikka", "Mild Flavours", pizzaMild, "Tikka chicken folded into a mild cream sauce."),
  classic("Behari Boti", "Mild Flavours", pizzaMild, "Behari-marinated boti with soft mozzarella."),
  classic("Afghani Boti", "Non-Spicy Flavours", pizzaNonSpicy, "Mellow afghani boti with white sauce."),
  classic("Afghani Juicy", "Non-Spicy Flavours", pizzaNonSpicy, "Juicy afghani chicken, extra creamy."),
  classic("Chicken Smoke", "Non-Spicy Flavours", pizzaNonSpicy, "Lightly smoked chicken and cheese."),
  classic("Cheese Lover", "Non-Spicy Flavours", pizzaNonSpicy, "A triple-cheese pizza for purists.", "No Chicken"),
  classic("Malai Boti", "Non-Spicy Flavours", pizzaNonSpicy, "Malai boti in a rich white base."),
];

export const specialPizzas: MenuItem[] = [
  special("Creamy Super Max", "Loaded creamy pizza with a maximum topping stack."),
  special("Cheesy Ranch", "Ranch drizzle, chicken and a heavy cheese load."),
  special("Spicy Italian", "Italian herbs with a proper chilli kick."),
  special("Creamy Kababi", "Kabab chunks in a creamy signature sauce."),
  special("Spicy Super Max", "Max toppings, max heat."),
  special("Cheesy Lava", "Cheese-flooded pizza with a molten centre."),
  special("Creamy Italian", "Italian herbs in a smooth cream base."),
  special("Jungle Feast", "A wild mix of every house favourite topping."),
  special("Ocean Arabian Green", "Arabian spices with fresh green peppers."),
  special("Supreme Tarka", "Supreme toppings finished with desi tarka."),
  special("Italian Lite", "A lighter Italian build for easy eating."),
  special("Chicken Challenger", "Our heaviest chicken loaded pizza."),
];

export const drinks: MenuItem[] = [
  {
    id: "drink-1-5l",
    name: "Soft Drink 1.5 Litre",
    description: "Chilled bottle, perfect for sharing.",
    image: beverages,
    category: "drinks",
    group: "Beverages",
    price: 230,
  },
  {
    id: "drink-1l",
    name: "Soft Drink 1 Litre",
    description: "Chilled bottle for two.",
    image: beverages,
    category: "drinks",
    group: "Beverages",
    price: 170,
  },
  {
    id: "drink-500ml",
    name: "Soft Drink 500 ml",
    description: "Personal chilled bottle.",
    image: beverages,
    category: "drinks",
    group: "Beverages",
    price: 120,
  },
  {
    id: "drink-345ml",
    name: "Soft Drink 345 ml",
    description: "Classic chilled can-size bottle.",
    image: beverages,
    category: "drinks",
    group: "Beverages",
    price: 80,
  },
];

export type Topping = { id: string; name: string; price: number };

export const extraToppings: Topping[] = [
  { id: "meat", name: "Extra Meat", price: 100 },
  { id: "cheese", name: "Extra Cheese", price: 100 },
  { id: "veggie", name: "Extra Veggie", price: 100 },
  { id: "mayo", name: "Extra Mayo", price: 50 },
];

export const pizzas: MenuItem[] = [...classicPizzas, ...specialPizzas];

export const allItems: MenuItem[] = [...appetizers, ...pizzas, ...drinks];

export const classicGroups = ["Spicy Flavours", "Mild Flavours", "Non-Spicy Flavours"] as const;

export function itemsByCategory(id: CategoryId): MenuItem[] {
  if (id === "appetizers") return appetizers;
  if (id === "classic") return classicPizzas;
  if (id === "special") return specialPizzas;
  return drinks;
}

export function startingPrice(item: MenuItem): number {
  if (item.price != null) return item.price;
  return item.sizes ? Math.min(...item.sizes.map((s) => s.price)) : 0;
}

export function formatPrice(value: number): string {
  return `Rs ${value.toLocaleString("en-PK")}/-`;
}

export const restaurant = {
  name: "Cheesy Ocean",
  phones: ["0213-6362326", "0332-3262326", "0335-3262326"],
  hours: "Daily · 1:00 PM – 2:00 AM",
  address: "R685, Karachi, Federal B Area Block 15 Gulberg Town, Karachi, 75950, Pakistan",
};
