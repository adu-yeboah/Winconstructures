"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-primary-dark text-white overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Wiscon Structures Logo"
                width={120}
                height={60}
                className="h-10 w-auto"
                priority
              />
              <h3 className="font-serif text-2xl font-light tracking-wide">
                Wincon Structures
              </h3>
            </div>

            <p className="text-white/65 leading-relaxed max-w-lg font-light mb-8">
              Discover curated luxury homes, investment properties, and premium
              spaces designed for modern living. We help you buy, rent, and
              invest with confidence.
            </p>

            <div className="space-y-4 text-sm text-white/70 font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>(123) 345-6789</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span>support@winconstructures.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-6">
              Navigation
            </p>

            <div className="space-y-4 text-white/70 font-light">
              <Link
                href="/about"
                className="block hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/search"
                className="block hover:text-white transition-colors"
              >
                Properties
              </Link>
              <Link
                href="/services"
                className="block hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-6">
              Follow Us
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedin,
                FaYoutube,
                FaTiktok,
                FaPinterest,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-secondary hover:border-secondary transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 font-light">
          <p>
            © {new Date().getFullYear()} Wincon Structures. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
