import { Property } from "@/types/property";
import { useProperties } from "@/hooks/useProperty";
import PropertyCard from "./propertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface SimilarPropertiesProps {
  currentProperty: Property;
  limit?: number;
}

export function SimilarProperties({ currentProperty, limit = 3 }: SimilarPropertiesProps) {
  const { properties, loading, fetchProperties } = useProperties();
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProperties();
  }, []);

  useEffect(() => {
    if (properties.length > 0 && currentProperty) {
      // Find similar properties based on:
      // 1. Same status (FOR_SALE/FOR_RENT)
      // 2. Same type (HOUSE/CONDO/APARTMENT) if possible
      // 3. Same location or nearby
      // 4. Similar price range
      // 5. Excluding current property

      const similar = properties
        .filter((p) => p.id !== currentProperty.id) // Exclude current property
        .filter((p) => p.status === currentProperty.status) // Same status
        .map((property) => {
          let similarityScore = 0;

          // Same type = high similarity
          if (property.type === currentProperty.type) {
            similarityScore += 3;
          }

          // Same location = medium similarity
          if (property.location.toLowerCase() === currentProperty.location.toLowerCase()) {
            similarityScore += 2;
          } else if (
            property.location.toLowerCase().includes(currentProperty.location.toLowerCase().split(',')[0]) ||
            currentProperty.location.toLowerCase().includes(property.location.toLowerCase().split(',')[0])
          ) {
            similarityScore += 1; // Nearby location
          }

          // Similar price range
          const currentPrice = parseInt(currentProperty.price.replace(/[^\d]/g, ''));
          const propertyPrice = parseInt(property.price.replace(/[^\d]/g, ''));
          const priceDifference = Math.abs(currentPrice - propertyPrice);
          const priceSimilarity = Math.max(0, 5 - Math.floor(priceDifference / 100000));
          similarityScore += priceSimilarity;

          // Similar bedroom count
          const bedroomDifference = Math.abs(property.bedrooms - currentProperty.bedrooms);
          if (bedroomDifference === 0) {
            similarityScore += 2;
          } else if (bedroomDifference === 1) {
            similarityScore += 1;
          }

          return { property, similarityScore };
        })
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, limit)
        .map((item) => item.property);

      setSimilarProperties(similar);
    }
  }, [properties, currentProperty, limit]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No similar properties available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {similarProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
