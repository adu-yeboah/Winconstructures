"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaShare,
  FaRegHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SimilarProperties } from "../../components/similarProperties";
import { useProperties } from "@/hooks/useProperty";
import { useMessages } from "@/hooks/useMessage";
import { Skeleton } from "@/components/ui/skeleton";

/** Small architectural registration mark — recurring signature motif across the site. */
const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
    <span className="block w-6 h-px bg-secondary" />
    <span className="text-secondary text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase">
      {children}
    </span>
  </div>
);

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const { fetchProperty, loading: propertyLoading } = useProperties();
  const { createMessage, loading: messageLoading } = useMessages();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Initialize carousel hook BEFORE any conditional returns
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  useEffect(() => {
    setMounted(true);
    const loadProperty = async () => {
      if (params.id) {
        try {
          const data = await fetchProperty(params.id as string);
          setProperty(data);
        } catch (err) {
          setError("Failed to load property");
          console.error("Error loading property:", err);
        }
      }
    };

    loadProperty();
  }, [params.id]);

  // Update carousel settings when property loads
  useEffect(() => {
    if (property && property.images.length > 1 && emblaApi) {
      emblaApi.reInit({ loop: true, align: "start" });
    }
  }, [property, emblaApi]);

  // Track active slide for custom counter / dots
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      await createMessage({
        title: formData.name,
        email: formData.email,
        subject: `Property Inquiry: ${property?.title}`,
        message: `${formData.message}\n\nPhone: ${formData.phone}\n\nProperty: ${property?.title} (ID: ${property?.id})`,
        relatedPropertyId: property?.id,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send inquiry";
      setFormError(message);
    }
  };

  // Don't render until mounted (prevents hydration issues)
  if (!mounted || propertyLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-primary-dark pt-24 pb-10 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-4 w-40 mb-4 bg-white/10" />
            <Skeleton className="h-12 w-full max-w-xl mb-4 bg-white/10" />
            <Skeleton className="h-4 w-56 bg-white/10" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
          <Skeleton className="h-72 sm:h-96 w-full mb-8 rounded-sm" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Skeleton className="h-48 w-full rounded-sm" />
              <Skeleton className="h-64 w-full rounded-sm" />
            </div>
            <Skeleton className="h-[450px] w-full rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <p className="text-gray-900 text-lg sm:text-xl font-serif font-light mb-4">
            {error || "Property Not Found"}
          </p>
          <button
            onClick={() => router.push("/search")}
            className="text-primary hover:underline text-sm sm:text-base"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative h-[46vh] sm:h-[56vh] md:h-[64vh] min-h-[380px] md:min-h-[520px] overflow-hidden">
        <Image
          src={property.images[selectedIndex]?.img || property.images[0]?.img || "/placeholder.jpg"}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-black/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Top bar: back + save/share */}
        <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28">
          <button
            onClick={() => router.push("/search")}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm tracking-wide transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to results
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved((s) => !s)}
              aria-label="Save property"
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-sm border transition-colors ${
                saved
                  ? "bg-secondary border-secondary text-primary-dark"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <FaRegHeart className="text-sm" />
            </button>
            <button
              aria-label="Share property"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-sm border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FaShare className="text-sm" />
            </button>
          </div>
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 lg:pb-16 w-full">
            <div className="max-w-3xl">
              <Eyebrow>
                {property.status === "FOR_SALE" ? "For Sale" : "For Rent"} • {property.type}
              </Eyebrow>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4 sm:mb-5">
                {property.title}
              </h1>

              <p className="flex items-center gap-2 text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                <FaMapMarkerAlt className="text-secondary text-xs sm:text-sm" />
                <span className="line-clamp-1">{property.location}</span>
              </p>

              <div className="flex flex-wrap gap-5 sm:gap-8 text-white/90">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50 mb-1">Price</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{property.price}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50 mb-1">Bedrooms</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50 mb-1">Bathrooms</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50 mb-1">Area</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{property.area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-14 flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-10">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-2/3">
          {/* GALLERY */}
          {property.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-sm p-4 sm:p-5 shadow-sm  mb-6 sm:mb-8"
            >
              <CornerMarks className="border-secondary" />
              <div className="relative overflow-hidden rounded-sm">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {property.images.map((image: { img: string }, index: number) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <Image
                          src={image.img}
                          alt={`${property.title} image ${index + 1}`}
                          width={800}
                          height={500}
                          className="rounded-sm w-full h-[230px] sm:h-[300px] md:h-[380px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => emblaApi?.scrollPrev()}
                      aria-label="Previous image"
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-gray-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => emblaApi?.scrollNext()}
                      aria-label="Next image"
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-gray-700 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 right-3 bg-primary-dark/80 text-white text-xs px-2.5 py-1 rounded-sm tracking-wide">
                      {selectedIndex + 1} / {property.images.length}
                    </span>
                  </>
                )}
              </div>

              {/* Dots */}
              {property.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                  {property.images.map((_img: unknown, index: number) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === selectedIndex ? "w-6 bg-secondary" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => emblaApi?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-sm p-5 sm:p-6 lg:p-8 shadow-sm  mb-6 sm:mb-8"
          >
            <CornerMarks className="border-secondary/50" />
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">At a glance</span>
            </div>
            <h2 className="sr-only">Property Highlights</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <FaBed className="text-primary text-lg sm:text-xl mb-2 sm:mb-3" />
                <p className="text-gray-500 text-xs sm:text-sm">Bedrooms</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">{property.bedrooms}</p>
              </div>
              <div>
                <FaBath className="text-primary text-lg sm:text-xl mb-2 sm:mb-3" />
                <p className="text-gray-500 text-xs sm:text-sm">Bathrooms</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">{property.bathrooms}</p>
              </div>
              <div>
                <MdSquareFoot className="text-primary text-lg sm:text-xl mb-2 sm:mb-3" />
                <p className="text-gray-500 text-xs sm:text-sm">Area</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">{property.area}</p>
              </div>
              <div>
                <FaMapMarkerAlt className="text-primary text-lg sm:text-xl mb-2 sm:mb-3" />
                <p className="text-gray-500 text-xs sm:text-sm">Type</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">{property.type}</p>
              </div>
            </div>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-sm p-5 sm:p-6 lg:p-8 shadow-sm  mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">Description</span>
            </div>

            <p className="text-gray-500 text-sm sm:text-base leading-6 sm:leading-8 font-light">
              {property.description ||
                `An exceptional ${property.type.toLowerCase()} designed with refined finishes, spacious interiors, and premium architecture.`}
            </p>

            {/* Optional amenities row — renders only if the property record has amenities */}
            {Array.isArray(property.amenities) && property.amenities.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity: string, i: number) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-gray-50  text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      <FaCheckCircle className="text-secondary text-[10px]" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-sm p-5 sm:p-6 lg:p-8 shadow-sm  mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="block w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs tracking-[0.18em] uppercase">Location</span>
            </div>

            <div className="h-[230px] sm:h-[300px] md:h-[350px] rounded-sm overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTACT */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit space-y-5 sm:space-y-6">
          <div className="relative bg-white rounded-sm p-5 sm:p-6 lg:p-8 shadow-sm ">
            <CornerMarks className="border-secondary" />

            <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
              <span className="block w-6 h-px bg-secondary" />
              <span className="text-secondary text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase">
                Schedule a viewing
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">
              Request more details
            </h3>

            {formError && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-sm text-red-700 text-xs sm:text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <input
                type="text"
                placeholder="Your name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300 text-sm"
                required
              />

              <input
                type="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300 text-sm"
                required
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300 text-sm"
              />

              <textarea
                rows={4}
                placeholder="I'd like to schedule a private tour... *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary resize-none transition-colors bg-transparent placeholder:text-gray-300 text-sm"
                required
              />

              <button
                type="submit"
                disabled={messageLoading}
                className="w-full bg-primary-dark hover:bg-primary text-white py-3.5 sm:py-4 rounded-sm font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {messageLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {messageLoading ? "Sending…" : "Send inquiry"}
              </button>
            </form>

            <div className="border-t border-gray-100 pt-4 sm:pt-5 mt-4 sm:mt-5 grid grid-cols-2 gap-3">
              <button className="w-full border border-primary text-primary py-2.5 sm:py-3 rounded-sm font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm">
                <FaPhoneAlt className="text-xs sm:text-sm" />
                Call
              </button>
              <a
                href="https://wa.me/233240000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary/90 hover:bg-secondary text-primary-dark py-2.5 sm:py-3 rounded-sm font-medium flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
              >
                <FaWhatsapp className="text-sm" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Agent card */}
          <div className="relative bg-primary-dark rounded-sm p-5 sm:p-6 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center text-white/60 text-lg font-serif">
                {property.agentName ? property.agentName.charAt(0) : "A"}
              </div>
              <div>
                <p className="text-white text-sm sm:text-base font-medium">
                  {property.agentName || "Listing Agent"}
                </p>
                <p className="text-white/50 text-xs sm:text-sm">Responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        <div className="mb-8 sm:mb-10">
          <Eyebrow>You might also like</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-gray-900">
            Similar properties
          </h2>
        </div>
        <SimilarProperties currentProperty={property} limit={3} />
      </div>
    </div>
  );
}