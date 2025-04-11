import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="relative py-12 min-h-[70vh]">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center h-[70vh] z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center min-h-[20vh]">

        <div className="md:w-1/2 text-white mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Connect with Us Today</h2>
          <p className="text-lg mb-8 max-w-md">
            Reach out to our team for any inquiries or assistance you may need. Whether you’re looking for your dream home, need guidance on the buying process, or have any other questions, we’re here to help. Let’s make your real estate journey seamless and enjoyable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-secondary">Happy clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-secondary">5-star reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold">200+</p>
              <p className="text-secondary">Successful sales</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10+</p>
              <p className="text-secondary">Years of experience</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 bg-primary p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
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
              <label className="block text-gray-700 mb-2" htmlFor="reason">
                Reason for Contact
              </label>
              <select
                id="reason"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option>General question</option>
                <option>Property inquiry</option>
                <option>Support</option>
              </select>
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
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
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