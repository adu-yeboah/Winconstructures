"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, X, Menu, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAllMenus = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/search" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-white shadow-sm" : "py-5 bg-transparent"
        }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeAllMenus}>
          <Image
            src="/logo.png"
            alt="Wincon Structures Logo"
            width={120}
            height={60}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${isActive
                        ? "text-secondary"
                        : isScrolled
                          ? "text-gray-700 hover:text-primary"
                          : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-secondary transition-all duration-300 ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="bg-primary text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center gap-1.5"
          >
            Get in touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-primary-dark/60 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeAllMenus}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <Image src="/logo.png" alt="Wincon Structures" width={100} height={50} className="h-8 w-auto" />
            <button className="p-2 text-gray-500 hover:text-gray-900" onClick={closeAllMenus} aria-label="Close mobile menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <ul className="space-y-1 flex-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block py-3.5 text-lg font-light border-b border-gray-100 ${pathname === link.href ? "text-secondary" : "text-gray-800 hover:text-primary"
                    }`}
                  onClick={closeAllMenus}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <a
              href="tel:+1233456789"
              className="flex items-center gap-3 text-gray-700 hover:text-secondary mb-4 text-sm"
              onClick={closeAllMenus}
            >
              <Phone className="w-4 h-4 text-secondary" />
              (123) 345-6789
            </a>
            <Link
              href="/contact"
              className="block w-full text-center bg-primary text-white py-3.5 rounded-sm font-medium"
              onClick={closeAllMenus}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;