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
      {/* Top edge — quiet nod to the blueprint motif used elsewhere on the site */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        className="absolute inset-0 opacity-[0.004] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Wincon Structures Logo"
                width={120}
                height={60}
                className="h-10 w-auto"
                priority
              />
              <h3 className="font-serif text-2xl font-light tracking-wide">
                Wincon Structures
              </h3>
            </div>

            <p className="text-white/55 leading-relaxed max-w-lg font-light mb-8">
              Curated luxury homes, investment properties, and premium spaces
              designed for modern living — helping you buy, rent, and invest
              with confidence.
            </p>

            <div className="space-y-3.5 text-sm text-white/70 font-light">
              <a href="tel:+1233456789" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Phone className="w-4 h-4 text-secondary" />
                <span>(123) 345-6789</span>
              </a>

              <a href="mailto:support@winconstructures.com" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4 text-secondary" />
                <span>support@winconstructures.com</span>
              </a>

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

            <div className="space-y-3.5 text-white/65 font-light">
              <Link href="/about" className="block hover:text-white transition-colors w-fit">
                About us
              </Link>
              <Link href="/search" className="block hover:text-white transition-colors w-fit">
                Properties
              </Link>
              <Link href="/services" className="block hover:text-white transition-colors w-fit">
                Services
              </Link>
              <Link href="/contact" className="block hover:text-white transition-colors w-fit">
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-6">
              Follow us
            </p>

            <div className="flex flex-wrap gap-2.5">
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
                  className="w-10 h-10 rounded-sm border border-white/10 bg-white/[0.04] hover:bg-secondary hover:border-secondary hover:text-primary-dark transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/45 font-light">
          <p>
            © {new Date().getFullYear()} Wincon Structures. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;