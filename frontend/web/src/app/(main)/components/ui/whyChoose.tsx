"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaSearchDollar, FaShieldAlt, FaHeadset, FaChartLine, FaUsers } from "react-icons/fa";

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      number: "01",
      title: "Extensive Property Portfolio",
      description:
        "Access thousands of verified properties across prime locations with detailed listings, high-quality images, and comprehensive information.",
      icon: <FaHome className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50"
    },
    {
      number: "02",
      title: "Expert Market Analysis",
      description:
        "Make informed decisions with our comprehensive market insights, property valuations, and neighborhood analytics powered by real-time data.",
      icon: <FaSearchDollar className="text-2xl" />,
      color: "from-primary to-primary-dark",
      lightColor: "bg-primary-light"
    },
    {
      number: "03",
      title: "Trusted & Verified",
      description:
        "Every property is verified by our team for authenticity, legal compliance, and accurate information to ensure your investment is safe and secure.",
      icon: <FaShieldAlt className="text-2xl" />,
      color: "from-secondary to-secondary-dark",
      lightColor: "bg-secondary-light"
    },
    {
      number: "04",
      title: "24/7 Expert Support",
      description:
        "Our dedicated team of real estate professionals is available round the clock to assist you with property viewings, negotiations, and paperwork.",
      icon: <FaHeadset className="text-2xl" />,
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50"
    },
    {
      number: "05",
      title: "Advanced Search Tools",
      description:
        "Find your perfect property with our powerful search filters, saved searches, and personalized recommendations based on your preferences.",
      icon: <FaChartLine className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-50"
    },
    {
      number: "06",
      title: "Client-Focused Approach",
      description:
        "Your satisfaction is our priority. We provide personalized service, transparent communication, and go the extra mile to exceed your expectations.",
      icon: <FaUsers className="text-2xl" />,
      color: "from-rose-500 to-rose-600",
      lightColor: "bg-rose-50"
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
         

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            The{" "}
            <span className="text-primary font-semibold italic">Wincon Structures</span>{" "}
            Difference
          </h2>

          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            We combine cutting-edge technology with deep real estate expertise to deliver an unparalleled property experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 h-full transition-all duration-300">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                    {feature.number}
                  </span>
                  <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl shadow-md`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-500 mt-6`} />
              </div>
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
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "15+",
                label: "Years Experience",
                icon: <FaChartLine className="text-primary" />,
                desc: "Serving clients"
              },
              {
                num: "850+",
                label: "Happy Clients",
                icon: <FaUsers className="text-secondary" />,
                desc: "Successfully served"
              },
              {
                num: "2500+",
                label: "Properties Sold",
                icon: <FaHome className="text-blue-500" />,
                desc: "Properties listed"
              },
              {
                num: "99%",
                label: "Satisfaction Rate",
                icon: <FaShieldAlt className="text-amber-500" />,
                desc: "Client satisfaction"
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                    {stat.icon}
                  </div>
                  <p className="font-serif text-4xl font-bold text-gray-900 mb-2">{stat.num}</p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.desc}</p>
                </div>
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 shadow-xl">
            <h3 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
              Ready to Find Your Dream Property?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have found their perfect property with Wincon Structures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/search"
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Browse Properties
              </a>
              <a
                href="#contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-primary transition-all inline-flex items-center justify-center gap-2"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
