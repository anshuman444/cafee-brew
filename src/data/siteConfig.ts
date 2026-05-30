export interface BusinessHour {
  day: string;
  hours: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    googleMapsEmbedUrl: string;
  };
  openingHours: BusinessHour[];
  socialLinks: {
    youtube: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Cafe-brew",
  tagline: "Coffee & Joy",
  description: "Experience the joy of exceptional coffee at Cafe-brew. We craft every cup with passion and warmth, offering rich espresso blends, classic drip coffee, smooth cold brews, and flavorful latte varieties. Founded in 2000, we're committed to quality, sustainability, and creating memorable coffee experiences.",
  contact: {
    email: "contact@cafe-brew.com",
    phone: "+1 (555) 123-4567",
    address: "123 Coffee Lane, Roasters District",
    city: "New York",
    postalCode: "10001",
    country: "United States",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4277717462744!2d-73.98762568459379!3d40.755455979327575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259aa48c89e81%3A0xe54e6015de0cd6f0!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622312345678!5m2!1sen!2sus",
  },
  openingHours: [
    { day: "Monday - Friday", hours: "07:00 AM - 07:00 PM" },
    { day: "Saturday", hours: "08:00 AM - 08:00 PM" },
    { day: "Sunday", hours: "08:00 AM - 06:00 PM" },
  ],
  socialLinks: {
    youtube: "https://github.com/anshuman444",
    facebook: "https://github.com/anshuman444",
    twitter: "https://github.com/anshuman444",
    instagram: "https://github.com/anshuman444",
  },
};
