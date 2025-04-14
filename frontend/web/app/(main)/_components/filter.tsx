"use client"; // Ensure client-side rendering for Next.js App Router

import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PropertySearchFilter: React.FC = () => {
    const [status, setStatus] = useState<'rent' | 'sale'>('rent');
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 650000]);

    // Handler for price range change
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceRange((prev) => (
            name === 'min' ? [Number(value), prev[1]] : [prev[0], Number(value)]
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            {/* Toggle Buttons */}
            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => setStatus('rent')}
                    className={`flex-1 py-2 rounded-full font-semibold transition ${status === 'rent' ? 'bg-secondary text-white' : 'bg-grey1 text-white'
                        }`}
                >
                    FOR RENT
                </button>
                <button
                    onClick={() => setStatus('sale')}
                    className={`flex-1 py-2 rounded-full font-semibold transition ${status === 'sale' ? 'bg-secondary text-white' : 'bg-grey1 text-white'
                        }`}
                >
                    FOR SALE
                </button>
            </div>

            {/* Keyword Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Type keyword..."
                    className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-secondary"
                />
            </div>

            {/* Location Input */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Location"
                    className="w-full border border-grey rounded-lg px-4 py-2 pl-10 focus:outlinring-2 focus:ring-secondary"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
            </div>

            {/* Property Type Dropdown */}
            <div className="mb-4">
                <select
                    className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-secondary appearance-none"
                >
                    <option>Property type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Condo</option>
                    <option>Villa</option>
                </select>
            </div>

            {/* Rooms Dropdown */}
            <div className="mb-4">
                <select
                    className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-secondary appearance-none"
                >
                    <option>Room</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                </select>
            </div>

            {/* Bathrooms Dropdown */}
            <div className="mb-4">
                <select
                    className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-secondary appearance-none"
                >
                    <option>Bathrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                </select>
            </div>

            {/* Bedrooms Dropdown */}
            <div className="mb-4">
                <select
                    className="w-full border border-grey rounded-lg px-4 py-2 focus:outline-none focus:ring-secondary appearance-none"
                >
                    <option>Bedrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                </select>
            </div>


            {/* Price Range Slider */}
            <div>
                <label className="block text-gray-700 mb-2">
                    Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </label>
                <div className="flex gap-2">
                    <input
                        type="range"
                        name="min"
                        min="100"
                        max="650000"
                        value={priceRange[0]}
                        onChange={handlePriceChange}
                        className="w-full accent-secondary"
                    />
                    <input
                        type="range"
                        name="max"
                        min="100"
                        max="650000"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full accent-secondary"
                    />
                </div>
            </div>


        </div>
    );
};

export default PropertySearchFilter;