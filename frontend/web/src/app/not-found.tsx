"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      {/* Animated Illustration */}
      <div className="w-64 h-64 mb-6 animate-bounce">
        <img
          src="/not-found.png"
          alt="Page not found"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6 max-w-md">
        Oops! We can’t seem to find the page you’re looking for.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primaryLight transition-colors duration-200"
        >
          Go Home
        </button>
        <button
          onClick={() => router.back()}
          className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primaryLight hover:text-white transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}