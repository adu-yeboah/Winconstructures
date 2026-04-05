"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import { Property } from "@/types/property";

interface PropertyCardLuxuryProps {
  property: Property;
}

const PropertyCardTwo: React.FC<PropertyCardLuxuryProps> = ({ property }) => {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={property.images[0]?.img || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-5 left-5 bg-secondary text-black text-xs font-medium px-4 py-2 rounded-full">
          {property.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <p className="text-grey2 text-sm flex items-center gap-2 mb-3">
          <FaMapMarkerAlt className="text-secondary" />
          {property.location}
        </p>

        <h3 className="font-serif text-3xl font-light text-black mb-3">
          {property.title}
        </h3>

        <p className="text-grey2 leading-relaxed mb-6 line-clamp-2">
          {property.description ||
            `Elegant ${property.bedrooms}-bedroom residence with spacious interiors and premium finishes.`}
        </p>

        {/* Features */}
        <div className="flex gap-6 text-sm text-grey2 border-t border-black/5 pt-5 mb-6">
          <div className="flex items-center gap-2">
            <FaBed className="text-primary" />
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBath className="text-primary" />
            <span>{property.bathrooms} Baths</span>
          </div>

          <div className="flex items-center gap-2">
            <MdSquareFoot className="text-primary" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-primary">
            {property.price}
          </p>

          <button className="text-secondary font-medium hover:opacity-80 transition">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCardTwo;