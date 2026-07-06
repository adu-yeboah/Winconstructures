"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaSearchDollar, FaShieldAlt, FaHeadset, FaChartLine, FaUsers } from "react-icons/fa";

/** Architectural registration mark — echoes the same motif used across the site. */
const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      title: "Extensive property portfolio",
      description:
        "Thousands of verified listings across prime locations, each with detailed information and high-quality imagery.",
      icon: <FaHome />,
    },
    {
      title: "Expert market analysis",
      description:
        "Real-time valuations and neighbourhood analytics so every decision is backed by current market data.",
      icon: <FaSearchDollar />,
    },
    {
      title: "Verified & trusted",
      description:
        "Every property is checked for authenticity and legal compliance before it reaches your search results.",
      icon: <FaShieldAlt />,
    },
    {
      title: "24/7 expert support",
      description:
        "Our team is on call around the clock for viewings, negotiations, and paperwork — wherever you are.",
      icon: <FaHeadset />,
    },
    {
      title: "Advanced search tools",
      description:
        "Powerful filters, saved searches, and recommendations tuned to what you're actually looking for.",
      icon: <FaChartLine />,
    },
    {
      title: "Client-focused approach",
      description:
        "Personalised service and transparent communication — we go the extra mile on every transaction.",
      icon: <FaUsers />,
    },
  ];

  const stats = [
    { num: "15+", label: "Years experience" },
    { num: "850+", label: "Happy clients" },
    { num: "2,500+", label: "Properties sold" },
    { num: "99%", label: "Satisfaction rate" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-secondary" />
            <span className="text-secondary text-[11px] font-medium tracking-[0.18em] uppercase">
              Why Wincon Structures
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1]">
            Built on{" "}
            <em className="not-italic text-primary font-medium">trust</em>
            , run on{" "}
            <em className="not-italic text-primary font-medium">detail</em>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 mb-20 border border-gray-100">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-gray-50"
            >
              <CornerMarks className="border-transparent group-hover:border-secondary transition-colors duration-300" />

              <div className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center text-primary text-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-primary-dark rounded-sm overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.003]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center py-12 px-6 border-r border-b lg:border-b-0 border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <p className="font-serif text-4xl lg:text-5xl font-light text-white mb-2">{stat.num}</p>
                <p className="text-xs text-white/50 font-light uppercase tracking-[0.1em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-gray-100 pt-10"
        >
          <div className="max-w-lg">
            <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-2">
              Ready to find your dream property?
            </h3>
            <p className="text-gray-500 font-light">
              Join thousands of clients who found their place with Wincon Structures.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a
              href="/search"
              className="bg-primary text-white px-7 py-3.5 rounded-sm font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              Browse properties
            </a>
            <a
              href="#contact"
              className="border border-gray-200 text-gray-800 px-7 py-3.5 rounded-sm font-medium text-sm hover:border-gray-900 transition-colors"
            >
              Contact us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;