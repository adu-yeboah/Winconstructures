"use client"
import { properties } from '@/constants/properties';
import React from 'react';
import Slider from 'react-slick';
import PropertyCard from './propertyCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel: React.FC = () => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    spaceBetween: 16,
    // customPaging: () => (
    //   <div className="w-3 h-3 rounded-full bg-primary hover:bg-secondary transition-all duration-300 cursor-pointer" />
    // ),
    // dotsClass: 'slick-dots mt-6 flex justify-center space-x-2',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          spaceBetween: 12,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          spaceBetween: 8,
        },
      },
    ],
  };

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Recents
        </h2>
        <button className="bg-secondary text-primary px-4 sm:px-6 py-2 rounded-lg hover:bg-tertiary transition-colors duration-300">
          View All
        </button>
      </div>

      <div className="relative slider-container">
        <Slider {...settings}>
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