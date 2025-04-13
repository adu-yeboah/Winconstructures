"use client";
import React from 'react';

const WhyChooseSection: React.FC = () => {
    return (
        <section className="relative py-30 h-70vh bg-gradient-to-b from-grey to-grey1 opacity-80">

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Heading */}
                    <div className="text-black">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-1 bg-blue-400 mr-2"></div>
                            <span className="text-sm uppercase tracking-wider">Wisconstructures</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl text-secondary font-bold leading-tight">
                            Why Houzez Is The Perfect Choice?
                        </h2>
                    </div>

                    {/* Point 01 */}
                    <div className="text-black">
                        <p className="text-3xl font-bold mb-2 text-secondary">01.</p>
                        <h3 className="text-xl font-semibold mb-2 text-secondary">Easy To Get Started</h3>
                        <p className="text-gray-200">
                            Get ready to launch your real estate website without any previous experience.
                        </p>
                    </div>

                    {/* Point 02 */}
                    <div className="text-black">
                        <p className="text-3xl font-bold mb-2 text-secondary">02.</p>
                        <h3 className="text-xl font-semibold mb-2 text-secondary">Pre-Built Websites</h3>
                        <p className="text-gray-200">
                            Get started by choosing from one of our pre-built page templates to showcase your properties.
                        </p>
                    </div>

                    {/* Point 03 */}
                    <div className="text-black">
                        <p className="text-3xl font-bold mb-2 text-secondary">03.</p>
                        <h3 className="text-xl font-semibold mb-2 text-secondary">Highly Customizable</h3>
                        <p className="text-gray-200">
                            Customize your website to your expectations by using all of the theme features.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;