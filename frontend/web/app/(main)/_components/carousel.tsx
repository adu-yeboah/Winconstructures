import { properties } from '@/constants/properties';
import React from 'react';

const Carousel = () => {
    return (
        <section className="py-12 px-4 container">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Premium Property Picks</h2>
                <div className="flex items-center space-x-2">
                    <button className="bg-secondary text-primary px-4 py-2 rounded hover:bg-tertiary">
                        View All
                    </button>
                    <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {properties.map((property) => (
                    <div key={property.id} className="min-w-[300px] bg-white rounded-lg shadow-lg">





                    </div>
                ))}
            </div>
        </section>
    );
};

export default Carousel;