"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { FaSearch, FaSlidersH, FaFilter } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import PropertyCardTwo from "../components/searchPropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const { properties, loading, error, fetchProperties } = useProperties();

  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [propertyType, setPropertyType] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [mounted, setMounted] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    setMounted(true);
    setSearchQuery(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "All");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setBedrooms(searchParams.get("bedrooms") || "Any");
    setPropertyType(searchParams.get("type") || "All");
  }, [searchParams]);

  const parsePrice = (price: string) =>
    Number(String(price).replace(/[^\d]/g, "")) || 0;

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const matchesSearch =
        !searchQuery ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        status === "All" || property.status === status;

      const propertyPrice = parsePrice(property.price);
      const matchesMin = !minPrice || propertyPrice >= Number(minPrice);
      const matchesMax = !maxPrice || propertyPrice <= Number(maxPrice);

      const matchesBedrooms =
        bedrooms === "Any" || property.bedrooms >= Number(bedrooms);

      const matchesBathrooms =
        bathrooms === "Any" || property.bathrooms >= Number(bathrooms);

      const matchesType =
        propertyType === "All" || property.type === propertyType;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMin &&
        matchesMax &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesType
      );
    });

    // Sorting
    if (sortBy === "price-low") {
      return [...filtered].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    }

    if (sortBy === "price-high") {
      return [...filtered].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    // Default: latest (by ID or created date)
    return [...filtered].sort((a, b) => b.id - a.id);
  }, [properties, searchQuery, status, minPrice, maxPrice, bedrooms, bathrooms, propertyType, sortBy]);

  useEffect(() => {
    fetchProperties();
  }, []);

  if (!mounted) {
    return (
      <div className="bg-grey min-h-screen">
        <section className="bg-primary-dark pt-28 pb-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-20 w-64 mb-4" />
            <Skeleton className="h-12 w-full max-w-2xl" />
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grey min-h-screen">
      {/* Hero */}
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid lg:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar Filters */}
        <aside className="bg-white rounded-3xl p-6 shadow-sm h-fit sticky top-28">
          <div className="flex items-center gap-3 mb-6">
            <FaFilter className="text-secondary" />
            <h2 className="font-serif text-2xl text-black">Filters</h2>
          </div>

          <div className="space-y-5">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Properties</option>
                <option value="FOR_SALE">For Sale</option>
                <option value="FOR_RENT">For Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Types</option>
                <option value="HOUSE">House</option>
                <option value="CONDO">Condo</option>
                <option value="APARTMENT">Apartment</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Any">Any</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Any">Any</option>
                <option value="1">1+ Bathrooms</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
                <option value="4">4+ Bathrooms</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="latest">Latest Listings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Filters */}
            <Button
              onClick={() => {
                setSearchQuery("");
                setStatus("All");
                setMinPrice("");
                setMaxPrice("");
                setBedrooms("Any");
                setBathrooms("Any");
                setPropertyType("All");
                setSortBy("latest");
              }}
              variant="outline"
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </aside>

        {/* Results */}
        <main>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
              <button
                onClick={() => fetchProperties()}
                className="ml-4 underline"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-8">
            <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-2">
              Search Results
            </p>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-4xl font-light text-black">
                {filteredProperties.length} Properties Found
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">No properties found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setStatus("All");
                  setMinPrice("");
                  setMaxPrice("");
                  setBedrooms("Any");
                  setBathrooms("Any");
                  setPropertyType("All");
                }}
                className="bg-primary"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCardTwo key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-20 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

export default Page;
