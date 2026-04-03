import React from "react";
import { SearchBar } from "./components/searchBar";
import ContactSection from "./components/ui/contactBanner";
import WhyChooseSection from "./components/ui/whyChoose";
import Carousel from "./components/carousel";


const Home = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-primary-dark/60" />

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 pt-32 pb-48">
          <div className="max-w-2xl animate-fade-up">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-secondary text-xs font-medium tracking-[0.14em] uppercase">
                Premium Real Estate
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight mb-5">
              Find your{" "}
              <em className="italic text-secondary ">perfect</em>
              <br />
              place to live
            </h1>

            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-md font-light mb-10">
              Discover curated properties across prime locations — built for the
              way you want to live, work, and invest.
            </p>

            {/* Search */}
            <SearchBar />
          </div>
        </section>

        {/* Stats Bar */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {[
            { num: "1.2k+", label: "Properties listed" },
            { num: "840+", label: "Happy clients" },
            { num: "15yr", label: "Years of experience" },
            { num: "98%", label: "Client satisfaction" },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-6 lg:px-8 py-5 bg-white/[0.06] backdrop-blur-sm border-r border-white/10 last:border-r-0"
            >
              <p className="font-serif text-3xl font-semibold text-white leading-none mb-1">
                {stat.num}
              </p>
              <p className="text-xs text-white/55 font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Carousel title="Recent properties" />

      <ContactSection />

      <WhyChooseSection />
    </>
  );
};

export default Home;
