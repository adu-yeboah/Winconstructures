"use client"; // Ensure client-side rendering for Next.js App Router

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-white text-black py-12 mt-6">

            {/* Content */}
            <div className="relative z-10 mx-auto px-4 container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Column 1: Company Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-500 mr-2 flex items-center justify-center">
                                <span className="text-black font-bold">🏠</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary">Wisconstructures</h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Discover leading properties and secure your dream home with us. Expert guidance and support at every step.
                        </p>
                        <ul className="text-gray-400 space-y-2">
                            <li className="flex items-center">
                                <span className="mr-2">📞</span> (123) 345-6789
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📧</span> support@tangibewp.com
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Useful Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 uppercase text-secondary">Useful Links</h4>
                        <ul className="text-gray-400 space-y-2">
                            <li>
                                <a href="#" className="hover:text-secondary transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-secondary transition">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-secondary transition">
                                    search
                                </a>
                            </li>
                        </ul>
                    </div>

                   

                    {/* Column 3 Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 uppercase text-secondary">Follow Our Social Media</h4>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaYoutube size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaTiktok size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition">
                                <FaPinterest size={20} />
                            </a>
                        </div>


                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    © 2025 Wisconstructure - Real Estate WordPress Theme. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;