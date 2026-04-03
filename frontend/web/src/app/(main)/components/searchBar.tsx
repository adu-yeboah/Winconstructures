"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const SearchBar = () => {
  const [filter, setFilter] = useState<"All" | "For Sale" | "For Rent">("All");
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-0">
        {(["All", "For Sale", "For Rent"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2.5 rounded-t-md text-sm font-medium transition-all duration-200 ${
              filter === item
                ? "bg-white text-primary"
                : "bg-white/15 text-white/70 hover:bg-white/25 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-white rounded-b-xl rounded-tr-xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shadow-xl">
        
        <div className="flex-1 flex flex-col gap-0.5 px-1">
          <label className="text-[10px] font-semibold text-tertiary tracking-widest uppercase">
            Type
          </label>
          <select className="border-none outline-none bg-transparent text-sm text-black font-medium py-0.5 cursor-pointer">
            <option value="">Any type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Condo</option>
            <option>Land</option>
          </select>
        </div>

        <div className="hidden sm:block w-px bg-gray-200 self-stretch mx-1" />

        <div className="flex-1 flex flex-col gap-0.5 px-1">
          <label className="text-[10px] font-semibold text-tertiary tracking-widest uppercase">
            Location
          </label>
          <select className="border-none outline-none bg-transparent text-sm text-black font-medium py-0.5 cursor-pointer">
            <option value="">Any location</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
            <option>Central</option>
          </select>
        </div>

        <div className="hidden sm:block w-px bg-gray-200 self-stretch mx-1" />

        <div className="flex-1 flex flex-col gap-0.5 px-1">
          <label className="text-[10px] font-semibold text-tertiary tracking-widest uppercase">
            Price
          </label>
          <select className="border-none outline-none bg-transparent text-sm text-black font-medium py-0.5 cursor-pointer">
            <option value="">Any price</option>
            <option>Under $100,000</option>
            <option>$100k – $300k</option>
            <option>$300k – $500k</option>
            <option>Above $500k</option>
          </select>
        </div>

        <button
          onClick={() => router.push("/search")}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};