"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaWhatsapp } from 'react-icons/fa';
import { useMessages } from '@/hooks/useMessage';
import { Loader2, MapPin, Mail, Phone, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactSection: React.FC = () => {
  const { createMessage, loading } = useMessages();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMessage({
        title: formData.name,
        email: formData.email,
        subject: "Homepage Contact Form",
        message: `${formData.message}\n\nPhone: ${formData.phone}`,
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      toast.error(message);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      details: ["+233 24 000 0000", "+233 55 000 0000"],
      color: "bg-blue-500",
      action: "tel:+2332400000000"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      details: ["info@winconstructures.com", "support@winconstructures.com"],
      color: "bg-primary",
      action: "mailto:info@winconstructures.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      details: ["East Legon, Accra", "Greater Accra, Ghana"],
      color: "bg-secondary",
      action: null
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
      color: "bg-amber-500",
      action: null
    }
  ];

  return (
    <section className="relative min-h-screen py-32 flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://uploads.prod01.sydney.platformos.com/instances/699/assets/modules/website/images/home/hero-image.webp?updated=1770343947')`,
        }}
      />
      <div className="absolute inset-0 bg-primary-dark/60" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Let&apos;s Find Your{" "}
            <span className="text-secondary font-semibold italic">Perfect</span>{" "}
            Property
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
            Whether you&apos;re buying, selling, or investing, our dedicated team is here to guide you every step of the way.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 ${item.action ? 'cursor-pointer' : ''}`}
                onClick={() => item.action && window.open(item.action, '_blank')}
              >
                <div className="flex items-start gap-4">
                  <div className={`${item.color} p-3 rounded-xl shrink-0`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      {item.title}
                    </h4>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaWhatsapp className="text-3xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Quick Response</h4>
                  <p className="text-white/90 text-sm">Chat with us on WhatsApp</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
              <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-gray-500 text-sm">
                  Fill out the form below and we&apos;ll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-semibold">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-gray-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233 XX XXX XXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-semibold">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your property needs..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all bg-gray-50 hover:bg-gray-100"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        
      </div>
    </section>
  );
};

export default ContactSection;
