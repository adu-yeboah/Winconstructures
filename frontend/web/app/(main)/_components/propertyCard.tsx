import { FC } from 'react';
import { Property } from '@/types/property';
import { FaShower } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { useRouter } from 'next/navigation';

export type Image = {
  img: string;
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { title, price, bedrooms, bathrooms, area, images, status } = property;
  const navigate = useRouter();
  const handleNavigation = () => {
    navigate.push(`/properties/${property.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto hover:scale-[1.02] transform transition duration-300 ease-out"
    >
      <div className="relative w-full h-44 sm:h-52 md:h-60">
        <img
          src={images[0]?.img || '/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
          {status.toUpperCase()}
        </span>
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="block text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 line-clamp-1">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
          <p className="text-secondary font-bold text-base sm:text-lg md:text-xl">{price}</p>
          <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-600">
            <div className="flex items-center not-last:mr-2 sm:not-last:mr-3">
              <IoBed className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center not-last:mr-2 sm:not-last:mr-3">
              <FaShower className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center not-last:mr-2 sm:not-last:mr-3">
              <TfiRulerAlt2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span>{area}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;