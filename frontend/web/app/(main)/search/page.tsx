import React from 'react';
import PropertySearchFilter from '../_components/filter';
import { properties } from '@/constants/properties';
import PropertyCardTwo from '../_components/searchPropertyCard';

function Page() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col lg:flex-row gap-6">

      <aside className="lg:w-1/4 w-full">
        <div className="lg lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
          <PropertySearchFilter />
        </div>
      </aside>

      {/* Main Content: Property Cards */}
      <div className="lg:w-3/4 w-full">
        <h2 className="text-2xl font-bold mb-4">Featured Properties</h2>
        <div className="grid grid-cols-1 gap-6">
          {properties.map((property) => (
            <PropertyCardTwo key={property.id} property={property} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Page;