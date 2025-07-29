"use client"
import React from 'react';
import Image from 'next/image';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdSquareFoot } from 'react-icons/md';
import { Property } from '@/types/property';
import { useRouter } from 'next/navigation';

interface PropertyCardLuxuryProps {
  property: Property;
}

const PropertyCardTwo: React.FC<PropertyCardLuxuryProps> = ({ property }) => {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push(`/properties/${property.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNavigation();
    }
  };

  return (
    <div
      onClick={handleNavigation}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      aria-label={`View ${property.title} property details`}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-2/5 h-64 md:h-auto">
        <Image
          src={property.images[0]?.img || '/placeholder.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          quality={85}
        />
        <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {property.status.toUpperCase()}
        </span>
      </div>

      {/* Details Section */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 line-clamp-3">
            {property.description || `This stunning ${property.bedrooms}-bedroom property features ${property.bathrooms} bathrooms and ${property.area} sqft of luxurious living space.`}
          </p>

          {/* Details */}
          <div className="flex gap-4 md:gap-6 text-gray-700 mt-2 overflow-ellipsis line-clamp-1">
            <div className="flex items-center gap-2" title={`${property.bedrooms} bedrooms`}>
              <FaBed className="text-tertiary text-lg" />
              <span className="text-sm font-medium">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2" title={`${property.bathrooms} bathrooms`}>
              <FaBath className="text-tertiary text-lg" />
              <span className="text-sm font-medium">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2" title={`${property.area} square feet`}>
              <MdSquareFoot className="text-tertiary text-lg" />
              <span className="text-sm font-medium">{property.area} sqft</span>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xl font-bold text-secondary">
            {property.price}
          </p>
          <button 
            className="text-sm font-medium text-secondary hover:text-primary-dark transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation();
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardTwo;