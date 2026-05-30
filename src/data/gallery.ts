export interface GalleryItem {
  id: number;
  title: string;
  category: "Interior" | "Brewing" | "Latte Art" | "Products";
  description: string;
  image: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Elegant Espresso Lounge",
    category: "Interior",
    description: "The heart of Cafe-brew, featuring our state-of-the-art espresso machines and gold-accented styling.",
    image: "/assets/gallery/cafe-interior.png"
  },
  {
    id: 2,
    title: "Artisanal Roastery",
    category: "Brewing",
    description: "Meticulous selection of beans roasting in small batches to maximize rich, distinct flavors.",
    image: "/assets/gallery/roastery.png"
  },
  {
    id: 3,
    title: "Precision Pour-Over",
    category: "Brewing",
    description: "A slow, temperature-controlled pour-over highlights subtle notes and floral aromas.",
    image: "/assets/gallery/pour-over.png"
  },
  {
    id: 4,
    title: "Pouring the Perfect Heart",
    category: "Latte Art",
    description: "Steamed microfoam poured into a velvet double shot of espresso to create beautiful latte art.",
    image: "/assets/gallery/latte-art.png"
  },
  {
    id: 5,
    title: "Cozy Dining Alcove",
    category: "Interior",
    description: "Comfortable leather seating and warm pendant lighting create a luxury workspace.",
    image: "/assets/gallery/cafe-interior.png"
  },
  {
    id: 6,
    title: "Single-Origin Selection",
    category: "Products",
    description: "Our packaged direct-trade beans displayed in our boutique corner.",
    image: "/assets/gallery/roastery.png"
  }
];
