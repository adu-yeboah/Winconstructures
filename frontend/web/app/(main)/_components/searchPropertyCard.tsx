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
  const navigate = useRouter()
  const handleNavigation = () => {
    navigate.push(`properties/${property.id}`)
  }

  return (
    <div
      onClick={handleNavigation}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row cursor-pointer transform hover:scale-101 transition-all ease-in-out">
      {/* Image Section */}
      <div className="relative w-full  md:w-1/3">
        <Image
          src={property.images[0]?.img || '/placeholder.jpg'}
          alt={property.title}
          width={400}
          height={240}
          className="w-full md:h-[230px] h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
          {property.status.toUpperCase()}
        </span>
      </div>

      {/* Details Section */}
      <div className="p-4 flex-1 flex flex-col items-start justify-start">
        <div className='flex flex-col gap-2.5'>

          {/* Title */}
          <h3 className=" text-xl md:text-2xl font-semibold text-secondary">
            {property.title}
          </h3>

          <div className="text-base text-grey1 line-clamp-3">
            {/* {property.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi officiis itaque aperiam voluptatibus. Voluptate nulla, quis aliquam sapiente vero voluptas. Voluptatem amet quibusdam, veniam repudiandae nostrum repellendus sapiente ducimus.
            Necessitatibus quibusdam nemo ad? Sunt voluptates sapiente dolores deleniti eligendi reiciendis quia, rem iusto, animi unde repellendus eaque fuga sit qui eum debitis! Praesentium omnis quae pariatur hic deserunt quidem?
            Perspiciatis maxime aspernatur commodi? Suscipit, amet. Eius, animi. Doloremque neque, repudiandae ipsa eum, dolorum aut unde voluptates consequatur facere aliquid commodi? Commodi, sint asperiores praesentium cupiditate dolorum iure possimus cum!
            Perferendis ullam sit ad. Quisquam, blanditiis sed quos esse, eligendi ea molestiae incidunt, atque doloribus earum culpa sequi magnam dicta tempora dignissimos officia! Dignissimos, explicabo expedita consectetur numquam laudantium tempora.
            Excepturi sint laboriosam voluptates quidem dolorem nesciunt nisi cumque voluptas! Ad nulla ipsam molestiae distinctio, maxime sequi ipsum laborum veniam ex reprehenderit exercitationem explicabo amet dignissimos aliquid placeat quam quo.
            Sed ullam voluptate provident laboriosam, similique corporis eum perferendis non possimus quae molestiae! Ducimus veniam unde soluta dolorum ipsam veritatis neque corrupti eum ratione, ex earum est dolores eligendi optio!
          </div>


          {/* Details */}
          <div className="flex gap-4 md:gap-6 text-gray-600 text-sm mb-3">
            <div className="flex items-center gap-1 text-lg">
              <FaBed className='text-tertiary' />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-lg">
              <FaBath className='text-tertiary' />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-lg">
              <MdSquareFoot className='text-tertiary' />
              <span>{property.area}</span>
            </div>

          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <p className="text-secondary text-xl font-semibold">{property.price}</p>
        </div>

      </div>
    </div>
  );
};

export default PropertyCardTwo;