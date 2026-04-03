"use client";
import { properties } from '@/constants/properties';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyCard from './propertyCard';
import { useRouter } from 'next/navigation';

const Carousel: React.FC = () => {
  const router = useRouter();

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
    dotsClass: 'slick-dots !bottom-[-36px]',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: '20px' } },
    ],
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-flex-end items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="block w-6 h-px bg-secondary" />
            <span className="text-secondary text-[11px] font-medium tracking-[0.14em] uppercase">
              Curated listings
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900">
            Recent properties
          </h2>
        </div>

        <button
          onClick={() => router.push('/search')}
          className="hidden sm:flex items-center gap-2 text-primary text-sm font-medium px-5 py-.5  hover:scale-105 hover:underline transition-all duration-200"
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Slider */}
      <div className="pb-12">
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.id} className="px-2.5">
              <PropertyCard property={property} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile view all */}
      <div className="sm:hidden mt-6 text-center">
        <button
          onClick={() => router.push('/search')}
          className="border border-primary text-primary text-sm font-medium px-6 py-2.5 rounded-lg"
        >
          View all properties
        </button>
      </div>
    </section>
  );
};

export default Carousel;