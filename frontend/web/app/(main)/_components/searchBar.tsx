"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const SearchBar = () => {
    const [filter, setFilter] = useState<'All' | 'For Sale' | 'For Rent'>('All');
    const navigate = useRouter()
    const handleSubmit = () => {
        navigate.push("/search")
    }
    return (

        <div className=" flex flex-col md:flex-col items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Filter Buttons */}
            <div className="flex space-x-2">
                <button
                    onClick={() => setFilter('All')}
                    className={`px-7 py-4 rounded ${filter === 'All' ? 'bg-white text-black' : 'bg-tertiary text-white'
                        } hover:text-secondary`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('For Sale')}
                    className={`px-7 py-4 rounded ${filter === 'For Sale' ? 'bg-white text-black' : 'bg-tertiary text-white'
                        } hover:text-secondary`}
                >
                    For Sale
                </button>
                <button
                    onClick={() => setFilter('For Rent')}
                    className={`px-7 py-4 rounded ${filter === 'For Rent' ? 'bg-white text-black' : 'bg-tertiary text-white'
                        } hover:text-primary`}
                >
                    For Rent
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row gap-3.5">
                {/* Search Inputs */}
                <select className="border border-tertiary rounded px-7 py-4 w-full md:w-auto text-tertiary">
                    <option>Property Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                </select>
                <select className="border border-tertiary rounded px-7 py-4 w-full md:w-auto text-tertiary">
                    <option>Region</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                </select>
                <select className="border border-tertiary rounded px-7 py-4 w-full md:w-auto text-tertiary">
                    <option>Price</option>
                    <option>Under $100,000</option>
                    <option>$100,000 - $300,000</option>
                    <option>Above $300,000</option>
                </select>

                {/* Search Button */}
                <button
                    onClick={handleSubmit}
                    className="bg-secondary text-white px-6 py-2 rounded hover:bg-tertiary cursor-pointer">
                    Search
                </button>
            </div>
        </div>
    );
};

