export interface Product {
  id: number;
  name: string;
  price: string;
  category: "Coffee Beans" | "Ground Coffee" | "Coffee Mugs" | "Merchandise" | "Gift Cards" | "Brewing Equipment";
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
  featured?: boolean;
  details?: {
    origin?: string;
    roast?: "Light" | "Medium" | "Dark" | "Medium-Dark";
    notes?: string[];
    material?: string;
    size?: string;
    value?: string;
  };
}

export const storeProducts: Product[] = [
  {
    id: 101,
    name: "Ethiopian Yirgacheffe",
    price: "₹850",
    category: "Coffee Beans",
    description: "Elegant single-origin whole bean coffee with delicate floral notes, bright citrus acidity, and a tea-like finish.",
    image: "/assets/menu/coffee-1.png",
    rating: 4.9,
    inStock: true,
    featured: true,
    details: {
      origin: "Ethiopia",
      roast: "Light",
      notes: ["Jasmine", "Lemon Peel", "Peach"]
    }
  },
  {
    id: 102,
    name: "Sumatra Mandheling",
    price: "₹890",
    category: "Coffee Beans",
    description: "Deep, full-bodied single-origin coffee showcasing earthy, cedar wood, and sweet tobacco notes with very low acidity.",
    image: "/assets/menu/coffee-2.png",
    rating: 4.8,
    inStock: true,
    details: {
      origin: "Indonesia",
      roast: "Dark",
      notes: ["Earthy", "Spices", "Dark Cocoa"]
    }
  },
  {
    id: 103,
    name: "Cafe-brew Signature Blend",
    price: "₹720",
    category: "Ground Coffee",
    description: "Our award-winning house blend ground for general drip brewing. Notes of chocolate, nuts, and red berries.",
    image: "/assets/menu/coffee-3.png",
    rating: 5.0,
    inStock: true,
    featured: true,
    details: {
      origin: "Central & South America Blend",
      roast: "Medium",
      notes: ["Milk Chocolate", "Roasted Almond", "Red Cherry"]
    }
  },
  {
    id: 104,
    name: "Matte Black Ceramic Mug",
    price: "₹650",
    category: "Coffee Mugs",
    description: "Ergonomically designed 350ml stoneware mug with a tactile matte black glaze and laser-etched Cafe-brew logo.",
    image: "/assets/menu/coffee-4.png",
    rating: 4.7,
    inStock: true,
    featured: true,
    details: {
      material: "Premium Stoneware Ceramic",
      size: "350ml"
    }
  },
  {
    id: 105,
    name: "Copper Gooseneck Kettle",
    price: "₹3,400",
    category: "Brewing Equipment",
    description: "Precision-pour gooseneck kettle with built-in dial thermometer for exact water temperature control, finished in polished copper.",
    image: "/assets/menu/coffee-5.png",
    rating: 4.9,
    inStock: true,
    featured: true,
    details: {
      material: "Stainless Steel with Copper Plating",
      size: "1.0 Litre"
    }
  },
  {
    id: 106,
    name: "Ceramic V60 Dripper",
    price: "₹1,200",
    category: "Brewing Equipment",
    description: "The classic V60 size 02 pour-over dripper made of high-quality Japanese Arita-yaki porcelain for optimum heat retention.",
    image: "/assets/menu/coffee-1.png",
    rating: 4.8,
    inStock: true,
    details: {
      material: "Japanese Ceramic",
      size: "Size 02 (1-4 cups)"
    }
  },
  {
    id: 107,
    name: "Signature Canvas Tote Bag",
    price: "₹450",
    category: "Merchandise",
    description: "Heavyweight 100% organic cotton tote bag featuring vintage-inspired Cafe-brew typography and durable shoulder straps.",
    image: "/assets/menu/coffee-3.png",
    rating: 4.6,
    inStock: true,
    details: {
      material: "100% Organic Canvas Cotton",
      size: "38cm x 42cm"
    }
  },
  {
    id: 108,
    name: "Gold Member E-Gift Card",
    price: "₹1,000",
    category: "Gift Cards",
    description: "The perfect gift for any coffee lover. Redeemable online or in-store for beans, beverages, or brewing workshops.",
    image: "/assets/menu/coffee-2.png",
    rating: 5.0,
    inStock: true,
    details: {
      value: "₹1,000"
    }
  }
];
