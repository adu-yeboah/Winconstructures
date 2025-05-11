"use client";
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center">
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-tertiary opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 flex flex-col md:flex-row justify-evenly">
        {/* Left Side - Text and Stats */}
        <div className="md:w-1/2 text-white mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Us Today</h2>
          <p className="text-md sm:text-lg mb-8 max-w-md">
            Reach out to our team for any inquiries or assistance you may need. Whether you’re looking for your dream home, need guidance on the buying process, or have any other questions, we’re here to help. Let’s make your real estate journey seamless and enjoyable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xl sm:text-3xl font-bold">100+</p>
              <p className="text-secondary">Happy clients</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold">50+</p>
              <p className="text-secondary">5-star reviews</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold">200+</p>
              <p className="text-secondary">Successful sales</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold">10+</p>
              <p className="text-secondary">Years of experience</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-secondary">Contact Us</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Jane Doe"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="jane.doe@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                How can we help you?
              </label>
              <textarea
                id="message"
                placeholder="Enter your message here..."
                className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-secondary text-white  px-10 py-2 rounded border hover:text-secondary hover:border-secondary cursor-pointer hover:bg-primary"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;