"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
    variant?: "main" | "admin";
};

const Navbar: FC<NavbarProps> = ({ variant = "main" }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleServices = () => setIsServicesOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <nav className="relative z-10 flex justify-between items-center py-4 md:p-4 shadow bg-white w-full" aria-label="Main navigation">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/" className="flex items-center ml-4 lg:ml-[100px]">
                    <Image
                        src="/logo.png"
                        alt="Wiscon Structures Logo"
                        width={100}
                        height={52}
                        className="h-8 mr-2"
                        priority
                    />
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
                className="md:hidden flex items-center px-3 py-2 text-black"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* Navigation Links */}
            <ul
                className={`${isMobileMenuOpen ? "flex" : "hidden"
                    } md:flex flex-col md:flex-row gap-4  absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}
                role="menubar"
            >
                <li>
                    <Link
                        href="/"
                        className="text-black hover:text-secondary block px-2 py-1"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                </li>


                {/* Clickable Services Dropdown */}
                {/* <li className="relative">
                    <button
                        className="text-black hover:text-secondary flex items-center cursor-pointer px-2 py-1"
                        aria-haspopup="true"
                        aria-expanded={isServicesOpen}
                        id="services-menu"
                        role="menuitem"
                        onClick={toggleServices}
                    >
                        Our Services
                    </button>
                    <ul
                        className={`${
                            isServicesOpen ? "block" : "hidden"
                        } bg-white shadow-lg rounded w-48 h-max md:absolute top-full left-0 pt-2 md:pt-2`}
                        role="menu"
                        aria-labelledby="services-menu"
                    >
                        <li className="block px-4 py-2 text-black hover:bg-secondary hover:text-primary cursor-pointer">
                            <Link
                                href="/services/commercial"
                                role="menuitem"
                                onClick={() => {
                                    setIsServicesOpen(false);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Commercial
                            </Link>
                        </li>
                        <li className="block px-4 py-2 text-black hover:bg-secondary hover:text-primary">
                            <Link
                                href="/services/residential"
                                role="menuitem"
                                onClick={() => {
                                    setIsServicesOpen(false);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Residential
                            </Link>
                        </li>
                    </ul>
                </li> */}

                <li>
                    <Link
                        href="/about"
                        className="text-black hover:text-secondary block px-2 py-1"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                </li>

                <li>
                    <Link
                        href="/contact"
                        className="text-black hover:text-secondary block px-2 py-1"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </li>

                <li>
                    <Link
                        href="/search"
                        className="text-black hover:text-secondary block px-2 py-1"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Properties
                    </Link>
                </li>

            </ul>

            {/* Contact Info and CTA */}
            <div className="hidden md:flex items-center space-x-4 mr-4 lg:mr-[100px]">
                <a href="tel:+1233456789" className="text-black hover:text-secondary" aria-label="Contact phone number">
                    (123) 345-6789
                </a>
                <Link
                    href="/contact"
                    className="bg-secondary text-primary px-4 py-2 rounded border hover:border-secondary hover:text-secondary hover:bg-primary"
                    role="button"
                >
                    Get In Touch
                </Link>
            </div>

            {/* Mobile Contact Info and CTA */}
            <div
                className={`${isMobileMenuOpen ? "flex" : "hidden"
                    } flex-col items-start space-y-4 p-4 w-full z-100 bg-white shadow-md absolute top-[calc(100%+56px)] left-0 md:hidden`}
            >

                <Link
                    href="/about"
                    className="text-black hover:text-secondary block px-2 py-1"
                    role="menuitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    About
                </Link>

                <Link
                    href="/contact"
                    className="text-black hover:text-secondary block px-2 py-1"
                    role="menuitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Contact
                </Link>

                <Link
                    href="/search"
                    className="text-black hover:text-secondary block px-2 py-1"
                    role="menuitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Properties
                </Link>


                <div className="flex flex-row items-center w-full gap-3.5">
                    <a
                        href="tel:+1233456789"
                        className="text-black hover:text-secondary"
                        aria-label="Contact phone number"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        (123) 345-6789
                    </a>
                    <Link
                        href="/contact"
                        className="bg-secondary text-primary px-4 py-2 rounded border hover:border-secondary hover:text-secondary hover:bg-primary"
                        role="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;