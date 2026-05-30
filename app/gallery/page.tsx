"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import { galleryItems, GalleryItem } from "@/src/data/gallery";
import Image from "next/image";

const CATEGORIES = ["All", "Interior", "Brewing", "Latte Art", "Products"];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryItem[]>(galleryItems);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);



  // Filter photos based on category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPhotos(galleryItems);
    } else {
      setFilteredPhotos(galleryItems.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredPhotos.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredPhotos.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="Visual Journey"
        subtitle="A glimpse into the warmth, precision, and artistry behind every single pour."
        backgroundImage="/assets/opening-hours/img.png"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-accent border-accent text-primary font-bold"
                  : "bg-transparent border-white/10 text-white/80 hover:border-accent/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout using columns */}
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="break-inside-avoid relative overflow-hidden group border border-white/10 rounded-lg cursor-pointer bg-black/20"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Image Container with aspect-ratio flexibility */}
                <div className={`relative w-full ${index % 2 === 0 ? "h-[300px]" : "h-[420px]"} xl:${index % 3 === 0 ? "h-[320px]" : "h-[450px]"}`}>
                  <Image
                    src={item.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    alt={item.title}
                    quality={100}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Luxury Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center z-10 pointer-events-none">
                    <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-2">{item.category}</span>
                    <h3 className="font-primary text-2xl uppercase text-white mb-2">{item.title}</h3>
                    <div className="w-[50px] h-[1px] bg-accent mb-4" />
                    <p className="text-secondary text-xs max-w-[240px]">{item.description}</p>
                    <span className="mt-6 text-[10px] uppercase text-accent/80 tracking-widest border border-accent/20 px-2 py-0.5 rounded-full">
                      View Large
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-4"
            >
              {/* Close Button in upper right */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-8 right-8 text-white hover:text-accent text-3xl font-light outline-none"
                aria-label="Close Lightbox"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 xl:left-8 text-white hover:text-accent text-4xl p-2 outline-none"
                aria-label="Previous Image"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 xl:right-8 text-white hover:text-accent text-4xl p-2 outline-none"
                aria-label="Next Image"
              >
                ›
              </button>

              {/* Current Lightbox Slide Container */}
              <div className="relative w-full max-w-4xl h-[65vh] xl:h-[75vh] flex flex-col justify-center items-center">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredPhotos[lightboxIndex].image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    alt={filteredPhotos[lightboxIndex].title}
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </motion.div>
              </div>

              {/* Captions and descriptions at bottom */}
              <div className="text-center mt-6 z-10 max-w-xl">
                <span className="text-accent uppercase tracking-widest text-xs font-semibold">
                  {filteredPhotos[lightboxIndex].category}
                </span>
                <h2 className="font-primary text-3xl uppercase text-white mt-1">
                  {filteredPhotos[lightboxIndex].title}
                </h2>
                <p className="text-secondary text-sm mt-2">
                  {filteredPhotos[lightboxIndex].description}
                </p>
                <div className="text-white/40 text-xs mt-4">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryPage;
