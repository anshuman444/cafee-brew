"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import { siteConfig } from "@/src/data/siteConfig";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const socialIcons = [
    { icon: <FaYoutube />, href: siteConfig.socialLinks.youtube },
    { icon: <FaFacebook />, href: siteConfig.socialLinks.facebook },
    { icon: <FaTwitter />, href: siteConfig.socialLinks.twitter },
    { icon: <FaInstagram />, href: siteConfig.socialLinks.instagram },
  ];

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="Get In Touch"
        subtitle="We value our connections. Contact our curators, inquire about private bookings, or share your feedback."
        backgroundImage="/assets/opening-hours/img.png"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info details */}
          <div 
            className="lg:col-span-5 flex flex-col gap-8"
            data-scroll
            data-scroll-speed="0.05"
          >
            <div>
              <span className="text-accent uppercase tracking-widest text-xs font-semibold">Contact Channels</span>
              <h2 className="font-primary text-3xl uppercase mt-2">Connect With Us</h2>
              <div className="w-[80px] h-[1px] bg-accent mt-2" />
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded border border-white/5">
                <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent text-lg flex-shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="text-xs uppercase text-accent tracking-wider font-semibold">Our Location</h4>
                  <p className="text-secondary text-sm mt-1">{siteConfig.contact.address}, {siteConfig.contact.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/20 p-4 rounded border border-white/5">
                <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent text-lg flex-shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="text-xs uppercase text-accent tracking-wider font-semibold">Call Curators</h4>
                  <p className="text-secondary text-sm mt-1">{siteConfig.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/20 p-4 rounded border border-white/5">
                <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent text-lg flex-shrink-0">
                  <FiMail />
                </div>
                <div>
                  <h4 className="text-xs uppercase text-accent tracking-wider font-semibold">Direct Email</h4>
                  <p className="text-secondary text-sm mt-1">{siteConfig.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/20 p-4 rounded border border-white/5">
                <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent text-lg flex-shrink-0 mt-0.5">
                  <FiClock />
                </div>
                <div>
                  <h4 className="text-xs uppercase text-accent tracking-wider font-semibold">Operating Hours</h4>
                  <ul className="text-secondary text-xs flex flex-col gap-1 mt-1.5">
                    {siteConfig.openingHours.map((h, i) => (
                      <li key={i} className="flex justify-between w-[200px]">
                        <span className="font-semibold">{h.day}:</span>
                        <span>{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="border-t border-white/5 pt-6">
              <h4 className="text-xs uppercase text-secondary tracking-widest font-semibold mb-4">Follow Our Updates</h4>
              <div className="flex gap-4">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:text-accent hover:border-accent/40 transition-all text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-lg">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Send Message</span>
            <h3 className="font-primary text-2xl uppercase mt-1 mb-6">Drop Us A Line</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
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
                  Your Name
                </label>
              </div>

              {/* Email */}
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

              {/* Subject */}
              <div className="relative w-full">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px]"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                >
                  Subject
                </label>
              </div>

              {/* Message */}
              <div className="relative w-full">
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-black/50 border border-white/10 rounded px-4 pt-6 pb-2 text-white outline-none focus:border-accent transition-colors duration-300 placeholder-transparent text-[15px] resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-2 text-xs text-accent scale-75 origin-top-left transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-focus:scale-75"
                >
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full mt-2 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 bg-accent/20 border border-accent/40 text-accent text-xs p-4 rounded text-center font-semibold tracking-wider uppercase"
                >
                  ✓ Thank you! Your message has been sent successfully. We will follow up shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Gray Map Section */}
        <div 
          className="relative w-full h-[400px] border border-white/10 rounded-lg overflow-hidden mt-16 grayscale brightness-[0.7] invert-[0.9] contrast-[1.2] shadow-2xl"
          data-scroll
          data-scroll-speed="0.1"
        >
          <iframe
            src={siteConfig.contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            allowFullScreen={false}
            loading="lazy"
            title="Google Maps Location - Cafe-brew Times Square NYC"
            className="border-0"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
