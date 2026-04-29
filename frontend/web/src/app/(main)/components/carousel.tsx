"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Handle resize
    const handleResize = () => {
      if (emblaApi) {
        emblaApi.reInit();
        onSelect();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    setMounted(true);
    if (featuredOnly) {
      fetchProperties({ featured: true });
    } else {
      fetchProperties();
    }
  }, [featuredOnly]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || loading) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi, loading]);

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
          <p className="text-gray-600">
            No properties available at the moment.
          </p>
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
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all md:flex hidden"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all md:flex hidden"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {properties.map((property) => (
                <div key={property.id} className="flex-[0_0_100%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] min-w-0">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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