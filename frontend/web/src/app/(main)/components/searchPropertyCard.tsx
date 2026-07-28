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
      className="group bg-white rounded-none overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:border-primary h-full flex flex-col relative"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full z-10" />

      {/* Image */}
      <div className="relative h-80 overflow-hidden flex-shrink-0">
        <Image
          src={property.images[0]?.img || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />

        <div className="absolute top-5 right-5 bg-primary text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-none z-10">
          {property.status.replace('_', ' ')}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col gap-4">
        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 line-clamp-2 leading-tight flex-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-secondary rounded-none shrink-0"></span>
          <span className="truncate">{property.location}</span>
        </div>

        <p className="text-gray-500 font-light leading-relaxed mb-2 line-clamp-2 text-sm">
          {property.description ||
            `Elegant ${property.bedrooms}-bedroom residence with spacious interiors and premium finishes.`}
        </p>

        <div className="h-px bg-gray-200 my-1" />

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Price</p>
            <p className="font-sans text-2xl font-semibold text-primary leading-none">
              {property.price}
            </p>
          </div>

          <div className="flex items-center gap-4 text-gray-600 text-xs font-medium">
            <span className="flex flex-col items-center gap-1" title={`${property.bedrooms} bedrooms`}>
              <span className="text-lg">{property.bedrooms}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Beds</span>
            </span>
            <span className="flex flex-col items-center gap-1" title={`${property.bathrooms} bathrooms`}>
              <span className="text-lg">{property.bathrooms}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Baths</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCardTwo;