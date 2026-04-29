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
  const [saved, setSaved] = useState(false);

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(31,77,58,0.10)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={images[0]?.img || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />

        {/* Badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-medium tracking-widest uppercase ${
            status === 'FOR_RENT'
              ? 'bg-secondary text-primary-dark'
              : 'bg-primary text-white'
          }`}
        >
          {status}
        </span>

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors hover:bg-primary-light"
          aria-label={saved ? 'Unsave property' : 'Save property'}
        >
          <svg
            className={`w-4 h-4 transition-colors ${saved ? 'stroke-primary fill-primary-light' : 'stroke-gray-400 fill-none'}`}
            viewBox="0 0 24 24" strokeWidth="1.8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-tertiary text-xs mb-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {location}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 truncate">
          {title}
        </h3>

        <div className="h-px bg-gray-100 mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="font-serif text-xl sm:text-2xl font-semibold text-primary leading-none">
            {price}
            <span className="font-sans text-xs font-normal text-tertiary ml-1">
              {status === 'FOR_RENT' ? '/ mo' : '/ sale'}
            </span>
          </p>

          <div className="flex items-center gap-3 text-tertiary text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {bedrooms} bed
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 6h16M4 18h7"/>
              </svg>
              {bathrooms} bath
            </span>
            <span className="flex items-center gap-1">
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