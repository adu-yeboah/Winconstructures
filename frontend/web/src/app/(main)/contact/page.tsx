"use client";

import React, { useState } from "react";
import {
  FaPhone,
  FaMobileAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { useMessages } from "@/hooks/useMessage";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const { createMessage, loading } = useMessages();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createMessage({
        title: formData.name,
        email: formData.email,
        subject: "Contact Form Submission",
        message: `${formData.message}\n\nPhone: ${formData.phone}`,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    }
  };

  return (
    <div className="bg-grey min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] pt-20 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-primary-dark/70" />

        <div className="relative z-10 max-w-4xl px-6 lg:px-12">
          <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
            Contact Us
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-5">
            Let's discuss your
            <br />
            next property move
          </h1>

          <p className="text-white/70 text-lg max-w-2xl font-light">
            Whether you're buying, selling, investing, or simply exploring your
            options, our team is ready to guide you with confidence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-md p-8 md:p-10">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Private Consultation
            </p>

            <h2 className="font-serif text-4xl font-light text-black mb-8">
              Send us a message
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-grey1 px-4 py-3 outline-none focus:border-primary"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-grey1 px-4 py-3 outline-none focus:border-primary"
                  required
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-grey1 px-4 py-3 outline-none focus:border-primary"
              />

              <textarea
                rows={6}
                placeholder="Tell us about your property needs... *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-grey1 px-4 py-3 outline-none resize-none focus:border-primary"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 font-medium transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Sending..." : "Book Consultation"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-primary-dark rounded-3xl p-8 md:p-10 text-white">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Office Details
            </p>

            <h2 className="font-serif text-4xl font-light mb-8">
              Visit our office
            </h2>

            <div className="space-y-6 text-white/75">
              <div className="flex gap-4">
                <FaPhone className="text-secondary mt-1" />
                <div>
                  <p className="text-white">Phone</p>
                  <p>+233 24 000 0000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaMobileAlt className="text-secondary mt-1" />
                <div>
                  <p className="text-white">Mobile</p>
                  <p>+233 55 000 0000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="text-secondary mt-1" />
                <div>
                  <p className="text-white">Email</p>
                  <p>contact@winconstructures.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-secondary mt-1" />
                <div>
                  <p className="text-white">Location</p>
                  <p>
                    East Legon, Accra
                    <br />
                    Greater Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaClock className="text-secondary mt-1" />
                <div>
                  <p className="text-white">Business Hours</p>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Map Preview */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps?q=East+Legon+Accra&output=embed"
            className="w-full h-80"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
