import { properties } from "@/constants/properties";
import Image from "next/image";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === parseInt(params.id));
  const timeSinceListing = "7 months ago";

  if (!property) return <p className="p-4 text-black">Property Not Found</p>;

  return (
    <div className="p-4">
      <h1 className="text-primary text-2xl font-bold mb-4">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {property.images.map((image: any, index: any) => (
          <Image
            key={index}
            src={image.img}
            alt={`${property.title} image ${index + 1}`}
            width={400}
            height={300}
            className="rounded-lg w-full h-auto"
          />
        ))}
      </div>
      <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt className="text-red-500" />
        <span>{property.location}</span>
        <span className="text-red-500">•</span>
        <span>{timeSinceListing}</span>
      </div>
      <p className="text-blue-500 text-xl font-semibold mb-2">{property.price}</p>
      <p className="text-black mb-2">{property.description}</p>
      <div className="flex gap-4 text-gray-600 text-sm mb-2">
        <div className="flex items-center gap-1">
          <FaBed />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaBath />
          <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdSquareFoot />
          <span>{property.area}</span>
        </div>
      </div>
      <p className="text-black">Status: {property.status}</p>
      <p className="text-black">Type: {property.type}</p>
    </div>
  );
}