"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/data/siteConfig";


interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

const ReservationPage = () => {
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2 Guests",
    requests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReservation = {
      id: `RES-${Date.now().toString().slice(-5)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      requests: form.requests,
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      // Save to localStorage
      const existingReservationsStr = localStorage.getItem("zenbrew_reservations_v1");
      const existingReservations = existingReservationsStr ? JSON.parse(existingReservationsStr) : [];
      localStorage.setItem("zenbrew_reservations_v1", JSON.stringify([...existingReservations, newReservation]));

      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      <PageHero
        title="Book A Table"
        subtitle="Reserve a cozy corner or a luxury table. Let us craft an unforgettable dining experience for you."
        backgroundImage="/assets/about/photo-1.jpg"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Column: Reservation Form */}
          <div className="lg:col-span-7 bg-black/40 backdrop-blur-md border border-white/10 p-8 xl:p-12 rounded-lg relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="reservation-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="mb-4">
                    <span className="text-accent uppercase tracking-widest text-xs font-semibold">Reservation Details</span>
                    <h2 className="font-primary text-3xl uppercase mt-2">Secure Your Table</h2>
                    <div className="w-[80px] h-[1px] bg-accent mt-2" />
                  </div>

                  {/* Name field with floating label */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px]"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative w-full">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px]"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px]"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                      >
                        Phone Number
                      </label>
                    </div>
                  </div>

                  {/* Date & Time grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative w-full">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 text-[15px] block min-h-[54px]"
                      />
                      <label
                        htmlFor="date"
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300"
                      >
                        Reservation Date
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="time"
                        name="time"
                        id="time"
                        required
                        value={form.time}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 text-[15px] block min-h-[54px]"
                      />
                      <label
                        htmlFor="time"
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300"
                      >
                        Preferred Time
                      </label>
                    </div>

                    <div className="relative w-full">
                      <select
                        name="guests"
                        id="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 text-[15px] block min-h-[54px] appearance-none"
                      >
                        <option value="1 Guest" className="bg-primary">1 Guest</option>
                        <option value="2 Guests" className="bg-primary">2 Guests</option>
                        <option value="3 Guests" className="bg-primary">3 Guests</option>
                        <option value="4 Guests" className="bg-primary">4 Guests</option>
                        <option value="5 Guests" className="bg-primary">5 Guests</option>
                        <option value="6+ Guests" className="bg-primary">6+ Guests (Event)</option>
                      </select>
                      <label
                        htmlFor="guests"
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300"
                      >
                        Number of Guests
                      </label>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="relative w-full">
                    <textarea
                      name="requests"
                      id="requests"
                      rows={4}
                      value={form.requests}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px] resize-none"
                    />
                    <label
                      htmlFor="requests"
                      className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                    >
                      Special Requests (Dietary needs, anniversaries, etc.)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-overlay"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  {/* Luxury animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="w-20 h-20 rounded-full border-2 border-accent flex items-center justify-center text-accent text-4xl mb-6 shadow-[0_0_15px_rgba(199,161,122,0.3)]"
                  >
                    ✓
                  </motion.div>

                  <h3 className="font-primary text-4xl uppercase mb-2">Reservation Confirmed</h3>
                  <p className="text-secondary text-sm max-w-sm mb-8">
                    Your luxury table booking at Cafe-brew has been secured. A confirmation email has been dispatched with access details.
                  </p>

                  <div className="w-full bg-black/20 border border-white/5 p-6 rounded-lg text-left max-w-md mb-8 flex flex-col gap-3">
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-secondary">Guest Name:</span>
                      <span className="text-white font-semibold">{form.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-secondary">Guests Count:</span>
                      <span className="text-white font-semibold">{form.guests}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-secondary">Date & Time:</span>
                      <span className="text-accent font-semibold">{form.date} at {form.time}</span>
                    </div>
                    {form.requests && (
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-secondary">Special Requests:</span>
                        <span className="text-white bg-primary/40 p-2 rounded text-xs leading-relaxed italic">&ldquo;{form.requests}&rdquo;</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="border border-white/10 hover:border-accent/40 bg-transparent text-white px-6 py-3 uppercase tracking-widest text-xs font-semibold rounded transition-colors"
                    >
                      Book Another Table
                    </button>
                    <Link href="/">
                      <button type="button" className="btn text-xs w-full sm:w-auto">Return Home</button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Reservation details & Policy */}
          <div 
            className="lg:col-span-5 flex flex-col gap-8 lg:pl-6"
            data-scroll
            data-scroll-speed="0.1"
          >
            {/* Story/Brand section */}
            <div className="flex flex-col gap-4">
              <span className="text-accent uppercase tracking-widest text-xs font-semibold">The Lounge</span>
              <h3 className="font-primary text-3xl uppercase">Direct-Trade Brews & Private Tables</h3>
              <Separator bg="accent" />
              <p className="text-secondary text-[15px] leading-relaxed">
                Enjoy curated seating with private table bookings. We offer direct trade single-origins, specialized flight tastings, and chef-led artisan dessert pairings reserved exclusively for our dining room.
              </p>
            </div>

            {/* Practical info cards */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <div className="flex gap-4">
                <span className="text-accent text-lg">✦</span>
                <div>
                  <h4 className="font-primary text-lg uppercase mb-1">Arrival Policy</h4>
                  <p className="text-secondary text-sm">We hold tables for a maximum of 15 minutes beyond your reservation time. Please contact us if you run late.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <span className="text-accent text-lg">✦</span>
                <div>
                  <h4 className="font-primary text-lg uppercase mb-1">Private Functions</h4>
                  <p className="text-secondary text-sm">Looking to reserve the entire room for gatherings or coffee workshops? Check out our Contact page to get in touch with our event curators.</p>
                </div>
              </div>
            </div>

            {/* Small image overlay */}
            <div className="relative h-[200px] w-full rounded overflow-hidden border border-white/10 hidden lg:block">
              <Image 
                src="/assets/about/photo-3.jpg" 
                fill 
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover opacity-70"
                alt="Cafe-brew private table setting"
              />
              <div className="absolute inset-0 bg-primary/30" />
            </div>
          </div>

        </div>

        {/* Store Location & Map Section */}
        <section 
          className="mt-20 border-t border-white/10 pt-16"
          data-scroll
          data-scroll-speed="0.05"
        >
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Visit Us</span>
            <h2 className="font-primary text-3xl xl:text-4xl uppercase mt-2">Find Our Store</h2>
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
              title="Google Maps Location - Cafe-brew Store Location"
              className="border-0"
            ></iframe>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ReservationPage;
