"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const SearchBar = () => {
    const [filter, setFilter] = useState<'All' | 'For Sale' | 'For Rent'>('All');
    const navigate = useRouter();
    const handleSubmit = () => {
        navigate.push("/search");
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setFilter('All')}
                    className={`px-4 py-2 md:px-7 md:py-4 rounded text-sm md:text-base ${
                        filter === 'All' ? 'bg-white text-black' : 'bg-tertiary text-white'
                    } hover:text-secondary transition-colors`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('For Sale')}
                    className={`px-4 py-2 md:px-7 md:py-4 rounded text-sm md:text-base ${
                        filter === 'For Sale' ? 'bg-white text-black' : 'bg-tertiary text-white'
                    } hover:text-secondary transition-colors`}
                >
                    For Sale
                </button>
                <button
                    onClick={() => setFilter('For Rent')}
                    className={`px-4 py-2 md:px-7 md:py-4 rounded text-sm md:text-base ${
                        filter === 'For Rent' ? 'bg-white text-black' : 'bg-tertiary text-white'
                    } hover:text-primary transition-colors`}
                >
                    For Rent
                </button>
            </div>

            {/* Search Inputs and Button */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-3 w-full">
                <select
                    className="border border-tertiary rounded px-4 py-3 md:px-7 md:py-4 w-full text-sm md:text-base text-tertiary"
                    aria-label="Property Type"
                >
                    <option>Property Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                </select>
                <select
                    className="border border-tertiary rounded px-4 py-3 md:px-7 md:py-4 w-full text-sm md:text-base text-tertiary"
                    aria-label="Region"
                >
                    <option>Region</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                </select>
                <select
                    className="border border-tertiary rounded px-4 py-3 md:px-7 md:py-4 w-full text-sm md:text-base text-tertiary"
                    aria-label="Price"
                >
                    <option>Price</option>
                    <option>Under $100,000</option>
                    <option>$100,000 - $300,000</option>
                    <option>Above $300,000</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-secondary text-white px-4 py-3 md:px-6 md:py-4 rounded hover:bg-tertiary cursor-pointer text-sm md:text-base transition-colors"
                    aria-label="Search properties"
                >
                    Search
                </button>
            </div>
        </div>
    );
};
