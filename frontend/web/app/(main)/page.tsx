import React from 'react';
import { SearchBar } from './_components/searchBar';
import Navbar from './_components/navbar';
import Carousel from './_components/carousel';
import ContactSection from './_components/ui/contactBanner';

const Home = () => {
    return (
        <>
        <div className="relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center h-[110vh]"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
                }}
            >
                <div className="absolute inset-0 bg-tertiary opacity-50"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-primary">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Home</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">
                    Discover a place you’ll love to call home – search through a wide range of properties tailored to your needs and preferences. Explore spaces perfect for living, working, or relaxing.
                </p>
                <SearchBar />
            </section>

        </div>
        <Carousel />
        
        {/* <ContactSection /> */}
        </>



    );
};

export default Home;