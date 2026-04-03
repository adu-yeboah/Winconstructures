"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaPaintBrush, FaMagic, FaCogs } from "react-icons/fa";

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      number: "01",
      title: "Easy To Get Started",
      description:
        "Launch your real estate business quickly with our intuitive platform that requires no technical expertise.",
      icon: <FaRocket className="text-3xl text-secondary" />,
    },
    {
      number: "02",
      title: "Pre-Built Websites",
      description:
        "Choose from professionally designed templates to showcase your properties beautifully from day one.",
      icon: <FaMagic className="text-3xl text-secondary" />,
    },
    {
      number: "03",
      title: "Highly Customizable",
      description:
        "Tailor every aspect of your website to match your brand and business needs with our flexible tools.",
      icon: <FaPaintBrush className="text-3xl text-secondary" />,
    },
    {
      number: "04",
      title: "Powerful Features",
      description:
        "Access advanced tools for property management, lead generation, and client communication.",
      icon: <FaCogs className="text-3xl text-secondary" />,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-grey py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
      {/* Hero-like Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
          Why choose us
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4">
          Why <em className="text-secondary italic">Wincon Structures</em> stands out
        </h2>
        <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
          We combine innovative technology with real estate expertise to deliver exceptional results for our clients.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex items-center mb-5">
              <span className="text-4xl font-bold text-secondary mr-4">{feature.number}</span>
              <div className="bg-secondary/10 p-4 rounded-full">{feature.icon}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats Bar */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200 bg-white rounded-3xl shadow-sm overflow-hidden"
      >
        {[
          { num: "12yr", label: "Years experience" },
          { num: "500+", label: "Happy clients" },
          { num: "98%", label: "Satisfaction rate" },
          { num: "24/7", label: "Support available" },
        ].map((stat, i) => (
          <div
            key={i}
            className="px-6 lg:px-8 py-6 border-r border-gray-200 last:border-r-0 text-center"
          >
            <p className="font-serif text-3xl font-semibold text-gray-900 mb-1">{stat.num}</p>
            <p className="text-xs text-gray-500 font-light">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseSection;