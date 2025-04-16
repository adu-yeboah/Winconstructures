"use client"; // Ensure client-side rendering for Next.js App Router

import React, { useState } from 'react';
import Link from 'next/link';

const Login: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Add your authentication logic here (e.g., API call)
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-secondary mb-6 text-center">
          Login to Your Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-tertiary transition"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <Link href="/forgot-password">
            <p className="text-secondary hover:underline text-sm">
              Forgot Password?
            </p>
          </Link>
          <p className="text-gray-600 text-sm">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-secondary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;