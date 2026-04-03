"use client"
import React, { useState } from 'react';
import Image from 'next/image';

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
  };

  return (
    <div className="container m-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-3 justify-center">
        {/* Logo */}
        <div className="relative mx-auto flex justify-center">
          <Image
            src="/logo.png"
            alt="Wiscon Structures Logo"
            width={100}
            height={52}
            className="h-8 mb-3"
            priority
          />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-secondary mb-4 text-center">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-grey1 mb-2">
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
            <label htmlFor="password" className="block text-grey1 mb-2">
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
            className="w-full bg-secondary text-white py-2 rounded-lg border hover:border-secondary hover:text-secondary hover:bg-primary transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;