"use client";
import React, { useState } from 'react';
import { properties } from '@/constants/properties';
import PropertyCardTwo from '../_components/searchPropertyCard';
import { FaFilter, FaSearch } from 'react-icons/fa';

function Page() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter properties based on search query
  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-80px)]">
      {/* Mobile Search Bar */}
      <div className="lg:hidden mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-2 rounded-lg"
        >
          <FaFilter />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
       

        {/* Main Content */}
        <div className="lg w-full">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} Properties Found
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
             
            </div>
          </div>

          {/* Results Count - Mobile */}
          <div className="lg:hidden mb-4">
            <p className="text-gray-600">
              Showing {filteredProperties.length} properties
            </p>
          </div>

          {/* Property Cards */}
          {filteredProperties.length > 0 ? (
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
              {filteredProperties.map((property) => (
                <PropertyCardTwo 
                  key={property.id} 
                  property={property} 
                  // variant={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md">
                <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what youre looking for.
                </p>
              </div>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
}

export default Page;