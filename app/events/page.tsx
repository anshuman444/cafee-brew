"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import Image from "next/image";
import { FiCalendar, FiClock, FiDollarSign, FiX, FiCheck, FiUsers } from "react-icons/fi";

interface Event {
  id: number;
  title: string;
  category: "Music Show" | "Comedy Show" | "Open Mic";
  artist: string;
  dateTime: string;
  price: string;
  pricePerSeat: number;
  image: string;
  description: string;
  perk: string;
}

interface EventBooking {
  id: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  seats: number;
  totalPrice: string;
  timestamp: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Friday Live Acoustic Jazz",
    category: "Music Show",
    artist: "The Olivia Davis Quartet",
    dateTime: "Friday, June 05, 2026 at 07:00 PM",
    price: "₹450 / seat",
    pricePerSeat: 450,
    image: "/assets/about/photo-3.jpg",
    description: "An intimate evening of classic jazz, warm blues, and acoustic solos curated to complement our dark roast coffee selections.",
    perk: "Includes a complimentary signature pour-over or latte"
  },
  {
    id: 2,
    title: "Sunday Stand-Up & Coffee",
    category: "Comedy Show",
    artist: "Rahul Kapoor & Friends",
    dateTime: "Sunday, June 07, 2026 at 06:00 PM",
    price: "₹350 / seat",
    pricePerSeat: 350,
    image: "/assets/about/photo-1.jpg",
    description: "A high-energy stand-up comedy lineup featuring the city's finest comedians. Laughs and espresso are guaranteed to flow.",
    perk: "Includes a complimentary fresh butter croissant"
  },
  {
    id: 3,
    title: "Acoustic Open Mic Night",
    category: "Open Mic",
    artist: "Local Coffeehouse Artists",
    dateTime: "Thursday, June 11, 2026 at 08:00 PM",
    price: "Free Entry",
    pricePerSeat: 0,
    image: "/assets/about/photo-2.jpg",
    description: "Watch local acoustic songwriters, poets, and storytellers take the stage. Grab a warm cup and discover new local talent.",
    perk: "Table reservation guaranteed, drinks billed on order"
  }
];

const LiveEventsPage = () => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEvent) return;
    setIsSubmitting(true);

    const calculatedTotal = activeEvent.pricePerSeat > 0 
      ? `₹${activeEvent.pricePerSeat * seats}` 
      : "Free Entry";

    const newBooking: EventBooking = {
      id: `EV-${Date.now().toString().slice(-5)}`,
      eventName: activeEvent.title,
      customerName: name,
      customerEmail: email,
      seats,
      totalPrice: calculatedTotal,
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      // Save to localStorage
      const existingBookingsStr = localStorage.getItem("zenbrew_bookings_v1");
      const existingBookings: EventBooking[] = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
      localStorage.setItem("zenbrew_bookings_v1", JSON.stringify([...existingBookings, newBooking]));

      setIsSubmitting(false);
      setBookingSuccess(true);

      setTimeout(() => {
        setBookingSuccess(false);
        setActiveEvent(null);
        setName("");
        setEmail("");
        setSeats(2);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="Live Events"
        subtitle="Experience acoustic jazz, laughter, and open mic evenings. Secure your entry tickets below."
        backgroundImage="/assets/about/photo-3.jpg"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24 max-w-5xl">
        {/* Story details */}
        <section 
          className="text-center max-w-[650px] mx-auto mb-16"
          data-scroll
          data-scroll-speed="0.05"
        >
          <span className="text-accent uppercase tracking-widest text-xs font-semibold">Cultivating Culture</span>
          <h2 className="h2 mt-2">Arts & Espresso</h2>
          <Separator bg="accent" />
          <p className="text-secondary leading-relaxed mt-4">
            We believe a cafe is more than a place to grab caffeine; it is a community stage. Every week, we transform our lounge into an intimate performance space hosting talented local musicians, stand-up acts, and indie storytellers.
          </p>
        </section>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/30 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-accent/40 transition-colors duration-500 h-full"
            >
              {/* Event Image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={event.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={event.title}
                />
                <div className="absolute top-3 left-3 bg-accent text-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                  {event.category}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-primary text-2xl uppercase text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  {/* Artist */}
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-4">
                    Featuring: {event.artist}
                  </p>

                  <p className="text-secondary text-xs leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Metadata fields */}
                  <div className="flex flex-col gap-2.5 text-xs text-secondary border-t border-white/5 pt-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-accent" />
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="text-accent" />
                      <span className="italic text-accent/80 font-medium">{event.perk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-accent" />
                      <span className="text-white font-bold">{event.price}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  type="button"
                  onClick={() => setActiveEvent(event)}
                  className="btn w-full text-xs font-bold uppercase tracking-widest mt-auto"
                >
                  Book Seat / Ticket
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Form Dialog Modal */}
      <AnimatePresence>
        {activeEvent && (
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
              className="bg-primary border border-white/15 w-full max-w-lg rounded-lg overflow-hidden relative p-6 xl:p-8"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 text-white hover:text-accent outline-none text-xl z-20"
                aria-label="Close booking modal"
              >
                <FiX />
              </button>

              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <form onSubmit={handleBooking} className="flex flex-col gap-5">
                    <div>
                      <span className="text-accent uppercase tracking-widest text-[10px] font-semibold">{activeEvent.category}</span>
                      <h3 className="font-primary text-2xl uppercase text-white mt-1">Book Entry Tickets</h3>
                      <p className="text-secondary text-xs mt-1">Event: <strong>{activeEvent.title}</strong></p>
                      <div className="w-16 h-[1px] bg-accent mt-3" />
                    </div>

                    {/* Full Name */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-sm"
                      />
                      <label
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative w-full">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-sm"
                      />
                      <label
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Seats count select */}
                    <div className="relative w-full">
                      <select
                        value={seats}
                        onChange={e => setSeats(parseInt(e.target.value, 10))}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 text-sm block min-h-[54px] appearance-none"
                      >
                        <option value={1} className="bg-primary">1 Seat</option>
                        <option value={2} className="bg-primary">2 Seats</option>
                        <option value={3} className="bg-primary">3 Seats</option>
                        <option value={4} className="bg-primary">4 Seats</option>
                        <option value={5} className="bg-primary">5 Seats (Max)</option>
                      </select>
                      <label
                        className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300"
                      >
                        Number of Seats
                      </label>
                    </div>

                    {/* Price and Action */}
                    <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-secondary uppercase tracking-widest">Total Price</p>
                        <p className="text-xl font-semibold text-accent">
                          {activeEvent.pricePerSeat > 0 ? `₹${activeEvent.pricePerSeat * seats}` : "Free Entry"}
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn flex-1 text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Confirm Seat Booking"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-accent text-accent flex items-center justify-center text-3xl mb-6 shadow-[0_0_10px_rgba(199,161,122,0.3)]">
                      <FiCheck />
                    </div>
                    <h3 className="font-primary text-3xl uppercase text-white mb-2">Booking Confirmed</h3>
                    <p className="text-secondary text-sm max-w-xs mb-4">
                      Your tickets for **{activeEvent.title}** have been reserved.
                    </p>
                    <div className="bg-black/30 border border-white/5 p-4 rounded text-left w-full text-xs flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-secondary">Holder Name:</span>
                        <span className="text-white font-bold">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Seats Booked:</span>
                        <span className="text-white font-bold">{seats} Seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Grand Total:</span>
                        <span className="text-accent font-bold">
                          {activeEvent.pricePerSeat > 0 ? `₹${activeEvent.pricePerSeat * seats}` : "Free Entry"}
                        </span>
                      </div>
                    </div>
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

export default LiveEventsPage;
