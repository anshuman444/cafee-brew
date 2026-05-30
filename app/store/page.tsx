"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import { storeProducts, Product } from "@/src/data/store";
import Image from "next/image";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiX } from "react-icons/fi";
import { siteConfig } from "@/src/data/siteConfig";


interface CartItem {
  product: Product;
  quantity: number;
  grindSize?: string;
}

const CATEGORIES = ["All", "Coffee Beans", "Ground Coffee", "Coffee Mugs", "Merchandise", "Gift Cards", "Brewing Equipment"];

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProducts);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [grindSize, setGrindSize] = useState("Whole Bean");
  const [checkoutComplete, setCheckoutComplete] = useState(false);



  // Filter products based on search & category
  useEffect(() => {
    let result = storeProducts;

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  // Cart Helper functions
  const addToCart = (product: Product) => {
    const isCoffee = product.category === "Coffee Beans" || product.category === "Ground Coffee";
    const selectedGrind = isCoffee ? grindSize : undefined;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.grindSize === selectedGrind
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prev, { product, quantity: 1, grindSize: selectedGrind }];
      }
    });

    // Reset grind size defaults
    setGrindSize("Whole Bean");
    setActiveProduct(null); // Close modal
    setIsCartOpen(true); // Open cart automatically to show additions
  };

  const removeFromCart = (id: number, grind?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === id && item.grindSize === grind)));
  };

  const updateQuantity = (id: number, delta: number, grind?: string) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === id && item.grindSize === grind) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  // Convert Indian Rupee string back to number for subtotal calculation
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + parsePrice(item.product.price) * item.quantity, 0);
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCart([]);
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="bg-primary text-white min-h-screen pb-24 relative">
      {/* Page Hero */}
      <PageHero
        title="Boutique Roasters"
        subtitle="Bring the premium taste of Cafe-brew home. Access our single-origin whole beans and artisan accessories."
        backgroundImage="/assets/opening-hours/img.png"
      />

      {/* Floating Cart Button */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(199,161,122,0.4)] z-[500] hover:bg-accent-hover transition-colors group outline-none"
        aria-label="Open Cart"
      >
        <div className="relative">
          <FiShoppingBag className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-3 -right-3 bg-white text-primary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-accent animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>

      <div className="container mx-auto px-4 mt-16 xl:mt-24">
        
        {/* Search and Filters Controller */}
        <div className="flex flex-col gap-6 items-center mb-12">
          {/* Search Input */}
          <div className="w-full max-w-[450px] relative">
            <input
              type="text"
              placeholder="Search products, gear, accessories..."
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

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-black/30 border border-white/10 p-5 rounded-lg flex flex-col justify-between group hover:border-accent/40 transition-colors duration-500 h-full relative"
              >
                {/* Product Image */}
                <div 
                  className="relative w-full h-[220px] rounded overflow-hidden mb-4 cursor-pointer"
                  onClick={() => setActiveProduct(product)}
                >
                  <Image
                    src={product.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    alt={product.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-primary/70 backdrop-blur-sm border border-white/10 text-[10px] text-accent uppercase tracking-widest px-2 py-0.5 rounded">
                    {product.category}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-2">
                    <h3 
                      className="font-primary text-xl uppercase tracking-wide group-hover:text-accent transition-colors cursor-pointer text-white truncate max-w-[70%]"
                      onClick={() => setActiveProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-accent font-semibold text-lg">{product.price}</p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3 text-accent text-xs">
                    {"★".repeat(Math.round(product.rating))}
                    <span className="text-secondary text-[11px] ml-1">({product.rating})</span>
                  </div>

                  <p className="text-secondary text-xs line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveProduct(product)}
                    className="flex-1 border border-white/10 hover:border-accent/40 bg-transparent text-white py-2 text-xs uppercase tracking-widest rounded transition-colors"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (product.category === "Coffee Beans" || product.category === "Ground Coffee") {
                        setActiveProduct(product); // Force grind size selection modal
                      } else {
                        addToCart(product);
                      }
                    }}
                    className="flex-1 bg-accent hover:bg-accent-hover text-primary py-2 text-xs uppercase font-bold tracking-widest rounded transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-secondary text-lg">No products found matching your filter details.</p>
            <button 
              type="button"
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="btn mt-4 text-xs"
            >
              Reset Store
            </button>
          </div>
        )}
        {/* Store Location & Map Section */}
        <section 
          className="mt-24 border-t border-white/10 pt-16"
          data-scroll
          data-scroll-speed="0.05"
        >
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Our Flagship Boutique</span>
            <h2 className="font-primary text-3xl xl:text-4xl uppercase mt-2">Visit Our Store</h2>
            <div className="w-[80px] h-[1px] bg-accent mx-auto mt-3" />
            <p className="text-secondary text-sm mt-4">
              {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.postalCode}, {siteConfig.contact.country}
            </p>
          </div>

          <div className="relative w-full h-[350px] border border-white/10 rounded-lg overflow-hidden grayscale brightness-[0.7] invert-[0.9] contrast-[1.2] shadow-2xl">
            <iframe
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              allowFullScreen={false}
              loading="lazy"
              title="Google Maps Location - Cafe-brew Boutique Location"
              className="border-0"
            ></iframe>
          </div>
        </section>
      </div>

      {/* Product Details Modal Dialog */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-primary border border-white/15 w-full max-w-2xl rounded-lg overflow-hidden relative p-6 xl:p-8 flex flex-col md:flex-row gap-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 text-white hover:text-accent outline-none text-xl"
                aria-label="Close product modal"
              >
                <FiX />
              </button>

              <div className="relative w-full md:w-[240px] h-[240px] md:h-auto rounded overflow-hidden border border-white/10">
                <Image
                  src={activeProduct.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  alt={activeProduct.name}
                  className="object-cover"
                />
              </div>

              {/* Right Side: Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-accent uppercase tracking-widest text-[11px] font-semibold">{activeProduct.category}</span>
                  <h3 className="font-primary text-3xl uppercase text-white mt-1 mb-2">{activeProduct.name}</h3>
                  <p className="text-accent font-semibold text-2xl mb-4">{activeProduct.price}</p>
                  
                  <Separator bg="accent" />
                  
                  <p className="text-secondary text-sm leading-relaxed my-4">
                    {activeProduct.description}
                  </p>

                  {/* Coffee Attributes (Origin, Roast, Notes) */}
                  {activeProduct.details?.origin && (
                    <div className="flex flex-col gap-2 bg-black/20 p-3 rounded border border-white/5 text-xs text-secondary mb-4">
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span className="text-white font-semibold">{activeProduct.details.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roast Profile:</span>
                        <span className="text-accent font-semibold">{activeProduct.details.roast}</span>
                      </div>
                      {activeProduct.details.notes && (
                        <div className="flex justify-between">
                          <span>Flavor Notes:</span>
                          <span className="text-white font-semibold">{activeProduct.details.notes.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Non-Coffee Attributes (Material, Size, Value) */}
                  {activeProduct.details?.material && (
                    <div className="flex flex-col gap-2 bg-black/20 p-3 rounded border border-white/5 text-xs text-secondary mb-4">
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="text-white font-semibold">{activeProduct.details.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions/Capacity:</span>
                        <span className="text-accent font-semibold">{activeProduct.details.size}</span>
                      </div>
                    </div>
                  )}

                  {/* Grind Size Option Selector for coffee products */}
                  {(activeProduct.category === "Coffee Beans" || activeProduct.category === "Ground Coffee") && (
                    <div className="flex flex-col gap-1.5 mb-6">
                      <label htmlFor="grind" className="text-xs uppercase tracking-wider text-secondary">Select Grind Size</label>
                      <select
                        id="grind"
                        value={grindSize}
                        onChange={e => setGrindSize(e.target.value)}
                        className="bg-black/50 border border-white/10 text-white text-sm rounded px-3 py-2 outline-none focus:border-accent transition-colors"
                      >
                        <option value="Whole Bean">Whole Bean (Recommended)</option>
                        <option value="Espresso">Fine (Espresso)</option>
                        <option value="Moka Pot">Medium-Fine (Moka Pot)</option>
                        <option value="Drip">Medium (Drip / V60)</option>
                        <option value="French Press">Coarse (French Press)</option>
                      </select>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(activeProduct)}
                  className="btn w-full text-xs font-bold uppercase mt-4 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag /> Add To Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Slider Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[990]"
            />

            {/* Slide over Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 h-screen w-full max-w-[450px] bg-primary border-l border-white/10 z-[1000] flex flex-col justify-between p-6 xl:p-8 text-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <FiShoppingBag className="text-accent text-xl" />
                  <h3 className="font-primary text-2xl uppercase">Shopping Bag</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="text-white hover:text-accent text-2xl outline-none"
                  aria-label="Close shopping cart"
                >
                  <FiX />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto my-6 flex flex-col gap-4 pr-2">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-secondary py-12 gap-3">
                      <p>Your bag is currently empty.</p>
                      <button 
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-accent uppercase tracking-widest text-xs border-b border-accent"
                      >
                        Continue Browsing
                      </button>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.grindSize || "none"}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 items-center bg-black/20 p-3 rounded border border-white/5"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded overflow-hidden border border-white/10 flex-shrink-0">
                          <Image src={item.product.image} fill sizes="64px" alt={item.product.name} className="object-cover" />
                        </div>

                        {/* Title & Qty */}
                        <div className="flex-1 flex flex-col min-w-0">
                          <h4 className="font-primary text-[15px] uppercase truncate text-white">{item.product.name}</h4>
                          {item.grindSize && (
                            <span className="text-[10px] text-accent font-semibold uppercase">{item.grindSize}</span>
                          )}
                          <p className="text-accent text-xs font-semibold mt-1">{item.product.price}</p>
                          
                          {/* Qty Adjustment */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1, item.grindSize)}
                              className="text-secondary hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="text-xs" />
                            </button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, 1, item.grindSize)}
                              className="text-secondary hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* Trash */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.grindSize)}
                          className="text-secondary hover:text-accent p-2"
                          aria-label="Remove item from cart"
                        >
                          <FiTrash2 />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Checkout Panel */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-secondary uppercase tracking-wider text-sm">Subtotal:</span>
                    <span className="text-accent font-semibold text-2xl">
                      ₹{calculateSubtotal().toLocaleString("en-IN")}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {!checkoutComplete ? (
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className="btn w-full uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                      >
                        Proceed To Checkout
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-accent text-primary py-3 rounded text-center text-xs font-bold uppercase tracking-widest"
                      >
                        ✓ Order Placed Successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StorePage;
