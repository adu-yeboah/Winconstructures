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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(31,77,58,0.12)] h-full flex flex-col"
    >
      {/* Image */}
    {/* Image — parent MUST be relative + fixed height */}
<div className="relative h-56 sm:h-60 w-full overflow-hidden flex-shrink-0">
  {!imageError && images[0]?.img ? (
    <Image
      src={images[0].img}
      alt={title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      loading="lazy"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
      </svg>
    </div>
  )}
  ...
</div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-tertiary text-xs">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {title}
        </h3>

        <div className="h-px bg-gray-100" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="font-serif text-xl sm:text-2xl font-semibold text-primary leading-none">
            {price}
            <span className="font-sans text-xs font-normal text-tertiary ml-1">
              {status === 'FOR_RENT' ? '/ mo' : ''}
            </span>
          </p>

          <div className="flex items-center gap-3 text-tertiary text-xs">
            <span className="flex items-center gap-1" title={`${bedrooms} bedrooms`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {bedrooms}
            </span>
            <span className="flex items-center gap-1" title={`${bathrooms} bathrooms`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 6h16M4 18h7"/>
              </svg>
              {bathrooms}
            </span>
            <span className="flex items-center gap-1" title={`${area} sq ft`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
              {area} ft²
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;