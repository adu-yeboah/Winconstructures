"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHandshake,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";

import { mockSettings } from "@/service/mockData";

/** Small architectural registration mark — recurring signature motif across the site. */
const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

/** Eyebrow: short line + uppercase tracked label, used to introduce every section. */
const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div className="flex items-center gap-3 mb-4 sm:mb-5">
    <span className="block w-8 h-px bg-secondary" />
    <span className={`text-secondary text-xs tracking-[0.18em] uppercase ${light ? "" : ""}`}>
      {children}
    </span>
  </div>
);

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "/team/john-doe.jpg",
      bio: "With over 15 years in luxury real estate, John leads our vision for exceptional client service.",
    },
    {
      name: "Jane Smith",
      role: "Lead Agent",
      image: "/team/jane-smith.jpg",
      bio: "Jane specializes in premium properties and has helped 200+ families secure dream homes.",
    },
    {
      name: "Mike Johnson",
      role: "Marketing Director",
      image: "/team/mike-johnson.jpg",
      bio: "Mike crafts high-impact property campaigns that connect homes with the right buyers.",
    },
    {
      name: "Sarah Lee",
      role: "Sales Manager",
      image: "/team/sarah-lee.jpg",
      bio: "Sarah drives performance through trust, insight, and unmatched client satisfaction.",
    },
  ];

  const stats = [
    {
      value: `${mockSettings.about_years_experience}+`,
      label: "Years Experience",
      icon: <FaHome className="text-xl text-secondary" />,
    },
    {
      value: `${mockSettings.about_properties_sold}+`,
      label: "Properties Sold",
      icon: <FaHandshake className="text-xl text-secondary" />,
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      icon: <FaChartLine className="text-xl text-secondary" />,
    },
    {
      value: "25+",
      label: "Awards Won",
      icon: <FaUserTie className="text-xl text-secondary" />,
    },
  ];

  const values = [
    {
      title: "Integrity",
      copy: "We deliver every transaction with transparency and a straightforward account of what a property truly offers.",
    },
    {
      title: "Expertise",
      copy: "Deep local market intelligence and technical rigor inform every valuation and recommendation we make.",
    },
    {
      title: "Client Focus",
      copy: "Your goals set the agenda. We build every relationship around long-term trust, not a single transaction.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-primary-dark pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/29174523/pexels-photo-29174523.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/40" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto"
        >
          <Eyebrow>About Our Company</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6 max-w-3xl">
            Building trust, creating lasting value
          </h1>

          <p className="text-white/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            For over a decade, we&apos;ve helped families, investors, and businesses
            discover exceptional spaces designed for living, growth, and long-term value.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-20">
        {/* Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 sm:mb-24"
        >
          <div className="relative h-[320px] sm:h-[420px] rounded-sm overflow-hidden shadow-sm">
            <Image
              src="/about-office.jpg"
              alt="Our office"
              fill
              className="object-cover"
            />
            <span className="pointer-events-none absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-secondary" />
            <span className="pointer-events-none absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-secondary" />
          </div>

          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              A decade of real estate excellence
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5 font-light">
              Founded in 2010, we&apos;ve grown from a boutique family business into
              a trusted premium real estate brand known for market expertise,
              transparency, and outstanding results.
            </p>
            <p className="text-gray-500 leading-relaxed font-light">
              By combining deep local knowledge with modern technology, we help
              clients navigate every stage of buying, selling, renting, and
              investing with confidence.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative bg-white rounded-sm p-6 sm:p-8 shadow-sm"
            >
              <CornerMarks className="border-secondary/50" />
              <div className="mb-4">{stat.icon}</div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Values */}
        <section className="mb-20 sm:mb-24">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">
                Our Values
              </span>
              <span className="block w-8 h-px bg-secondary" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900">
              The principles behind every property
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative bg-white rounded-sm p-6 sm:p-8 shadow-sm"
              >
                <CornerMarks className="border-secondary/50" />
                <span className="text-secondary text-xs tracking-[0.18em] uppercase block mb-3">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-xl font-light text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20 sm:mb-24">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">
                Meet The Team
              </span>
              <span className="block w-8 h-px bg-secondary" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900">
              Experts behind every successful move
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative bg-white rounded-sm overflow-hidden shadow-sm"
              >
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-light text-gray-900">{member.name}</h3>
                  <p className="text-secondary text-xs sm:text-sm uppercase tracking-wide mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-primary-dark rounded-sm p-10 sm:p-14 md:p-16 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <span className="pointer-events-none absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-secondary/60" />
          <span className="pointer-events-none absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-secondary/60" />

          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">
                Let&apos;s Work Together
              </span>
              <span className="block w-8 h-px bg-secondary" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-5 sm:mb-6">
              Ready to begin your property journey?
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto mb-8 font-light">
              Whether you&apos;re buying, renting, or investing, our team is ready to
              guide you toward the right opportunity.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <button className="bg-secondary text-primary-dark px-8 py-3.5 rounded-sm font-medium text-sm tracking-wide hover:opacity-90 transition-all w-full sm:w-auto">
                  Contact Our Team
                </button>
              </Link>

              <Link href="/search">
                <button className="border border-white/20 text-white px-8 py-3.5 rounded-sm font-medium text-sm tracking-wide hover:bg-white/10 transition-all w-full sm:w-auto">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;