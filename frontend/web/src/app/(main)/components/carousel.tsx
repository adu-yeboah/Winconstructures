"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "./propertyCard";
import { useRouter } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import { Skeleton } from "@/components/ui/skeleton";

interface CarouselHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  showViewAll?: boolean;
  featuredOnly?: boolean;
}

export default function Carousel({
  title,
  subtitle = "Curated listings",
  viewAllLink = "/search",
  showViewAll = true,
  featuredOnly = false,
}: CarouselHeaderProps) {
  const router = useRouter();
  const { properties, loading, error, fetchProperties } = useProperties();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (featuredOnly) {
      fetchProperties({ featured: true });
    } else {
      fetchProperties();
    }
  }, [featuredOnly]);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    dotsClass: "slick-dots !bottom-[-36px]",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "20px" },
      },
    ],
  };

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-flex-end items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="block w-6 h-px bg-secondary" />
              <span className="text-secondary text-[11px] font-medium tracking-[0.14em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900">
              {title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load properties</p>
          <button
            onClick={() => {
              if (featuredOnly) {
                fetchProperties({ featured: true });
              } else {
                fetchProperties();
              }
            }}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (properties.length === 0 && !loading) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-gray-600">No properties available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-flex-end items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="block w-6 h-px bg-secondary" />
            <span className="text-secondary text-[11px] font-medium tracking-[0.14em] uppercase">
              {subtitle}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900">
            {title}
          </h2>
        </div>

        {showViewAll && (
          <button
            onClick={() => router.push(viewAllLink)}
            className="hidden sm:flex items-center gap-2 text-primary text-sm font-medium px-5 py-.5 hover:scale-105 hover:underline transition-all duration-200"
          >
            View all
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Slider */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="pb-12">
          <Slider {...settings}>
            {properties.map((property) => (
              <div key={property.id} className="px-2.5">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Mobile view all */}
      <div className="sm:hidden mt-6 text-center">
        <button
          onClick={() => router.push(viewAllLink)}
          className="border border-primary text-primary text-sm font-medium px-6 py-2.5 rounded-lg"
        >
          View all properties
        </button>
      </div>
    </section>
  );
}