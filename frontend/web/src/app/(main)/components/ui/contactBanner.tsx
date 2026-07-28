"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaWhatsapp } from 'react-icons/fa';
import { useMessages } from '@/hooks/useMessage';
import { Loader2, MapPin, Mail, Phone, Send, ArrowUpRight } from 'lucide-react';
import { toast } from 'react-toastify';

/** Small architectural registration mark — the section's recurring signature motif. */
const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

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
      toast.success("Message sent. We'll reply within 24 hours.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      toast.error(message);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-[18px] h-[18px]" />,
      title: "Call",
      details: ["+233 24 000 0000", "+233 55 000 0000"],
      action: "tel:+2332400000000"
    },
    {
      icon: <Mail className="w-[18px] h-[18px]" />,
      title: "Email",
      details: ["info@winconstructures.com", "support@winconstructures.com"],
      action: "mailto:info@winconstructures.com"
    },
    {
      icon: <MapPin className="w-[18px] h-[18px]" />,
      title: "Visit",
      details: ["East Legon, Accra", "Greater Accra, Ghana"],
      action: null
    },
    {
      icon: <FaClock className="w-[16px] h-[16px]" />,
      title: "Hours",
      details: ["Mon – Fri, 9:00 – 18:00", "Sat, 10:00 – 14:00"],
      action: null
    }
  ];

  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1350&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-primary-dark/85" />
      {/* Blueprint grid overlay — ties the "Structures" identity through the background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-secondary" />
            
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1]">
            Let&apos;s find your{" "}
            <em className="not-italic text-secondary font-medium">perfect</em>{" "}
            property
          </h2>

          <p className="text-white/60 text-base md:text-lg mt-5 font-light leading-relaxed">
            Whether you&apos;re buying, selling, or investing, our team is ready
            to guide you through every stage.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative bg-white/[0.06] backdrop-blur-sm rounded-sm p-6 border border-white/10 transition-colors duration-300 hover:bg-white/10 ${item.action ? 'cursor-pointer' : ''}`}
                onClick={() => item.action && window.open(item.action, '_blank')}
              >
                <CornerMarks className="border-secondary/50" />
                <div className="flex items-start gap-4">
                  <div className="text-secondary shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-medium text-white/50 mb-2 uppercase tracking-[0.14em]">
                      {item.title}
                    </h4>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-white text-sm font-light mb-0.5 truncate">{detail}</p>
                    ))}
                  </div>
                  {item.action && (
                    <ArrowUpRight className="w-4 h-4 text-white/30 shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Quick Contact */}
            <motion.a
              href="https://wa.me/233240000000"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="sm:col-span-2 lg:col-span-1 relative flex items-center gap-4 bg-secondary/90 hover:bg-secondary rounded-sm p-6 transition-colors duration-300 group"
            >
              <CornerMarks className="border-primary-dark/40" />
              <FaWhatsapp className="text-2xl text-primary-dark shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-primary-dark">Chat with us directly</h4>
                <p className="text-primary-dark/70 text-xs font-light">Usually replies within minutes</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-primary-dark/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative bg-white rounded-sm shadow-2xl p-8 lg:p-10">
              <CornerMarks className="border-secondary" />
              <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  Send us a message
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  Fill in the details below — we typically reply within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                      Full name <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                      Email address <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233 XX XXX XXXX"
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                    Message <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your property needs..."
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary resize-none transition-colors bg-transparent placeholder:text-gray-300"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary-dark hover:bg-primary text-white py-4 px-10 rounded-sm font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4" />
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