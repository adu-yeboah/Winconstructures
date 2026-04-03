"use client";
import React, { useMemo, useState } from "react";
import { properties } from "@/constants/properties";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import PropertyCardTwo from "../components/searchPropertyCard";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [sortBy, setSortBy] = useState("latest");

  const parsePrice = (price: string) =>
    Number(String(price).replace(/[^\d]/g, "")) || 0;

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        status === "All" ||
        property.status.toLowerCase() === status.toLowerCase();

      const propertyPrice = parsePrice(property.price);
      const matchesMin = !minPrice || propertyPrice >= Number(minPrice);
      const matchesMax = !maxPrice || propertyPrice <= Number(maxPrice);

      const matchesBedrooms =
        bedrooms === "Any" || property.bedrooms >= Number(bedrooms);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMin &&
        matchesMax &&
        matchesBedrooms
      );
    });

    if (sortBy === "price-low") {
      filtered = [...filtered].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    }

    if (sortBy === "price-high") {
      filtered = [...filtered].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    return filtered;
  }, [searchQuery, status, minPrice, maxPrice, bedrooms, sortBy]);

  return (
    <div className="bg-grey min-h-screen">
      <section className="bg-primary-dark pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-4">
            Advanced Property Search
          </p>
          <h1 className="font-serif text-5xl font-light text-white mb-8">
            Find your ideal property
          </h1>

          <div className="relative max-w-3xl">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 pl-14 pr-5 py-4 outline-none focus:border-secondary"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid lg:grid-cols-[1fr] gap-10">
        {/* Filters */}
        {/* <aside className="bg-white rounded-3xl p-6 shadow-sm h-fit sticky top-28">
          <div className="flex items-center gap-3 mb-6">
            <FaSlidersH className="text-secondary" />
            <h2 className="font-serif text-2xl text-black">Filters</h2>
          </div>

          <div className="space-y-5">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-grey1 px-4 py-3"
            >
              <option>All</option>
              <option>sale</option>
              <option>rent</option>
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="rounded-xl border border-grey1 px-4 py-3"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="rounded-xl border border-grey1 px-4 py-3"
              />
            </div>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full rounded-xl border border-grey1 px-4 py-3"
            >
              <option>Any</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-grey1 px-4 py-3"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside> */}

        {/* Results */}
        <main>
          <div className="mb-8">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-2">
              Search Results
            </p>
            <h2 className="font-serif text-4xl font-light text-black">
              {filteredProperties.length} Properties Found
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCardTwo key={property.id} property={property} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
