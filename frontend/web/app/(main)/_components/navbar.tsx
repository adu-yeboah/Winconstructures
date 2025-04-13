"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
    variant?: "main" | "admin";
};

const Navbar: FC<NavbarProps> = ({ variant = "main" }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const toggleServices = () => setIsServicesOpen((prev) => !prev);

    return (
        <nav className="relative z-10 flex justify-between items-center p-4 shadow bg-white" aria-label="Main navigation">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/" className="flex items-center ml-[100px]">
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

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-8" role="menubar">
                <li>
                    <Link href="/" className="text-black hover:text-secondary" role="menuitem">
                        Home
                    </Link>
                </li>

                {/* Clickable Services Dropdown */}
                <li className="relative">
                    <button
                        className="text-black hover:text-secondary flex items-center cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={isServicesOpen}
                        id="services-menu"
                        role="menuitem"
                        onClick={toggleServices}
                    >
                        Our Services <span className="ml-1">▼</span>
                    </button>
                    <ul
                        className={`absolute ${isServicesOpen ? "block" : "hidden"} bg-primary shadow-lg rounded w-48 top-full left-0 pt-2`}
                        role="menu"
                        aria-labelledby="services-menu"
                    >
                        <li
                            className="block px-4 py-2 text-black hover:bg-secondary hover:text-primary cursor-pointer"
                        >
                            <Link
                                href="/services/residential"

                                role="menuitem"
                            >
                                Residential
                            </Link>
                        </li>
                        <li className="block px-4 py-2 text-black hover:bg-secondary hover:text-primary cursor-pointer">
                            <Link
                                href="/services/commercial"
                                role="menuitem"
                            >
                                Commercial
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link href="/projects" className="text-black hover:text-secondary" role="menuitem">
                        About
                    </Link>
                </li>

                <li>
                    <Link href="/contact" className="text-black hover:text-secondary" role="menuitem">
                        Contact
                    </Link>
                </li>
            </ul>

            {/* Contact Info and CTA */}
            <div className="flex items-center space-x-4">
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
        </nav>
    );
};

export default Navbar;