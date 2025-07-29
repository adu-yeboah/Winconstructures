"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaHandshake, FaChartLine, FaUserTie } from 'react-icons/fa';

const AboutUs: React.FC = () => {
  const teamMembers = [
    { 
      name: 'John Doe', 
      role: 'CEO & Founder', 
      image: '/team/john-doe.jpg',
      bio: 'With over 15 years in real estate, John leads our vision for exceptional client service.'
    },
    { 
      name: 'Jane Smith', 
      role: 'Lead Agent', 
      image: '/team/jane-smith.jpg',
      bio: 'Jane specializes in luxury properties and has helped 200+ families find their dream homes.'
    },
    { 
      name: 'Mike Johnson', 
      role: 'Marketing Director', 
      image: '/team/mike-johnson.jpg',
      bio: 'Mike crafts innovative marketing strategies that connect properties with perfect buyers.'
    },
    { 
      name: 'Sarah Lee', 
      role: 'Sales Manager', 
      image: '/team/sarah-lee.jpg',
      bio: 'Sarah oversees our sales team with a focus on client satisfaction and results.'
    },
  ];

  const stats = [
    { value: '12+', label: 'Years Experience', icon: <FaHome className="text-3xl text-secondary" /> },
    { value: '1,250+', label: 'Properties Sold', icon: <FaHandshake className="text-3xl text-secondary" /> },
    { value: '98%', label: 'Client Satisfaction', icon: <FaChartLine className="text-3xl text-secondary" /> },
    { value: '25+', label: 'Awards Won', icon: <FaUserTie className="text-3xl text-secondary" /> },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-secondary to-tertiary">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">About Our Company</h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
              Building trust and creating lasting relationships in real estate
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Company Overview */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Image
                src="/about-office.jpg"
                alt="Our office"
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                <span className="border-b-4 border-secondary pb-2">Our Story</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2010, weve grown from a small family business to a leading real estate firm serving the entire region. 
                What began as a passion for helping people find their perfect home has blossomed into a full-service agency 
                with a reputation for excellence.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the past decade, weve helped thousands of families, investors, and businesses navigate the complex 
                real estate market with confidence. Our team combines local expertise with innovative technology to deliver 
                exceptional results.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        {/* Mission & Values */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            <span className="border-b-4 border-secondary pb-2">Our Mission & Values</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-secondary mb-3">Integrity</h3>
              <p className="text-gray-600">
                We believe in doing business the right way, with honesty and transparency in every transaction.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-secondary mb-3">Expertise</h3>
              <p className="text-gray-600">
                Our team continuously educates themselves to provide the most current market insights and advice.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-secondary mb-3">Client Focus</h3>
              <p className="text-gray-600">
                Every decision we make is guided by whats best for our clients unique needs and goals.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            <span className="border-b-4 border-secondary pb-2">Meet Our Team</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-48 md:h-56">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-secondary to-tertiary rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Begin Your Real Estate Journey?</h2>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Whether youre buying, selling, or investing, our team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <button className="bg-white text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Our Team
              </button>
            </Link>
            <Link href="/search">
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors">
                Browse Listings
              </button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;