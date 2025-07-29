import React from 'react';
import { FaPhone, FaMobileAlt, FaFax, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <div className="bg-gray-50 py-12 min-h-[calc(100vh-80px)]">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to discuss a project? Reach out to us and our team will get back to you promptly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Form Section */}
                    <div className="p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6 text-secondary">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="0240000000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    placeholder="How can we help you?"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-medium hover:scale-102 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div className="bg-gradient-to-br from-secondary to-primary p-8 md:p-10 text-white">
                        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <FaPhone className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-white/90">+1 (123) 456-7890</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <FaMobileAlt className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Mobile</h3>
                                    <p className="text-white/90">+1 (123) 456-7878</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <FaFax className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Fax</h3>
                                    <p className="text-white/90">+1 (123) 456-7888</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <FaEnvelope className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-white/90">contact@yourcompany.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <FaMapMarkerAlt className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Headquarters</h3>
                                    <p className="text-white/90">
                                        3015 Grand Avenue<br />
                                        Coconut Grove, FL 12345<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-10 pt-6 border-t border-white/20">
                            <h3 className="font-semibold mb-4">Business Hours</h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 5:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 2:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;