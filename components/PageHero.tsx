"use client";

import Separator from "./Separator";
import Badge from "./Badge";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHero = ({ title, subtitle, backgroundImage = "/assets/opening-hours/img.png" }: PageHeroProps) => {
  // Split title to accent the first word or main part
  const words = title.split(" ");
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(" ");

  return (
    <section className="h-[50vh] xl:h-[60vh] relative text-white flex items-center justify-center overflow-hidden bg-primary">
      {/* Dark Overlay - provides consistent premium grading and contrast */}
      <div className="bg-hero_overlay absolute w-full h-full z-10 bg-primary/[0.90]" />
      
      {/* Background Image with Parallax Scroll effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        data-scroll
        data-scroll-speed="-0.15"
      />

      {/* Hero Content */}
      <div className="container mx-auto h-full flex flex-col justify-center items-center z-30 relative pt-16">
        <div 
          className="flex flex-col items-center justify-center text-center gap-6"
          data-scroll
          data-scroll-speed="0.3"
        >
          {/* Small badge overlay */}
          <Badge containerStyles="hidden xl:flex xl:w-[120px] xl:h-[120px]" />
          
          <h1 className="h2 text-white font-primary uppercase tracking-[0.05em] mt-2">
            <span className="text-accent mr-3">{firstWord}</span>
            {remainingWords}
          </h1>

          <Separator bg="accent" />

          {subtitle && (
            <p className="lead font-light text-white/80 max-w-[500px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
