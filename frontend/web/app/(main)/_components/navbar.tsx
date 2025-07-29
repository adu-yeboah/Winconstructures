"use client";
import React, {  useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Properties", href: "/search" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <nav
            className={`relative top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white shadow-lg' : 'py-4 bg-white/95 backdrop-blur-sm'}`}
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center"
                        onClick={closeAllMenus}
                    >
                        <Image
                            src="/logo.png"
                            alt="Wiscon Structures Logo"
                            width={120}
                            height={60}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-gray-800 hover:text-secondary font-medium transition-colors duration-200 relative group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center space-x-6 ml-6">
                        <a
                            href="tel:+1233456789"
                            className="flex items-center text-gray-700 hover:text-secondary transition-colors"
                            aria-label="Contact phone number"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (123) 345-6789
                        </a>
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium duration-200 shadow-md hover:shadow-lg"
                            role="button"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-700 hover:text-secondary focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeAllMenus}
            ></div>

            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-end mb-8">
                        <button
                            className="p-2 text-gray-700 hover:text-secondary"
                            onClick={closeAllMenus}
                            aria-label="Close mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-4 flex-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block py-3 text-lg text-gray-800 hover:text-secondary font-medium border-b border-gray-100"
                                    onClick={closeAllMenus}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-gray-200">
                        <a
                            href="tel:+1233456789"
                            className="flex items-center text-gray-700 hover:text-secondary mb-4"
                            onClick={closeAllMenus}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (123) 345-6789
                        </a>
                        <Link
                            href="/contact"
                            className="block w-full text-center bg-secondary text-white py-3 rounded-lg font-medium"
                            onClick={closeAllMenus}
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;