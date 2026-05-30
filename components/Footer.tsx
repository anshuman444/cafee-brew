/**
 * Footer Component
 *
 * Site footer with navigation links, social media icons, and copyright.
 * Features:
 * - Background image with dark overlay
 * - Logo linking to home
 * - Navigation links
 * - Social media icons (YouTube, Facebook, Twitter, Instagram)
 * - Copyright notice
 */

import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/src/data/siteConfig";

// Footer navigation links
const links = [
  { href: "/", name: "Home" },
  { href: "/menu", name: "Menu" },
  { href: "/about", name: "About Us" },
  { href: "/gallery", name: "Gallery" },
  { href: "/store", name: "Store" },
  { href: "/contact", name: "Contact" },
];

const Footer = () => {
  // Dynamic social icons linked to configuration
  const socialIcons = [
    { icon: <FaYoutube />, href: siteConfig.socialLinks.youtube },
    { icon: <FaFacebook />, href: siteConfig.socialLinks.facebook },
    { icon: <FaTwitter />, href: siteConfig.socialLinks.twitter },
    { icon: <FaInstagram />, href: siteConfig.socialLinks.instagram },
  ];

  return (
    // Footer with background image (bg-footer from tailwind config)
    <footer className="bg-footer bg-cover bg-no-repeat pt-16 relative">
      {/* Dark Overlay - 90% opacity black overlay for text readability */}
      <div className="absolute w-full h-full bg-black/[0.90] z-10 top-0" />
      <div className="container mx-auto z-20 relative">
        <div className="flex flex-col items-center justify-center gap-14">
          {/* Footer Logo */}
          <Link href="/" className="relative w-[120px] h-[50px] mx-auto">
            <Image
              src="/assets/logo.svg"
              fill
              sizes="120px"
              alt="Cafe-brew Logo"
              className="object-contain"
            />
          </Link>

          {/* Footer Navigation Links - Vertical on mobile, horizontal on xl */}
          <nav className="flex flex-col xl:flex-row gap-8 xl:gap-12 justify-center items-center">
            {links.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="uppercase text-white tracking-widest hover:text-accent transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons - Circular buttons with border */}
          <ul className="flex text-white text-xl gap-4">
            {socialIcons.map((social, index) => (
              <Link
                key={`social-${index}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[54px] h-[54px] border border-white/[0.15] rounded-full flex items-center justify-center hover:text-accent transition-all"
              >
                {social.icon}
              </Link>
            ))}
          </ul>

          {/* Copyright Notice */}
          <div className="border-t border-white/10 text-[15px] text-white/70 font-light w-full flex items-center justify-center py-6">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
