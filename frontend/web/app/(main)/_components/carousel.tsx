"use client";
import { properties } from '@/constants/properties';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyCard from './propertyCard';
import { h2 } from 'framer-motion/client';

const Carousel: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '16px',
        },
      },
    ],
  };

  return (
    <section className="my-8 sm:my-12 px-4 sm:px-6 md:px-8 min-h-[60vh] relative max-w-7xl mx-auto">
      <div className="flex flex-row justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-4 sm:mb-0">
          Recents
        </h2>
        <button className="bg-secondary text-primary px-4 md:px-4 sm:px-6 py-2 rounded-lg hover:bg-tertiary transition-colors duration-300 text-sm sm:text-base">
          View All
        </button>
      </div>

      <div className="relative slider-container">
        <Slider {...settings} className="px-2">
          {properties.map((property) => (
            <div key={property.id} className="px-2">
              <PropertyCard property={property} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;