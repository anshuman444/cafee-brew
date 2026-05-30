"use client";

import { useEffect, useState, useRef } from "react";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import Image from "next/image";
import Badge from "@/components/Badge";

// Scroll-triggered custom stat counter
const StatCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = window.requestAnimationFrame(step);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const timelineData = [
  {
    year: "2000",
    title: "The First Cup",
    desc: "Cafe-brew opened its doors in a small, rustic corner of the city with a single espresso machine and a dream of quality.",
  },
  {
    year: "2008",
    title: "Roastery Founding",
    desc: "Established our micro-roastery, giving us complete control over roast profiles and direct beans quality.",
  },
  {
    year: "2015",
    title: "Direct-Trade Initiative",
    desc: "Launched partnerships with sustainable farms in Ethiopia and Colombia, bypassing middlemen to support growers.",
  },
  {
    year: "2026",
    title: "Flagship & Beyond",
    desc: "Opened our premier sensory tasting space, offering masterclasses, dessert pairings, and luxury coffee experiences.",
  },
];

const teamData = [
  {
    name: "Jonathan Brew",
    role: "Founder & Curator",
    bio: "With over 25 years in the coffee business, Jonathan leads our roasting profiles and brand philosophy.",
    image: "/assets/about/photo-1.jpg",
  },
  {
    name: "Sarah Miller",
    role: "Master Roaster",
    bio: "Sarah meticulously controls small batches, adjusting temperatures and times to coax out single-origin characteristics.",
    image: "/assets/about/photo-2.jpg",
  },
  {
    name: "Marcus Vance",
    role: "Head Barista",
    bio: "Marcus, a latte art champion, oversees brew methods, barista training, and private espresso service.",
    image: "/assets/about/photo-3.jpg",
  },
];

const AboutPage = () => {


  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="About Us"
        subtitle="Learn about the passion, craft, and partnerships that form the foundation of our cafe."
        backgroundImage="/assets/about/photo-1.jpg"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24">
        
        {/* Brand Story Section */}
        <section 
          className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center mb-24"
          data-scroll
          data-scroll-speed="0.05"
        >
          <div className="xl:col-span-6 flex flex-col gap-6 max-w-[560px]">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Who We Are</span>
            <h2 className="h2 text-left">A Legacy of Pure Taste</h2>
            <Separator bg="accent" />
            <p className="text-secondary leading-relaxed">
              For more than two decades, Cafe-brew has stood as a beacon of artisanal coffee and warm hospitality. Our commitment starts at the root, sourcing hand-harvested organic cherries from small generational farms. 
            </p>
            <p className="text-secondary leading-relaxed">
              We focus on roasting profiles that honor the unique terroir of each bean. Whether you seek the bright citrus layers of our light roasts or the full-bodied chocolate notes of our dark roasts, each cup is an expression of our devotion to the craft.
            </p>
          </div>
          
          <div className="xl:col-span-6 relative h-[450px] w-full border border-white/10 rounded-lg overflow-hidden hidden xl:block">
            <Image
              src="/assets/about/photo-3.jpg"
              fill
              sizes="(max-width: 1280px) 100vw, 50vw"
              className="object-cover opacity-90"
              alt="Cafe-brew premium coffee experience"
            />
            <div className="absolute inset-0 bg-primary/20" />
            <Badge containerStyles="w-[180px] h-[180px] absolute bottom-6 right-6 z-20" />
          </div>
        </section>

        {/* Animated Statistics Section */}
        <section 
          className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-24"
          data-scroll
          data-scroll-speed="0.1"
        >
          <div>
            <p className="font-primary text-4xl xl:text-6xl text-accent font-bold mb-2">
              <StatCounter target={25} suffix="+" />
            </p>
            <p className="text-secondary uppercase tracking-wider text-xs">Signature Blends</p>
          </div>
          <div>
            <p className="font-primary text-4xl xl:text-6xl text-accent font-bold mb-2">
              <StatCounter target={15} suffix="k+" />
            </p>
            <p className="text-secondary uppercase tracking-wider text-xs">Happy Guests</p>
          </div>
          <div>
            <p className="font-primary text-4xl xl:text-6xl text-accent font-bold mb-2">
              <StatCounter target={50} suffix="+" />
            </p>
            <p className="text-secondary uppercase tracking-wider text-xs">Direct Trade Farms</p>
          </div>
          <div>
            <p className="font-primary text-4xl xl:text-6xl text-accent font-bold mb-2">
              <StatCounter target={26} />
            </p>
            <p className="text-secondary uppercase tracking-wider text-xs">Years of Passion</p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Our Timeline</span>
            <h2 className="h2 mt-2">The Cafe-brew Journey</h2>
            <Separator bg="accent" />
          </div>

          <div className="relative border-l border-white/10 max-w-3xl mx-auto pl-8 flex flex-col gap-12">
            {timelineData.map((item, index) => (
              <div key={index} className="relative">
                {/* Gold bullet on timeline */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-primary border-2 border-accent flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                </div>
                
                <div>
                  <span className="font-primary text-xl text-accent font-bold tracking-widest">{item.year}</span>
                  <h3 className="font-primary text-2xl uppercase text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-secondary text-[15px] leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">The Masters</span>
            <h2 className="h2 mt-2">Meet Our Artisans</h2>
            <Separator bg="accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamData.map((member, index) => (
              <div
                key={index}
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden relative group hover:border-accent/40 transition-colors duration-500 flex flex-col h-full"
              >
                <div className="relative h-[320px] w-full">
                  <Image
                    src={member.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 relative z-10">
                  <div>
                    <span className="text-accent uppercase tracking-wider text-xs font-medium">{member.role}</span>
                    <h3 className="font-primary text-2xl uppercase text-white mt-1 mb-3 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
