import { FC } from 'react';
import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { title, price, bedrooms, bathrooms, area, images, status, location } = property;
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group bg-white rounded-none overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:border-primary h-full flex flex-col relative"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full z-10" />
      
      {/* Image */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden flex-shrink-0">
        {!imageError && images[0]?.img ? (
          <Image
            src={images[0].img}
            alt={title}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 22V12h6v10" />
            </svg>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-none z-10">
          {status.replace('_', ' ')}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-light text-gray-900 line-clamp-2 leading-tight flex-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span>
            <span className="truncate">{location}</span>
          </div>
        )}

        <div className="h-px bg-gray-200 my-1" />

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Price</p>
            <p className="font-sans text-xl sm:text-2xl font-semibold text-primary leading-none">
              {price}
              <span className="text-xs font-normal text-gray-400 ml-1">
                {status === 'FOR_RENT' ? '/ mo' : ''}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-gray-600 text-xs font-medium">
            <span className="flex flex-col items-center gap-1" title={`${bedrooms} bedrooms`}>
              <span className="text-lg">{bedrooms}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Beds</span>
            </span>
            <span className="flex flex-col items-center gap-1" title={`${bathrooms} bathrooms`}>
              <span className="text-lg">{bathrooms}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Baths</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;