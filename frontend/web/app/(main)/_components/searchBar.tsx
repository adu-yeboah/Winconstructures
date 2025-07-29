"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const SearchBar = () => {
    const [filter, setFilter] = useState<'All' | 'For Sale' | 'For Rent'>('All');
    const router = useRouter();
    
    const handleSubmit = () => {
        router.push("/search");
    };

    return (
        <div className="flex flex-col items-center w-full max-w-5xl px-4 space-y-1">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
                {(['All', 'For Sale', 'For Rent'] as const).map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                            filter === item 
                                ? 'bg-secondary text-white shadow-md' 
                                : 'bg-tertiary text-gray-700 hover:scale-102'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Search Inputs and Button */}
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3 w-full border border-gray-100">
                <div className="flex-1 min-w-[180px]">
                    <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary text-black transition-all"
                        aria-label="Property Type"
                    >
                        <option value="" hidden>Property Type</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Condo</option>
                        <option>Townhouse</option>
                        <option>Land</option>
                    </select>
                </div>
                
                <div className="flex-1 min-w-[180px]">
                    <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary text-black transition-all"
                        aria-label="Region"
                    >
                        <option value="" hidden>Location</option>
                        <option>North</option>
                        <option>South</option>
                        <option>East</option>
                        <option>West</option>
                        <option>Central</option>
                    </select>
                </div>
                
                <div className="flex-1 min-w-[180px]">
                    <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary text-black transition-all"
                        aria-label="Price"
                    >
                        <option value="" hidden>Price Range</option>
                        <option>Under $100,000</option>
                        <option>$100,000 - $300,000</option>
                        <option>$300,000 - $500,000</option>
                        <option>Above $500,000</option>
                    </select>
                </div>
                
                <button
                    onClick={handleSubmit}
                    className="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center min-w-[120px]"
                    aria-label="Search properties"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                </button>
            </div>
        </div>
    );
};