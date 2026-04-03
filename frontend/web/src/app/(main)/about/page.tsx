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
      value: "12+",
      label: "Years Experience",
      icon: <FaHome className="text-2xl text-secondary" />,
    },
    {
      value: "1,250+",
      label: "Properties Sold",
      icon: <FaHandshake className="text-2xl text-secondary" />,
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      icon: <FaChartLine className="text-2xl text-secondary" />,
    },
    {
      value: "25+",
      label: "Awards Won",
      icon: <FaUserTie className="text-2xl text-secondary" />,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-grey">
      {/* Hero */}
      <section className="relative h-[70vh] pt-20 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/29174523/pexels-photo-29174523.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-primary-dark/70" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl px-6 lg:px-12"
        >
          <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
            About Our Company
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
            Building trust,
            <br />
            creating lasting value
          </h1>

          <p className="text-white/70 max-w-2xl text-lg font-light leading-relaxed">
            For over a decade, we’ve helped families, investors, and businesses
            discover exceptional spaces designed for living, growth, and long-term value.
          </p>
        </motion.div>
      </section>


      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/about-office.jpg"
              alt="Our office"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl font-light text-black mb-6">
              A decade of real estate excellence
            </h2>
            <p className="text-grey2 leading-relaxed mb-5">
              Founded in 2010, we’ve grown from a boutique family business into
              a trusted premium real estate brand known for market expertise,
              transparency, and outstanding results.
            </p>
            <p className="text-grey2 leading-relaxed">
              By combining deep local knowledge with modern technology, we help
              clients navigate every stage of buying, selling, renting, and
              investing with confidence.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 shadow-md border border-black/5"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="font-serif text-3xl text-black mb-1">{stat.value}</h3>
              <p className="text-grey2 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </section>

        {/* Values */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-4xl font-light text-black">
              The principles behind every property
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Integrity",
              "Expertise",
              "Client Focus",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-black/5"
              >
                <h3 className="text-xl font-medium text-primary mb-3">{item}</h3>
                <p className="text-grey2 leading-relaxed">
                  We deliver every experience with trust, market intelligence,
                  and a deep commitment to client success.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Meet The Team
            </p>
            <h2 className="font-serif text-4xl font-light text-black">
              Experts behind every successful move
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md"
              >
                <div className="relative h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-black">{member.name}</h3>
                  <p className="text-secondary text-sm mb-3">{member.role}</p>
                  <p className="text-grey2 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-dark rounded-3xl p-10 md:p-16 text-center">
          <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
            Let’s Work Together
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6">
            Ready to begin your property journey?
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Whether you’re buying, renting, or investing, our team is ready to
            guide you toward the right opportunity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <button className="bg-secondary text-black px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
                Contact Our Team
              </button>
            </Link>

            <Link href="/search">
              <button className="border border-white/20 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition">
                Browse Listings
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;