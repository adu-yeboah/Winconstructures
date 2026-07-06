"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import PropertyCard from "./propertyCard";
import { useRouter } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

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

  const SectionHeader = () => (
    <div className="flex items-end justify-between mb-10">
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
          className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all duration-200"
        >
          View all
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-sm" />
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
          <p className="text-gray-500 mb-4 font-light">Failed to load properties</p>
          <button
            onClick={() => {
              if (featuredOnly) {
                fetchProperties({ featured: true });
              } else {
                fetchProperties();
              }
            }}
            className="text-primary font-medium hover:underline"
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
          <p className="text-gray-500 font-light">
            No properties available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      <SectionHeader />

      {/* Slider */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-sm" />
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
            aria-label="Previous properties"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-11 h-11 bg-white rounded-sm shadow-lg border border-gray-100 items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all md:flex hidden"
          >
            <ArrowLeft className="w-4 h-4 text-gray-800" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next properties"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-11 h-11 bg-white rounded-sm shadow-lg border border-gray-100 items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all md:flex hidden"
          >
            <ArrowRight className="w-4 h-4 text-gray-800" />
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
          <div className="flex justify-center gap-2 mt-8">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1.5 rounded-full transition-all ${index === selectedIndex ? 'bg-primary w-6' : 'bg-gray-200 w-1.5 hover:bg-gray-300'
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
          className="border border-primary text-primary text-sm font-medium px-6 py-2.5 rounded-sm"
        >
          View all properties
        </button>
      </div>
    </section>
  );
}