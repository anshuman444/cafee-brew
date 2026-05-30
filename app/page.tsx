/**
 * Home Page Component
 * 
 * This is the main landing page of the coffee shop website.
 * It uses "use client" directive because it requires client-side features:
 * - useEffect hook for initializing Locomotive Scroll
 * - Dynamic imports for performance optimization
 * 
 * The page consists of multiple sections displayed in order:
 * Hero -> Explore -> About -> Menu -> Opening Hours -> Testimonials
 */

"use client"; // Required for client component tree
// components
import About from "@/components/About";
import Explore from "@/components/Explore/Explore";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu/Menu";
import OpeningHours from "@/components/OpeningHours";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    // overflow-x-hidden prevents horizontal scrolling
    <div className="h-full overflow-x-hidden">
      {/* Hero Section: Main landing area with video background */}
      <Hero />
      
      {/* Explore Section: Showcases different coffee types */}
      <Explore />
      
      {/* About Section: Company story with horizontal scroll animation */}
      <About />
      
      {/* Menu Section: Coffee menu items display */}
      <Menu />
      
      {/* Opening Hours Section: Business hours information */}
      <OpeningHours />
      
      {/* Testimonials Section: Customer reviews carousel */}
      <Testimonials />
      
      {/* temporary div */}
      {/* <div className="h-[4000px]"></div> */}
    </div>
  );
};

export default Home;
