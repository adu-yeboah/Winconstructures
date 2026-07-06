"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2, ArrowUpRight } from "lucide-react";
import { useMessages } from "@/hooks/useMessage";
import { toast } from "react-toastify";

import { mockSettings } from "@/service/mockData";

/** Architectural registration mark — the site's recurring signature motif. */
const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

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
      toast.success("Message sent. We'll reply within 24 hours.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] pt-20 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 max-w-4xl px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-secondary" />
            <span className="text-secondary text-[11px] font-medium tracking-[0.18em] uppercase">
              Contact us
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-[1.1] mb-5">
            Let&apos;s discuss your
            <br />
            next property move
          </h1>

          <p className="text-white/60 text-lg max-w-2xl font-light">
            Whether you&apos;re buying, selling, investing, or simply exploring
            your options, our team is ready to guide you with confidence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="relative bg-white rounded-sm shadow-sm p-8 md:p-10">
            <CornerMarks className="border-secondary" />

            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Private consultation
            </p>

            <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-8">
              Send us a message
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-sm text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                    Full name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                    Email address <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 text-xs font-medium uppercase tracking-wide">
                  Message <span className="text-secondary">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your property needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 outline-none resize-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white rounded-sm py-4 px-10 font-medium text-sm tracking-wide transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Sending…" : "Book consultation"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="relative bg-primary-dark rounded-sm p-8 md:p-10 text-white overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <CornerMarks className="border-white/30" />

            <p className="relative text-secondary text-xs tracking-[0.18em] uppercase mb-4">
              Office details
            </p>

            <h2 className="relative font-serif text-3xl md:text-4xl font-light mb-8">
              Visit our office
            </h2>

            <div className="relative space-y-6 text-white/70">
              <div className="flex gap-4">
                <Phone className="w-4 h-4 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Phone</p>
                  <p className="font-light">{mockSettings.contact_phone}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-4 h-4 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Email</p>
                  <p className="font-light">{mockSettings.contact_email}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-4 h-4 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Location</p>
                  <p className="font-light">{mockSettings.contact_address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-4 h-4 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Business hours</p>
                  <p className="font-light">Mon – Fri: 9:00 AM – 6:00 PM</p>
                  <p className="font-light">Sat: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/233240000000"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 flex items-center justify-center gap-2 border border-white/20 hover:border-secondary hover:text-secondary rounded-sm py-3.5 text-sm font-medium transition-colors"
            >
              Chat on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mini Map Preview */}
        <div className="relative mt-6 rounded-sm overflow-hidden border border-gray-100">
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