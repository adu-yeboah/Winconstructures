import React from 'react';
import { SearchBar } from './_components/searchBar';
import Carousel from './_components/carousel';
import ContactSection from './_components/ui/contactBanner';
import WhyChooseSection from './_components/ui/whyChoose';

const Home = () => {
    return (
        <>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center h-[100vh]"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
                }}
            >
                <div className="absolute inset-0 bg-tertiary opacity-50"></div>
            </div>


            {/* Main Content */}
            <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center text-primary px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Find Your Perfect Home
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl md:max-w-2xl">
                    Discover a place you’ll love to call home – search through a wide range of properties tailored to your needs and preferences. Explore spaces perfect for living, working, or relaxing.
                </p>
                <SearchBar />
            </section>


            <Carousel />

            <ContactSection />

            <WhyChooseSection />

        </>

    );
};

export default Home;