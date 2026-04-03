import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center">
      {/* Header */}
      <h1 className="text-5xl font-bold text-secondary mb-4">404 - Page Not Found</h1>

      {/* Message */}
      <p className="text-grey1 text-lg text-center max-w-md mb-6">
        Oops! It looks like the page you’re looking for doesn’t exist. Let’s get you back on track.
      </p>

      {/* Visual Element (Optional) */}
      <Image
        src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        alt="404 Illustration"
        width={300}
        height={200}
        className="mb-8 rounded-lg"
      />

      {/* Call to Action */}
      <div className="flex gap-4">
        <Link href="/">
          <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-tertiary transition">
            Return to Homepage
          </button>
        </Link>
        <Link href="/properties">
          <button className="bg-white text-secondary border border-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-white transition">
            Explore Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;