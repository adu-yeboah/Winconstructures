"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaChevronDown } from 'react-icons/fa';

const PropertySearchFilter: React.FC = () => {
    const [status, setStatus] = useState<'rent' | 'sale'>('rent');
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 650000]);
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [rooms, setRooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceRange(prev => 
            name === 'min' 
                ? [Math.min(Number(value), prev[1]), prev[1]] 
                : [prev[0], Math.max(Number(value), prev[0])]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your search logic here
        console.log({
            status,
            keyword,
            location,
            propertyType,
            rooms,
            bathrooms,
            bedrooms,
            priceRange
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-full">
                {(['rent', 'sale'] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => setStatus(option)}
                        className={`flex-1 py-3 rounded-full font-medium transition-colors duration-200 ${
                            status === option 
                                ? 'bg-secondary text-white shadow-md' 
                                : 'text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        FOR {option.toUpperCase()}
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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Type keyword..."
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
            </div>

            {/* Dropdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Property Type Dropdown */}
                <div className="relative">
                    <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                        <option value="">Property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="villa">Villa</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Rooms Dropdown */}
                <div className="relative">
                    <select
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                        <option value="">Rooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Bathrooms Dropdown */}
                <div className="relative">
                    <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                        <option value="">Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Bedrooms Dropdown */}
                <div className="relative">
                    <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                        <option value="">Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                            max="650000"
                            step="1000"
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
                            max="650000"
                            step="1000"
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
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
                Search Properties
            </button>
        </form>
    );
};

export default PropertySearchFilter;