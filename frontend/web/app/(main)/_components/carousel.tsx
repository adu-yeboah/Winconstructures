import { properties } from '@/constants/properties';
import React from 'react';
import PropertyCard from './propertyCard';

const Carousel = () => {
    return (
        <section className="py-12 px-4 container">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Premium Property Picks</h2>
                <div className="flex items-center space-x-2">
                    <button className="bg-secondary text-primary px-4 py-2 rounded hover:bg-tertiary">
                        View All
                    </button>

                </div>
            </div>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {properties.map((property) => (
                    <PropertyCard property={property} key={property.id}/>
                ))}
            </div>
        </section>
    );
};

export default Carousel;