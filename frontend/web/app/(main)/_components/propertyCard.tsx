import { FC } from 'react';
import { Property } from '@/types/property';
import { FaShower } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export type Image = {
  img: string;
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { title, price, bedrooms, bathrooms, area, images, status } = property;
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push(`/properties/${property.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto hover:scale-[1.02] transform transition duration-300 ease-out hover:shadow-xl"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
    >
      <div className="relative w-full h-44 sm:h-52 md:h-60">
        <Image
          src={images[0]?.img || '/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover"
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
          {status.toUpperCase()}
        </span>
      </div>
      
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="block text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 line-clamp-1" title={title}>
          {title}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
          <p className="text-secondary font-bold text-base sm:text-lg md:text-xl">
            {price}
          </p>
          
          <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-600 gap-2 sm:gap-3">
            <div className="flex items-center" title={`${bedrooms} bedrooms`}>
              <IoBed className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-500" />
              <span>{bedrooms}</span>
            </div>
            
            <div className="flex items-center" title={`${bathrooms} bathrooms`}>
              <FaShower className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-500" />
              <span>{bathrooms}</span>
            </div>
            
            <div className="flex items-center" title={`${area} sqft`}>
              <TfiRulerAlt2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-500" />
              <span>{area} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;