"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs: React.FC = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', image: '/team/john-doe.jpg' },
    { name: 'Jane Smith', role: 'Lead Agent', image: '/team/jane-smith.jpg' },
    { name: 'Mike Johnson', role: 'Marketing Director', image: '/team/mike-johnson.jpg' },
    { name: 'Sarah Lee', role: 'Sales Manager', image: '/team/sarah-lee.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 min-h-[60vh]">
      {/* Company Overview */}
      <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-4">Our Story</h2>
        <div className="bg-secondary h-[3px] w-20 sm:w-24 md:w-[100px] rounded-xl mb-4 sm:mb-5"></div>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Founded in 2010, our company has grown from a small family business to a leading real estate firm in the region. We specialize in helping clients buy, sell, and rent properties, offering expert advice and a seamless experience. Our commitment to integrity, transparency, and customer satisfaction sets us apart in the industry. Over the years, we’ve built a reputation for excellence, helping thousands of families find their perfect home.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-4">Our Mission</h2>
        <div className="bg-secondary h-[3px] w-20 sm:w-24 md:w-[100px] rounded-xl mb-4 sm:mb-5"></div>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Our mission is to simplify the real estate process and make it a joyful journey for our clients. We aim to provide top-notch service, leveraging our expertise and market knowledge to match you with the perfect property. Whether you’re a first-time buyer or a seasoned investor, we’re here to guide you every step of the way.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-4 text-center">Meet Our Team</h2>
        <div className="bg-secondary h-[3px] w-20 sm:w-24 md:w-[100px] rounded-xl mb-4 sm:mb-5 mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-5 text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-3 sm:mb-4 object-cover w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]"
              />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-secondary">{member.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base"> {member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-secondary rounded-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4">Ready to Find Your Dream Home?</h2>
        <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
          Contact us today to start your journey or explore our featured properties!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link href="/contact">
            <button className="bg-white text-secondary px-4 sm:px-6 py-2 rounded-lg hover:bg-tertiary hover:text-white transition text-sm sm:text-base w-full sm:w-auto">
              Contact Us
            </button>
          </Link>
          <Link href="/properties">
            <button className="bg-white text-secondary px-4 sm:px-6 py-2 rounded-lg hover:bg-tertiary hover:text-white transition text-sm sm:text-base w-full sm:w-auto">
              Explore Properties
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;