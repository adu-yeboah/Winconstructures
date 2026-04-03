/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { properties } from "@/constants/properties";
import Image from "next/image";
import Slider from "react-slick";
import { useParams } from "next/navigation";
import { FaBath, FaBed, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import Carousel from "../../components/carousel";

export default function PropertyDetail() {
  const params = useParams();
  const id = params?.id;
  const property = properties.find((p) => p.id === parseInt(id as any));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey">
        <p className="text-black text-xl">Property Not Found</p>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="bg-grey min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <Image
          src={property.images[0]?.img}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-black/20 to-transparent" />

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
            <div className="max-w-3xl">
              <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
                {property.status} • {property.type}
              </p>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] mb-5">
                {property.title}
              </h1>

              <p className="flex items-center gap-2 text-white/80 text-base md:text-lg mb-8">
                <FaMapMarkerAlt className="text-secondary" />
                {property.location}
              </p>

              <div className="flex flex-wrap gap-8 text-white/90">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                    Price
                  </p>
                  <p className="text-2xl font-semibold">{property.price}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                    Bedrooms
                  </p>
                  <p className="text-2xl font-semibold">{property.bedrooms}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                    Bathrooms
                  </p>
                  <p className="text-2xl font-semibold">{property.bathrooms}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                    Area
                  </p>
                  <p className="text-2xl font-semibold">{property.area} sqft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 flex flex-row justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-2/3">
          {/* GALLERY */}
          <div className="bg-white  rounded-3xl p-5 shadow-sm mb-8">
            <div className="relative overflow-hidden rounded-2xl slider-container">
              <Slider {...settings}>
                {property.images.map((image: any, index: number) => (
                  <div key={index}>
                    <div className="">
                      <Image
                        src={image.img}
                        alt={`${property.title} image ${index + 1}`}
                        width={800}
                        height={500}
                        className="rounded-lg w-full h-[400px] object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
            <h2 className="font-serif text-3xl font-light text-black mb-6">
              Property Highlights
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <FaBed className="text-primary text-xl mb-3" />
                <p className="text-grey2 text-sm">Bedrooms</p>
                <p className="text-xl font-semibold">{property.bedrooms}</p>
              </div>

              <div>
                <FaBath className="text-primary text-xl mb-3" />
                <p className="text-grey2 text-sm">Bathrooms</p>
                <p className="text-xl font-semibold">{property.bathrooms}</p>
              </div>

              <div>
                <MdSquareFoot className="text-primary text-xl mb-3" />
                <p className="text-grey2 text-sm">Area</p>
                <p className="text-xl font-semibold">{property.area} sqft</p>
              </div>

              <div>
                <FaMapMarkerAlt className="text-primary text-xl mb-3" />
                <p className="text-grey2 text-sm">Type</p>
                <p className="text-xl font-semibold">{property.type}</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
            <h2 className="font-serif text-3xl font-light text-black mb-6">
              Description
            </h2>

            <p className="text-grey2 leading-8">
              {property.description ||
                `An exceptional ${property.type.toLowerCase()} designed with refined finishes, spacious interiors, and premium architecture.`}
            </p>
          </div>

          {/* MAP */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-16">
            <h2 className="font-serif text-3xl font-light text-black mb-6">
              Location
            </h2>

            <div className="h-[350px] rounded-2xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://maps.google.com/maps?q=accra&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTACT */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-1">
              Schedule a viewing
            </p>

            <h3 className="font-serif text-2xl font-light text-black mb-6">
              Request More Details
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-secondary"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-secondary"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-secondary"
              />

              <textarea
                rows={5}
                placeholder="I'd like to schedule a private tour..."
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none resize-none focus:border-secondary"
              />

              <button className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:opacity-90 transition">
                Send Inquiry
              </button>
            </form>

            <div className="border-t border-black/5  pt-6">
              <button className="w-full border border-primary text-primary py-3  rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition">
                <FaPhoneAlt />
                Call Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <Carousel title="Similar Properties" />
    </div>
  );
}
