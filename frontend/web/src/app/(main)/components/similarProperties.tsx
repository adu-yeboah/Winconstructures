import { Property } from "@/types/property";
import propertyService from "@/service/propertyService";
import PropertyCard from "./propertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface SimilarPropertiesProps {
  currentProperty: Property;
  limit?: number;
}

export function SimilarProperties({ currentProperty, limit = 3 }: SimilarPropertiesProps) {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true);
        const similar = await propertyService.getSimilarProperties(currentProperty.id, limit);
        setSimilarProperties(similar);
      } catch (error) {
        console.error('Error fetching similar properties:', error);
        setSimilarProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilarProperties();
  }, [currentProperty, limit]);





  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72 sm:h-80 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12">
        <p className="text-gray-600 text-sm sm:text-base">No similar properties available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {similarProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
