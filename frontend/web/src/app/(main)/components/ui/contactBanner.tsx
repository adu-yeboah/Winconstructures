"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://uploads.prod01.sydney.platformos.com/instances/699/assets/modules/website/images/home/hero-image.webp?updated=1770343947')`,
        }}
      />
      <div className="absolute inset-0 bg-primary-dark/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Header */}
          <div className="text-center mb-12">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-6 h-px bg-secondary" />
              <span className="text-secondary text-xs font-medium tracking-[0.14em] uppercase">
                Get in touch
              </span>
              <span className="block w-6 h-px bg-secondary" />
            </div>

            {/* Title */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
              Let's find your{" "}
              <em className="italic text-secondary">perfect</em>
              <br />
              property together
            </h2>

            <p className="text-white/65 text-lg max-w-2xl mx-auto font-light">
              Our team is ready to assist you with all your real estate needs. Whether you're buying, selling, or just exploring options, we're here to help.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row ">
              {/* Left Side - Contact Info */}
              <div className="lg:w-1/2 bg-secondary text-white p-10 lg:p-12">
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">Contact Information</h3>

                <div className="space-y-8">
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-2.5 rounded-full shrink-0">
                      <FaPhone className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 tracking-wide">PHONE</h4>
                      <p className="text-white/90 text-sm">(123) 456-7890</p>
                      <p className="text-white/90 text-sm">(098) 765-4321</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-2.5 rounded-full shrink-0">
                      <FaEnvelope className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 tracking-wide">EMAIL</h4>
                      <p className="text-white/90 text-sm">info@wisconstructures.com</p>
                      <p className="text-white/90 text-sm">support@wisconstructures.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-2.5 rounded-full shrink-0">
                      <FaMapMarkerAlt className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 tracking-wide">OFFICE</h4>
                      <p className="text-white/90 text-sm">123 Real Estate Ave</p>
                      <p className="text-white/90 text-sm">New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-2.5 rounded-full shrink-0">
                      <FaClock className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 tracking-wide">HOURS</h4>
                      <p className="text-white/90 text-sm">Monday - Friday: 9AM - 6PM</p>
                      <p className="text-white/90 text-sm">Saturday: 10AM - 2PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="lg:w-1/2 p-10 lg:p-12">
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-2 text-gray-900">Send us a message</h3>
                <p className="text-gray-600 mb-8 font-light">We'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2 text-sm font-medium">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

     
    </section>
  );
};

export default ContactSection;