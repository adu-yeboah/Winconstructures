"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaPaintBrush, FaMagic, FaCogs, } from 'react-icons/fa';

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'Easy To Get Started',
      description: 'Launch your real estate business quickly with our intuitive platform that requires no technical expertise.',
      icon: <FaRocket className="text-3xl text-secondary" />
    },
    {
      number: '02',
      title: 'Pre-Built Websites',
      description: 'Choose from professionally designed templates to showcase your properties beautifully from day one.',
      icon: <FaMagic className="text-3xl text-secondary" />
    },
    {
      number: '03',
      title: 'Highly Customizable',
      description: 'Tailor every aspect of your website to match your brand and business needs with our flexible tools.',
      icon: <FaPaintBrush className="text-3xl text-secondary" />
    },
    {
      number: '04',
      title: 'Powerful Features',
      description: 'Access advanced tools for property management, lead generation, and client communication.',
      icon: <FaCogs className="text-3xl text-secondary" />
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-secondary mr-3"></div>
            <span className="text-sm uppercase tracking-wider text-gray-500 font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="text-secondary">Wiscon Structures</span> Stands Out
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine innovative technology with real estate expertise to deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-secondary mr-3">{feature.number}</span>
                <div className="bg-secondary/10 p-3 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-secondary to-tertiary rounded-xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <div className="text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1,250+</div>
              <div className="text-sm uppercase tracking-wider">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-sm uppercase tracking-wider">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm uppercase tracking-wider">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;