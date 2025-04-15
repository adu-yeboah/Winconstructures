import React from 'react';
import { FaPhone, FaMobileAlt, FaFax, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-7 rounded-md ">
                {/* Form Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-secondary">Contact Us</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Your Phone"
                                className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Your Message"
                                className="w-full border border-grey rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-white hover:border-secondary hover:text-secondary border transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info Section */}
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold mb-6 text-secondary">Contact Information</h3>
                    <ul className="space-y-8">
                        <li className="flex items-center gap-3">
                            <FaPhone className="text-tertiary" />
                            <span>Phone: +123-456-789</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaMobileAlt className="text-tertiary" />
                            <span>Mobile: +123-456-787</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaFax className="text-tertiary" />
                            <span>Fax: +123-456-788</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-tertiary" />
                            <span>Email: sales@yourwebsite.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-tertiary" />
                            <span>Address: 3015 Grand Ave, Coconut Grove, Merrick Way, FL 12345</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;