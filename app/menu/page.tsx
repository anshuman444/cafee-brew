"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import MenuItem from "@/components/Menu/MenuItem";
import Separator from "@/components/Separator";
import { menuItems, MenuItem as MenuItemType } from "@/src/data/menu";
import Image from "next/image";
import { FiX, FiCheck, FiInfo } from "react-icons/fi";

const CATEGORIES = [
  "All",
  "Coffee",
  "Espresso",
  "Cappuccino",
  "Latte",
  "Cold Coffee",
  "Tea",
  "Breakfast",
  "Snacks",
  "Sandwiches",
  "Desserts",
  "Signature Specials",
];

interface PlacedOrder {
  id: string;
  name: string;
  category: string;
  basePrice: string;
  totalPrice: string;
  preferences: {
    milk?: string;
    water?: string;
  };
  selectedAddons: { name: string; price: string }[];
  instructions: string;
  timestamp: string;
  status: "Pending" | "Preparing" | "Completed";
}

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(menuItems);
  
  // Customizer modal states
  const [customizingItem, setCustomizingItem] = useState<MenuItemType | null>(null);
  const [selectedMilk, setSelectedMilk] = useState("Whole Milk");
  const [selectedWater, setSelectedWater] = useState("Filtered Water");
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: string }[]>([]);
  const [instructions, setInstructions] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Filter items based on category and search query
  useEffect(() => {
    let result = menuItems;

    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(result);
  }, [selectedCategory, searchQuery]);

  // Handle addon checkbox toggle
  const toggleAddon = (addon: { name: string; price: string }) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.name === addon.name);
      if (exists) {
        return prev.filter(a => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Convert Indian Rupee/price string to integer value for calculations
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  };

  // Calculate dynamic total price
  const calculateTotal = (): string => {
    if (!customizingItem) return "₹0";
    let total = parsePrice(customizingItem.price);
    
    // Premium milk additions
    if (customizingItem.milkOption && selectedMilk !== "Whole Milk") {
      total += 50; // +50 INR for Oat/Almond Milk
    }

    // Premium water additions
    if (customizingItem.waterOption && selectedWater === "Sparkling Water") {
      total += 30; // +30 INR for Sparkling Water
    }

    // Addons cost
    selectedAddons.forEach(addon => {
      total += parsePrice(addon.price);
    });

    return `₹${total}`;
  };

  // Post order to LocalStorage database
  const handlePlaceOrder = () => {
    if (!customizingItem) return;

    const newOrder: PlacedOrder = {
      id: `ZB-${Date.now().toString().slice(-6)}`,
      name: customizingItem.name,
      category: customizingItem.category,
      basePrice: customizingItem.price,
      totalPrice: calculateTotal(),
      preferences: {
        milk: customizingItem.milkOption ? selectedMilk : undefined,
        water: customizingItem.waterOption ? selectedWater : undefined,
      },
      selectedAddons,
      instructions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Pending"
    };

    // Store in localStorage
    const existingOrdersStr = localStorage.getItem("zenbrew_orders_v1");
    const existingOrders: PlacedOrder[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
    localStorage.setItem("zenbrew_orders_v1", JSON.stringify([...existingOrders, newOrder]));

    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setCustomizingItem(null);
      // Reset customizer form
      setSelectedMilk("Whole Milk");
      setSelectedWater("Filtered Water");
      setSelectedAddons([]);
      setInstructions("");
    }, 2000);
  };

  // Extract featured and best seller items
  const bestSellers = menuItems.filter(item => item.bestSeller);

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Hero Section */}
      <PageHero
        title="Our Premium Menu"
        subtitle="Savor the finest selection of hand-crafted espresso blends, direct-trade single origin brews, and artisan pastries."
        backgroundImage="/assets/opening-hours/img.png"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24">
        {/* Luxury Coffee Storytelling Section */}
        <section 
          className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center mb-24 py-12 border-b border-white/5"
          data-scroll
          data-scroll-speed="0.05"
        >
          {/* Story Text */}
          <div className="flex flex-col gap-6 max-w-[560px]">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">The Craftsmanship</span>
            <h2 className="h2 text-left">Roasted to Perfection</h2>
            <Separator bg="accent" />
            <p className="text-secondary leading-relaxed">
              At Cafe-brew, our beans are sourced directly from sustainable, single-origin farms across the globe. Each batch is roasted in-house in small quantities under the watchful eye of our master roasters to ensure a signature, rich aroma that translates into a masterpiece in your cup.
            </p>
            <p className="text-secondary leading-relaxed font-light italic">
              {"\"We don't just brew coffee; we curate a sensory journey from farm to cup.\""}
            </p>
          </div>
          {/* Story Image with scale-in reveal effect */}
          <div className="relative h-[400px] xl:h-[480px] w-full rounded-lg overflow-hidden border border-white/10 group">
            <Image
              src="/assets/gallery/pour-over.png"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Pouring pour-over coffee"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-primary text-2xl text-white">Direct Trade Beans</p>
              <p className="text-accent text-sm uppercase tracking-wider">100% Organic Origin</p>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">Most Popular</span>
            <h2 className="h2 mt-2">Best Sellers</h2>
            <Separator bg="accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bestSellers.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-lg relative overflow-hidden group hover:border-accent/40 transition-all duration-500 cursor-pointer"
                onClick={() => setCustomizingItem(item)}
              >
                {/* Gold Glow Overlay */}
                <div className="absolute -inset-px bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10">
                      <Image src={item.image} fill alt={item.name} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="font-primary text-xl text-white uppercase group-hover:text-accent transition-colors duration-300">{item.name}</h3>
                      <p className="text-accent font-semibold">{item.price}</p>
                    </div>
                  </div>
                  <p className="text-secondary text-sm line-clamp-2">{item.description}</p>
                  <span className="self-end mt-4 text-[11px] border border-accent/30 text-accent uppercase tracking-widest px-2 py-0.5 rounded-full">
                    Customize & Buy
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Filtering Menu Grid */}
        <section className="mb-12">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">Explore</span>
            <h2 className="h2 mt-2">The Complete Menu</h2>
            <Separator bg="accent" />
          </div>

          {/* Search and Filters Controller */}
          <div className="flex flex-col gap-6 items-center mb-12">
            {/* Search Input */}
            <div className="w-full max-w-[450px] relative">
              <input
                type="text"
                placeholder="Search our coffee & delicacies..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-full px-6 py-3 text-white placeholder-secondary outline-none focus:border-accent/50 transition-colors"
              />
              <svg className="w-5 h-5 text-secondary absolute right-6 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-accent border-accent text-primary font-bold"
                      : "bg-transparent border-white/10 text-white/80 hover:border-accent/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/10 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  onClick={() => setCustomizingItem(item)}
                >
                  <MenuItem
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imgSrc={item.image}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">No items match your search or filter selection.</p>
              <button 
                type="button"
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="btn mt-4 text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Premium Item Customizer and Order Modal */}
      <AnimatePresence>
        {customizingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-primary border border-white/15 w-full max-w-2xl rounded-lg overflow-hidden relative p-6 xl:p-8 flex flex-col md:flex-row gap-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 text-white hover:text-accent outline-none text-xl z-25"
                aria-label="Close customizer modal"
              >
                <FiX />
              </button>

              <AnimatePresence mode="wait">
                {!orderSuccess ? (
                  <motion.div 
                    key="customizer-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row gap-8 w-full"
                  >
                    {/* Left: Picture and Calories info */}
                    <div className="w-full md:w-[220px] flex-shrink-0 flex flex-col gap-4">
                      <div className="relative w-full h-[220px] rounded overflow-hidden border border-white/10">
                        <Image
                          src={customizingItem.image}
                          fill
                          sizes="(max-width: 768px) 100vw, 220px"
                          alt={customizingItem.name}
                          className="object-cover"
                        />
                      </div>
                      
                      {customizingItem.calories && (
                        <div className="flex items-center gap-2 text-xs text-secondary bg-black/30 p-3 rounded border border-white/5">
                          <FiInfo className="text-accent text-sm" />
                          <span>Energy Content: <strong>{customizingItem.calories}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Right: Specifications & Options */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-accent uppercase tracking-widest text-[11px] font-semibold">{customizingItem.category}</span>
                        <h3 className="font-primary text-3xl uppercase text-white mt-1 mb-2">{customizingItem.name}</h3>
                        <p className="text-secondary text-xs leading-relaxed mb-4">{customizingItem.description}</p>
                        
                        <Separator bg="accent" />

                        {/* Milk Options (Steamed drinks) */}
                        {customizingItem.milkOption && (
                          <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-xs uppercase tracking-wider text-secondary">Steamed Milk preference</label>
                            <div className="grid grid-cols-3 gap-2">
                              {["Whole Milk", "Oat Milk (+₹50)", "Almond Milk (+₹50)"].map(milk => (
                                <button
                                  key={milk}
                                  type="button"
                                  onClick={() => setSelectedMilk(milk.split(" ")[0] + " Milk")}
                                  className={`py-1.5 rounded text-[11px] border text-center transition-all ${
                                    selectedMilk === (milk.split(" ")[0] + " Milk")
                                      ? "border-accent text-accent font-bold bg-accent/5"
                                      : "border-white/10 text-white/80 hover:border-white/30"
                                  }`}
                                >
                                  {milk}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Water Options (Drips/Americanos) */}
                        {customizingItem.waterOption && (
                          <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-xs uppercase tracking-wider text-secondary">Water Base Style</label>
                            <div className="grid grid-cols-2 gap-2">
                              {["Filtered Water", "Sparkling Water (+₹30)"].map(water => (
                                <button
                                  key={water}
                                  type="button"
                                  onClick={() => setSelectedWater(water.startsWith("Filtered") ? "Filtered Water" : "Sparkling Water")}
                                  className={`py-1.5 rounded text-[11px] border text-center transition-all ${
                                    selectedWater === (water.startsWith("Filtered") ? "Filtered Water" : "Sparkling Water")
                                      ? "border-accent text-accent font-bold bg-accent/5"
                                      : "border-white/10 text-white/80 hover:border-white/30"
                                  }`}
                                >
                                  {water}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Addons Section */}
                        {customizingItem.addons && customizingItem.addons.length > 0 && (
                          <div className="flex flex-col gap-2 my-4">
                            <label className="text-xs uppercase tracking-wider text-secondary">Customize Addons</label>
                            <div className="flex flex-col gap-2">
                              {customizingItem.addons.map(addon => {
                                const isChecked = !!selectedAddons.find(a => a.name === addon.name);
                                return (
                                  <label 
                                    key={addon.name} 
                                    className="flex items-center justify-between text-xs text-secondary hover:text-white cursor-pointer bg-black/20 p-2.5 rounded border border-white/5"
                                  >
                                    <span className="flex items-center gap-2">
                                      <input 
                                        type="checkbox" 
                                        checked={isChecked}
                                        onChange={() => toggleAddon(addon)}
                                        className="rounded border-white/10 text-accent focus:ring-accent accent-accent w-4 h-4 cursor-pointer"
                                      />
                                      {addon.name}
                                    </span>
                                    <span className="text-accent font-semibold">{addon.price}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Instructions */}
                        <div className="flex flex-col gap-1.5 my-4">
                          <label htmlFor="inst" className="text-xs uppercase tracking-wider text-secondary">Special Instructions</label>
                          <input
                            type="text"
                            id="inst"
                            placeholder="e.g. Extra hot, low foam, sugar-free..."
                            value={instructions}
                            onChange={e => setInstructions(e.target.value)}
                            className="bg-black/40 border border-white/10 text-xs rounded px-3 py-2 text-white placeholder-secondary outline-none focus:border-accent transition-colors"
                          />
                        </div>
                      </div>

                      {/* Buy Action */}
                      <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] text-secondary uppercase tracking-widest">Total Price</p>
                          <p className="text-2xl font-semibold text-accent">{calculateTotal()}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          className="btn flex-1 text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="order-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-accent text-accent flex items-center justify-center text-3xl mb-6 animate-bounce">
                      <FiCheck />
                    </div>
                    <h3 className="font-primary text-3xl uppercase text-white mb-2">Order Received</h3>
                    <p className="text-secondary text-sm max-w-xs">
                      We have received your custom order. Head over to the **Admin Dashboard** in the menu to track its preparation status!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
