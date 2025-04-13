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
  const navigate = useRouter()
  const handleNavigation = () => {
    navigate.push(`/properties/${property.id}`)
  } 

  return (
    <div
      onClick={handleNavigation}
      className="rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer max-w-md hover:scale-101 transform transition duration-300 ease-out"
    >
      <div className="relative">
        <img
          src={images[0]?.img || '/placeholder.jpg'}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
          FEATURED
        </span>
        <span className="absolute top-2 right-2 bg-tertiary text-primary text-xs font-semibold px-2 py-1 rounded">
          {status.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-row justify-between w-full">
          <p className="text-secondary font-bold text-xl">{price}</p>
          <div className="flex items-center gap-2 text-sm text-gray mt-3">
            <div className="flex items-center gap-1">
              <IoBed className="w-4 h-4" /> {bedrooms}
            </div>
            <div className="flex items-center gap-1">
              <FaShower className="w-4 h-4" /> {bathrooms}
            </div>
            <div className="flex items-center gap-1">
              <TfiRulerAlt2 className="w-4 h-4" /> {area}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;