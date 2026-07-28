import React from "react";
import { SearchBar } from "./components/searchBar";
import ContactSection from "./components/ui/contactBanner";
import WhyChooseSection from "./components/ui/whyChoose";
import Carousel from "./components/carousel";

const Home = () => {
  const stats = [
    { num: "1,200+", label: "Properties listed" },
    { num: "840+", label: "Happy clients" },
    { num: "15 yr", label: "Years of experience" },
    { num: "98%", label: "Client satisfaction" },
  ];

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1350&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/ via-primary-dark/55 to-primary-dark/30" />

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 pt-44 pb-40">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight mb-5">
              Find your <em className="not-italic text-secondary">perfect</em>
              <br />
              place to live
            </h1>

            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-md font-light mb-10">
              Discover curated properties across prime locations built for the
              way you want to live, work, and invest.
            </p>

            {/* Search */}
            <SearchBar />
          </div>
        </section>

        {/* Stats Bar */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-6 lg:px-8 py-6 bg-white/[0.05] backdrop-blur-sm border-r border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <p className="font-serif text-3xl font-light text-white leading-none mb-1.5">
                {stat.num}
              </p>
              <p className="text-xs text-white/50 font-light uppercase tracking-[0.08em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <Carousel
        title="Recent properties"
        subtitle="Available now"
        featuredOnly={true}
        viewAllLink="/search"
      />

      <ContactSection />

      <WhyChooseSection />
    </>
  );
};

export default Home;
