"use client"; // Ensure client-side rendering for Next.js App Router

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs: React.FC = () => {
  // Sample team data (replace with your actual team data)
  const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', image: '/team/john-doe.jpg' },
    { name: 'Jane Smith', role: 'Lead Agent', image: '/team/jane-smith.jpg' },
    { name: 'Mike Johnson', role: 'Marketing Director', image: '/team/mike-johnson.jpg' },
    { name: 'Sarah Lee', role: 'Sales Manager', image: '/team/sarah-lee.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">

      {/* Company Overview */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Our Story</h2>
        <div className="bg-secondary h-[3px] w-[100px] rounded-xl mb-5"></div>
        <p className="text-gray-600 leading-relaxed">
          Founded in 2010, our company has grown from a small family business to a leading real estate firm in the region. We specialize in helping clients buy, sell, and rent properties, offering expert advice and a seamless experience. Our commitment to integrity, transparency, and customer satisfaction sets us apart in the industry. Over the years, we’ve built a reputation for excellence, helping thousands of families find their perfect home.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Our Mission</h2>
        <div className="bg-secondary h-[3px] w-[100px] rounded-xl mb-5"></div>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to simplify the real estate process and make it a joyful journey for our clients. We aim to provide top-notch service, leveraging our expertise and market knowledge to match you with the perfect property. Whether you’re a first-time buyer or a seasoned investor, we’re here to guide you every step of the way.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4 text-center">Meet Our Team</h2>
        <div className="bg-secondary h-[3px] w-[100px] rounded-xl mb-5 mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-secondary">{member.name}</h3>
              <p className="text-grey1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-secondary rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Ready to Find Your Dream Home?</h2>
        <p className="text-white mb-6">
          Contact us today to start your journey or explore our featured properties!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <button className="bg-white text-secondary px-6 py-2 rounded-lg hover:bg-tertiary hover:text-white transition">
              Contact Us
            </button>
          </Link>
          <Link href="/properties">
            <button className="bg-white text-secondary px-6 py-2 rounded-lg hover:bg-tertiary hover:text-white transition">
              Explore Properties
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;