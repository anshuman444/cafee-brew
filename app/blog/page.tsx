"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import Image from "next/image";
import { FiClock, FiCalendar, FiArrowRight, FiX } from "react-icons/fi";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
}

const blogArticles: Article[] = [
  {
    id: 1,
    title: "The Art of the Perfect Pour-Over",
    category: "Brew Methods",
    date: "May 25, 2026",
    readTime: "5 min read",
    image: "/assets/about/photo-2.jpg",
    snippet: "Unlock the full aromatic potential of single-origin coffee with our step-by-step masterclass guide to manual drip brewing.",
    author: {
      name: "Marcus Vance",
      role: "Head Barista",
    },
    content: [
      "Brewing coffee manually using a pour-over dripper like the Hario V60 is one of the most rewarding ways to experience a bean's true characteristics. Unlike automated drip machines, manual pour-over puts you in complete control of water temperature, flow rate, and extraction time, letting you highlight delicate floral and fruity notes that might otherwise be lost.",
      "The first key component is the grind. For a standard V60, a medium-fine grind (similar to table salt) is recommended. If the grind is too coarse, water passes through too quickly, resulting in an sour, under-extracted cup. If it is too fine, flow will choke, yielding a bitter, over-extracted taste.",
      "Water temperature is equally critical. For light to medium roasts, aim for 92°C to 94°C (approximately 30 to 45 seconds off a boil). Pour a small amount of water (about double the weight of the coffee grounds) to let the coffee 'bloom' for 45 seconds. This releases trapped carbon dioxide gas, paving the way for a smooth, uniform extraction.",
      "Once bloomed, pour in concentric circles starting from the center outward, avoiding the filter paper directly. Keep your pour slow and steady, completing the entire process in about 3 minutes. Clean, nuanced, and exceptionally bright—your perfect pour-over is ready to enjoy.",
    ],
  },
  {
    id: 2,
    title: "Sourcing with Respect: Sourcing Direct Trade Coffee",
    category: "Sustainability",
    date: "April 18, 2026",
    readTime: "7 min read",
    image: "/assets/about/photo-1.jpg",
    snippet: "Explore the journey from farm to cup and discover how our direct-trade partnerships support growers and preserve ecological diversity.",
    author: {
      name: "Jonathan Brew",
      role: "Founder & Curator",
    },
    content: [
      "Direct trade is more than a supply chain label; it is a commitment to mutual respect and sustainability. At Cafe-brew, we believe that the finest coffee begins with growers who are fairly compensated and equipped to nurture their crops and communities ethically.",
      "Under direct trade agreements, we buy beans directly from the producers, completely bypassing traditional exporters and commodity markets. This allows us to pay premiums far exceeding standard Fair Trade minimums—sometimes up to 100% higher. These premiums go directly back into agricultural upgrades, school funding, and clean water access in regions like Sidamo and Huila.",
      "Furthermore, we collaborate with our farming partners on eco-friendly practices. We prioritize shade-grown coffee, which preserves natural forest canopies and avian habitats, and encourage water-conservation processing techniques. This direct link ensures that every bag of Cafe-brew you buy supports both quality and environmental stewardship.",
    ],
  },
  {
    id: 3,
    title: "Understanding Espresso: Crema, Extraction, & Ratios",
    category: "Coffee Science",
    date: "March 10, 2026",
    readTime: "6 min read",
    image: "/assets/about/photo-3.jpg",
    snippet: "Delve into the physics and chemistry behind espresso extraction, from pump pressures to the golden layers of crema.",
    author: {
      name: "Sarah Miller",
      role: "Master Roaster",
    },
    content: [
      "Espresso is often viewed as simple, yet it represents one of the most chemically complex culinary extractions in the world. Producing a perfect shot requires pushing water heated to 93°C through a compacted puck of finely ground coffee at a pressure of exactly 9 bars, all within a narrow window of 25 to 30 seconds.",
      "The result is a double-phased liquid consisting of an emulsion of microscopic oil droplets and a suspension of gas bubbles, crowned by a dense layer of golden-brown foam known as 'crema'. Crema is formed when carbon dioxide gas—highly pressurized during roasting—dissolves into the water and then escapes as micro-bubbles upon exit.",
      "To measure extraction accuracy, baristas refer to brew ratios. A classic double shot uses a 1:2 ratio: 18 grams of dry grounds yielding 36 grams of liquid espresso. Minor variations in grind size or temp will shift this ratio, altering the balance between acidity, sweetness, and bitterness. Precision is the key to consistency.",
    ],
  },
];

const BlogPage = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);



  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="Cafe-brew Journal"
        subtitle="Read our insights, masterclasses, and stories about coffee science, sourcing, and brewing arts."
        backgroundImage="/assets/about/photo-3.jpg"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24 max-w-5xl">
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/30 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-accent/40 transition-colors duration-500 h-full cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              {/* Banner Image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={article.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={article.title}
                />
                <div className="absolute top-3 left-3 bg-accent text-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                  {article.category}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Read time */}
                  <div className="flex gap-4 text-secondary text-xs mb-3">
                    <span className="flex items-center gap-1"><FiCalendar /> {article.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
                  </div>

                  <h3 className="font-primary text-2xl uppercase text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-secondary text-xs leading-relaxed line-clamp-3 mb-6">
                    {article.snippet}
                  </p>
                </div>

                {/* Read Button */}
                <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest mt-auto group-hover:underline">
                  Read Article <FiArrowRight />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Immersive Article Reading Overlay Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-md z-[1000] overflow-y-auto"
          >
            {/* Inner Content Box */}
            <div className="min-h-screen py-16 px-4 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.98, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 15 }}
                className="bg-primary/90 border border-white/10 w-full max-w-3xl rounded-lg overflow-hidden relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 text-white hover:text-accent bg-black/40 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center text-xl outline-none z-30 transition-colors"
                  aria-label="Close Article"
                >
                  <FiX />
                </button>

                {/* Article Top Image Banner */}
                <div className="relative h-[300px] xl:h-[380px] w-full">
                  <Image
                    src={activeArticle.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    alt={activeArticle.title}
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  
                  {/* Category and Title overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="bg-accent text-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-3">
                      {activeArticle.category}
                    </span>
                    <h2 className="font-primary text-3xl xl:text-4xl uppercase text-white leading-tight">
                      {activeArticle.title}
                    </h2>
                  </div>
                </div>

                {/* Article text details */}
                <div className="p-6 xl:p-10">
                  {/* Metadata header */}
                  <div className="flex flex-wrap gap-6 text-secondary text-xs mb-8 border-b border-white/5 pb-4">
                    <span className="flex items-center gap-1"><FiCalendar /> Published: {activeArticle.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> Read Time: {activeArticle.readTime}</span>
                    <span className="text-white">Written By: <strong className="text-accent">{activeArticle.author.name}</strong> ({activeArticle.author.role})</span>
                  </div>

                  {/* Body text paragraphs */}
                  <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-secondary font-light">
                    {activeArticle.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Divider line and footer */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase text-secondary">Author Signature</p>
                      <p className="font-primary text-xl text-accent mt-1">{activeArticle.author.name}</p>
                      <p className="text-[11px] text-secondary/70">{activeArticle.author.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(null)}
                      className="border border-white/10 hover:border-accent/40 bg-transparent text-white px-5 py-2 uppercase tracking-widest text-[10px] font-semibold rounded transition-colors"
                    >
                      Close Journal
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BlogPage;
