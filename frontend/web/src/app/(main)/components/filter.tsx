"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaChevronDown, FaSlidersH } from 'react-icons/fa';
import { useProperties } from '@/hooks/useProperty';
import { useRouter } from 'next/navigation';

interface PropertyFilters {
  status?: 'FOR_SALE' | 'FOR_RENT';
  type?: 'HOUSE' | 'CONDO' | 'APARTMENT';
  location?: string;
  search?: string;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}

interface PropertySearchFilterProps {
  onFiltersChange?: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
}

const PropertySearchFilter: React.FC<PropertySearchFilterProps> = ({
  onFiltersChange,
  initialFilters = {}
}) => {
  const router = useRouter();
  const { loading } = useProperties();

  const [filters, setFilters] = useState<PropertyFilters>({
    status: initialFilters.status || 'FOR_SALE',
    type: initialFilters.type,
    location: initialFilters.location || '',
    search: initialFilters.search || '',
    bedrooms: initialFilters.bedrooms,
    bathrooms: initialFilters.bathrooms,
    minPrice: initialFilters.minPrice,
    maxPrice: initialFilters.maxPrice,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 100,
    filters.maxPrice || 1000000
  ]);

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    if (onFiltersChange) {
      onFiltersChange(updatedFilters);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build API filters
    const apiFilters: PropertyFilters = {};

    if (filters.status) apiFilters.status = filters.status;
    if (filters.type) apiFilters.type = filters.type;
    if (filters.location) apiFilters.location = filters.location;
    if (filters.search) apiFilters.search = filters.search;

    // Navigate to search page with filters
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.location) params.append('location', filters.location);
    if (filters.search) params.append('search', filters.search);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
    if (filters.bathrooms) params.append('bathrooms', filters.bathrooms.toString());
    if (priceRange[0]) params.append('minPrice', priceRange[0].toString());
    if (priceRange[1]) params.append('maxPrice', priceRange[1].toString());

    router.push(`/search?${params.toString()}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPriceRange: [number, number] =
      name === 'min'
        ? [Math.min(Number(value), priceRange[1]), priceRange[1]]
        : [priceRange[0], Math.max(Number(value), priceRange[0])];

    setPriceRange(newPriceRange);
    updateFilters({ minPrice: newPriceRange[0], maxPrice: newPriceRange[1] });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-full">
        {(['FOR_RENT', 'FOR_SALE'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => updateFilters({ status: option })}
            className={`flex-1 py-3 rounded-full font-medium transition-colors duration-200 ${
              filters.status === option
                ? 'bg-secondary text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            FOR {option.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Keyword Input */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          placeholder="Search properties..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      {/* Location Input */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaMapMarkerAlt className="text-gray-400" />
        </div>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => updateFilters({ location: e.target.value })}
          placeholder="City, neighborhood..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      {/* Dropdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Property Type Dropdown */}
        <div className="relative">
          <select
            value={filters.type || ''}
            onChange={(e) => updateFilters({ type: e.target.value as 'HOUSE' | 'CONDO' | 'APARTMENT' | undefined })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Property type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="CONDO">Condo</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Bedrooms Dropdown */}
        <div className="relative">
          <select
            value={filters.bedrooms || ''}
            onChange={(e) => updateFilters({ bedrooms: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Bedrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Bathrooms Dropdown */}
        <div className="relative">
          <select
            value={filters.bathrooms || ''}
            onChange={(e) => updateFilters({ bathrooms: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Bathrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Price Display */}
        <div className="relative">
          <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-3 font-medium">
          Price range: <span className="text-secondary">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
        </label>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="range"
              name="min"
              min="100"
              max="1000000"
              step="5000"
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
          <div className="relative">
            <input
              type="range"
              name="max"
              min="100"
              max="1000000"
              step="5000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <FaSlidersH className="w-4 h-4" />
        {loading ? 'Searching...' : 'Search Properties'}
      </button>
    </form>
  );
};

export default PropertySearchFilter;
