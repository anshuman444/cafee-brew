export interface MenuItem {
  id: number;
  name: string;
  price: string;
  category: "Coffee" | "Espresso" | "Cappuccino" | "Latte" | "Cold Coffee" | "Tea" | "Breakfast" | "Snacks" | "Sandwiches" | "Desserts" | "Signature Specials";
  description: string;
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
  calories?: string;
  milkOption?: boolean;
  waterOption?: boolean;
  addons?: { name: string; price: string }[];
}

export const menuItems: MenuItem[] = [
  // Espresso
  {
    id: 1,
    name: "Classic Espresso",
    price: "₹120",
    category: "Espresso",
    description: "Rich and bold double shot of our house espresso blend.",
    image: "/assets/menu/coffee-1.png",
    featured: true,
    bestSeller: true,
    calories: "5 kcal",
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Organic Honey", price: "₹20" }
    ]
  },
  {
    id: 2,
    name: "Espresso Macchiato",
    price: "₹140",
    category: "Espresso",
    description: "Espresso marked with a small dollop of creamy steamed milk foam.",
    image: "/assets/menu/coffee-2.png",
    calories: "25 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Vanilla Drizzle", price: "₹20" }
    ]
  },
  
  // Cappuccino
  {
    id: 3,
    name: "Signature Cappuccino",
    price: "₹180",
    category: "Cappuccino",
    description: "Espresso with equal parts steamed milk and deep foam layer, topped with cocoa powder.",
    image: "/assets/menu/coffee-3.png",
    featured: true,
    bestSeller: true,
    calories: "120 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Caramel Sauce", price: "₹30" },
      { name: "Cinnamon Sprinkle", price: "₹10" }
    ]
  },
  {
    id: 4,
    name: "Vanilla Bean Cappuccino",
    price: "₹200",
    category: "Cappuccino",
    description: "Our signature cappuccino infused with premium natural Madagascar vanilla bean syrup.",
    image: "/assets/menu/coffee-4.png",
    calories: "160 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Whipped Cream", price: "₹25" }
    ]
  },
  
  // Latte
  {
    id: 5,
    name: "Cafe Latte",
    price: "₹170",
    category: "Latte",
    description: "Rich espresso balanced with silky smooth steamed milk and a light layer of foam.",
    image: "/assets/menu/coffee-5.png",
    featured: true,
    calories: "150 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Vanilla Syrup", price: "₹20" },
      { name: "Hazelnut Syrup", price: "₹20" }
    ]
  },
  {
    id: 6,
    name: "Salted Caramel Latte",
    price: "₹210",
    category: "Latte",
    description: "Espresso with steamed milk, buttery salted caramel syrup, and a pinch of sea salt.",
    image: "/assets/menu/coffee-2.png",
    bestSeller: true,
    calories: "220 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Whipped Cream", price: "₹25" },
      { name: "Caramel Drizzle", price: "₹20" }
    ]
  },
  
  // Coffee
  {
    id: 7,
    name: "Americano",
    price: "₹140",
    category: "Coffee",
    description: "Espresso shots topped with hot water, yielding a light layer of crema.",
    image: "/assets/menu/coffee-4.png",
    featured: true,
    calories: "10 kcal",
    waterOption: true,
    addons: [
      { name: "Extra Shot", price: "₹40" },
      { name: "Pour of Cream", price: "₹20" }
    ]
  },
  {
    id: 8,
    name: "Premium Pour Over",
    price: "₹220",
    category: "Coffee",
    description: "Single-origin beans brewed meticulously using a V60 for a clean, nuanced flavor profile.",
    image: "/assets/menu/coffee-3.png",
    featured: true,
    calories: "2 kcal",
    waterOption: true,
    addons: [
      { name: "Splash of Oat Milk", price: "₹25" }
    ]
  },

  // Cold Coffee
  {
    id: 9,
    name: "Nitro Cold Brew",
    price: "₹240",
    category: "Cold Coffee",
    description: "Slow-steeped cold brew infused with nitrogen for a rich, creamy head and smooth texture.",
    image: "/assets/menu/coffee-1.png",
    featured: true,
    bestSeller: true,
    calories: "5 kcal",
    addons: [
      { name: "Sweet Vanilla Cream", price: "₹30" },
      { name: "Caramel Cold Foam", price: "₹40" }
    ]
  },
  {
    id: 10,
    name: "Iced Blended Frappe",
    price: "₹220",
    category: "Cold Coffee",
    description: "Rich coffee blended with milk, ice, and syrup, topped with sweet whipped cream.",
    image: "/assets/menu/coffee-5.png",
    calories: "320 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Espresso Shot", price: "₹40" },
      { name: "Chocolate Chips", price: "₹20" },
      { name: "Caramel Drizzle", price: "₹20" }
    ]
  },

  // Tea
  {
    id: 11,
    name: "Organic Matcha Latte",
    price: "₹230",
    category: "Tea",
    description: "Stone-ground Japanese green Uji matcha whisked with steamed milk.",
    image: "/assets/menu/coffee-3.png",
    bestSeller: true,
    calories: "140 kcal",
    milkOption: true,
    addons: [
      { name: "Boba Pearls", price: "₹45" },
      { name: "Vanilla Syrup", price: "₹20" }
    ]
  },
  {
    id: 12,
    name: "Imperial Earl Grey",
    price: "₹160",
    category: "Tea",
    description: "Robust black tea scented with oil of natural bergamot.",
    image: "/assets/menu/coffee-2.png",
    calories: "0 kcal",
    addons: [
      { name: "Organic Honey", price: "₹20" },
      { name: "Lemon Slice", price: "₹10" }
    ]
  },

  // Breakfast
  {
    id: 13,
    name: "Avocado Sourdough Toast",
    price: "₹280",
    category: "Breakfast",
    description: "Crushed fresh avocado, cherry tomatoes, and microgreens on toasted sourdough bread.",
    image: "/assets/menu/coffee-1.png",
    featured: true,
    calories: "280 kcal",
    addons: [
      { name: "Poached Egg", price: "₹40" },
      { name: "Extra Avocado", price: "₹60" }
    ]
  },
  {
    id: 14,
    name: "French Butter Croissant",
    price: "₹150",
    category: "Breakfast",
    description: "Flaky, buttery, golden-brown baked traditional French pastry.",
    image: "/assets/menu/coffee-4.png",
    bestSeller: true,
    calories: "240 kcal",
    addons: [
      { name: "House Jam", price: "₹20" },
      { name: "Swiss Cheese Melt", price: "₹40" }
    ]
  },

  // Snacks
  {
    id: 15,
    name: "Truffle Parmesan Fries",
    price: "₹220",
    category: "Snacks",
    description: "Crispy skin-on fries tossed in truffle oil, topped with aged grated Parmesan cheese and parsley.",
    image: "/assets/menu/coffee-5.png",
    calories: "380 kcal",
    addons: [
      { name: "Extra Parmesan", price: "₹30" },
      { name: "Truffle Aioli Dip", price: "₹40" }
    ]
  },

  // Sandwiches
  {
    id: 16,
    name: "Caprese Panini",
    price: "₹320",
    category: "Sandwiches",
    description: "Fresh buffalo mozzarella, vine-ripened tomatoes, sweet basil pesto, grilled on sourdough.",
    image: "/assets/menu/coffee-2.png",
    bestSeller: true,
    calories: "450 kcal",
    addons: [
      { name: "Prosciutto", price: "₹90" },
      { name: "Extra Pesto Sauce", price: "₹20" }
    ]
  },
  {
    id: 17,
    name: "Smoked Turkey & Swiss",
    price: "₹350",
    category: "Sandwiches",
    description: "Hickory-smoked turkey breast, Swiss cheese, arugula, and cranberry aioli on ciabatta bread.",
    image: "/assets/menu/coffee-4.png",
    calories: "480 kcal",
    addons: [
      { name: "Avocado Slices", price: "₹50" },
      { name: "Crispy Bacon", price: "₹60" }
    ]
  },

  // Desserts
  {
    id: 18,
    name: "Decadent Tiramisu",
    price: "₹260",
    category: "Desserts",
    description: "Ladyfingers soaked in espresso, layered with whipped mascarpone cream and cocoa powder.",
    image: "/assets/menu/coffee-3.png",
    featured: true,
    bestSeller: true,
    calories: "340 kcal",
    addons: [
      { name: "Extra Gelato Scoop", price: "₹60" },
      { name: "Chocolate Shavings", price: "₹15" }
    ]
  },
  {
    id: 19,
    name: "New York Baked Cheesecake",
    price: "₹280",
    category: "Desserts",
    description: "Rich, dense cheesecake baked to golden perfection on a graham cracker crust.",
    image: "/assets/menu/coffee-1.png",
    calories: "410 kcal",
    addons: [
      { name: "Strawberry Coulis", price: "₹30" },
      { name: "Blueberry Compote", price: "₹30" }
    ]
  },

  // Signature Specials
  {
    id: 20,
    name: "Cafe-brew Gold Affogato",
    price: "₹320",
    category: "Signature Specials",
    description: "Double shot of espresso poured over organic vanilla bean gelato, topped with 24k gold leaf and toasted hazelnuts.",
    image: "/assets/menu/coffee-5.png",
    featured: true,
    bestSeller: true,
    calories: "280 kcal",
    addons: [
      { name: "Double Shot Espresso Upgrade", price: "₹40" },
      { name: "Extra Gold Flakes", price: "₹90" }
    ]
  },
  {
    id: 21,
    name: "Rose Honey Cortado",
    price: "₹220",
    category: "Signature Specials",
    description: "Double espresso cut with equal parts warm milk, organic honey, and a hint of organic rose water.",
    image: "/assets/menu/coffee-2.png",
    calories: "90 kcal",
    milkOption: true,
    addons: [
      { name: "Extra Espresso Shot", price: "₹40" },
      { name: "Saffron Threads", price: "₹50" }
    ]
  }
];
