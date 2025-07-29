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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-tertiary/90"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Contact Info */}
            <div className="lg:w-1/2 bg-secondary text-white p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg mb-8 text-white/90 leading-relaxed">
                Our team is ready to assist you with all your real estate needs. 
                Whether you are buying, selling, or just exploring options, we are here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-white/80">(123) 456-7890</p>
                    <p className="text-white/80">(098) 765-4321</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-white/80">info@wisconstructures.com</p>
                    <p className="text-white/80">support@wisconstructures.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-white/80">123 Real Estate Ave</p>
                    <p className="text-white/80">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Hours</h3>
                    <p className="text-white/80">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-white/80">Saturday: 10AM - 2PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:w-1/2 p-12">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">We will get back to you within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "100+", label: "Happy Clients" },
            { value: "50+", label: "5-Star Reviews" },
            { value: "200+", label: "Successful Sales" },
            { value: "10+", label: "Years Experience" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-2">{stat.value}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;