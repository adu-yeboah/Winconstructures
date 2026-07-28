"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  Suspense,
  useCallback,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 6;
const DEBOUNCE_MS = 300;
const STORAGE_KEY = "savedPropertySearches";

/* ── helper ────────────────────────────────────────────── */

function generateSearchName(filters: SavedSearch["filters"]): string {
  const parts: string[] = [];
  if (filters.bedrooms !== "Any") parts.push(`${filters.bedrooms}+ bed`);
  if (filters.propertyType !== "All")
    parts.push(filters.propertyType.toLowerCase());
  if (filters.status !== "All")
    parts.push(filters.status === "FOR_SALE" ? "for sale" : "for rent");
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice
      ? `$${Number(filters.minPrice).toLocaleString()}`
      : "";
    const max = filters.maxPrice
      ? `$${Number(filters.maxPrice).toLocaleString()}`
      : "";
    parts.push(`${min}${min && max ? " – " : ""}${max}`);
  }
  if (filters.searchQuery) parts.push(`"${filters.searchQuery}"`);
  return parts.length > 0 ? parts.join(" · ") : "All properties";
}

/* ── main content ──────────────────────────────────────── */

function SearchContent() {
  const searchParams = useSearchParams();
  const { properties, loading, error, fetchProperties } = useProperties();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ── state ──────────────────────────────────── */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Filters>({
    status: "All",
    minPrice: "",
    maxPrice: "",
    bedrooms: "Any",
    bathrooms: "Any",
    propertyType: "All",
    sortBy: "latest",
  });
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const [animKey, setAnimKey] = useState(0);

  const {
    status,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    propertyType,
    sortBy,
  } = filters;

  /* ── localStorage: saved searches ───────────── */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedSearches(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  /* ── init from URL params ───────────────────── */
  useEffect(() => {
    setMounted(true);
    const q = searchParams.get("search") || "";
    setSearchQuery(q);
    setSearchInput(q);
    setFilters({
      status: searchParams.get("status") || "All",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: searchParams.get("bedrooms") || "Any",
      bathrooms: searchParams.get("bathrooms") || "Any",
      propertyType: searchParams.get("type") || "All",
      sortBy: searchParams.get("sort") || "latest",
    });
  }, [searchParams]);

  /* ── debounced search ──────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ── reset page & animate on filter change ──── */
  useEffect(() => {
    if (mounted) {
      setVisibleCount(ITEMS_PER_PAGE);
      setAnimKey((k) => k + 1);
    }
  }, [
    searchQuery,
    status,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    propertyType,
    sortBy,
    mounted,
  ]);

  /* ── keyboard shortcut: / to focus search ──── */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* ── fetch on mount ────────────────────────── */
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  /* ── helpers ───────────────────────────────── */
  const parsePrice = (price: string) =>
    Number(String(price).replace(/[^\d]/g, "")) || 0;

  const formatPrice = (price: number) =>
    price >= 1_000_000
      ? `$${(price / 1_000_000).toFixed(1)}M`
      : price >= 1_000
        ? `$${(price / 1_000).toFixed(0)}K`
        : `$${price}`;

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2500);
  }, []);

  const getCurrentFilters = useCallback(
    (): SavedSearch["filters"] => ({
      searchQuery,
      ...filters,
    }),
    [searchQuery, filters],
  );

  /* ── share ─────────────────────────────────── */
  const buildShareUrl = useCallback(() => {
    const p = new URLSearchParams();
    const f = getCurrentFilters();
    if (f.searchQuery) p.set("search", f.searchQuery);
    if (f.status !== "All") p.set("status", f.status);
    if (f.minPrice) p.set("minPrice", f.minPrice);
    if (f.maxPrice) p.set("maxPrice", f.maxPrice);
    if (f.bedrooms !== "Any") p.set("bedrooms", f.bedrooms);
    if (f.bathrooms !== "Any") p.set("bathrooms", f.bathrooms);
    if (f.propertyType !== "All") p.set("type", f.propertyType);
    if (f.sortBy !== "latest") p.set("sort", f.sortBy);
    const qs = p.toString();
    return `${window.location.origin}${window.location.pathname}${qs ? `?${qs}` : ""}`;
  }, [getCurrentFilters]);

  const handleShare = useCallback(() => {
    navigator.clipboard
      .writeText(buildShareUrl())
      .then(() => showToast("Search link copied to clipboard"))
      .catch(() => showToast("Could not copy link"));
  }, [buildShareUrl, showToast]);

  /* ── save / load / delete searches ─────────── */
  const handleSaveSearch = useCallback(() => {
    const f = getCurrentFilters();
    const next: SavedSearch = {
      id: Date.now().toString(),
      name: generateSearchName(f),
      timestamp: Date.now(),
      filters: f,
    };
    const updated = [next, ...savedSearches].slice(0, 10);
    setSavedSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      /* ignore */
    }
    showToast("Search saved");
  }, [getCurrentFilters, savedSearches, showToast]);

  const handleLoadSearch = useCallback((s: SavedSearch) => {
    const f = s.filters;
    setSearchQuery(f.searchQuery);
    setSearchInput(f.searchQuery);
    setFilters({
      status: f.status,
      minPrice: f.minPrice,
      maxPrice: f.maxPrice,
      bedrooms: f.bedrooms,
      bathrooms: f.bathrooms,
      propertyType: f.propertyType,
      sortBy: f.sortBy,
    });
    setShowFilters(false);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleDeleteSavedSearch = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = savedSearches.filter((s) => s.id !== id);
      setSavedSearches(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
    },
    [savedSearches],
  );

  /* ── reset ─────────────────────────────────── */
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSearchInput("");
    setFilters({
      status: "All",
      minPrice: "",
      maxPrice: "",
      bedrooms: "Any",
      bathrooms: "Any",
      propertyType: "All",
      sortBy: "latest",
    });
  }, []);

  const loadMore = () => setVisibleCount((c) => c + ITEMS_PER_PAGE);

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  /* ── computed: property type counts ────────── */
  const propertyTypeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: properties.length };
    properties.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [properties]);

  /* ── computed: active filter chips ─────────── */
  const activeFilters = useMemo(() => {
    const chips: { label: string; onClear: () => void }[] = [];
    if (searchQuery)
      chips.push({
        label: `"${searchQuery}"`,
        onClear: () => {
          setSearchQuery("");
          setSearchInput("");
        },
      });
    if (status !== "All")
      chips.push({
        label: status === "FOR_SALE" ? "For Sale" : "For Rent",
        onClear: () => updateFilter("status", "All"),
      });
    if (propertyType !== "All")
      chips.push({
        label: propertyType,
        onClear: () => updateFilter("propertyType", "All"),
      });
    if (minPrice)
      chips.push({
        label: `Min $${Number(minPrice).toLocaleString()}`,
        onClear: () => updateFilter("minPrice", ""),
      });
    if (maxPrice)
      chips.push({
        label: `Max $${Number(maxPrice).toLocaleString()}`,
        onClear: () => updateFilter("maxPrice", ""),
      });
    if (bedrooms !== "Any")
      chips.push({
        label: `${bedrooms}+ Beds`,
        onClear: () => updateFilter("bedrooms", "Any"),
      });
    if (bathrooms !== "Any")
      chips.push({
        label: `${bathrooms}+ Baths`,
        onClear: () => updateFilter("bathrooms", "Any"),
      });
    return chips;
  }, [
    searchQuery,
    status,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    updateFilter,
  ]);

  /* ── computed: filtered + sorted ───────────── */
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        !searchQuery ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = status === "All" || property.status === status;
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

    if (sortBy === "price-low")
      return [...filtered].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price),
      );
    if (sortBy === "price-high")
      return [...filtered].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price),
      );
    return [...filtered].sort((a, b) => b.id - a.id);
  }, [
    properties,
    searchQuery,
    status,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    propertyType,
    sortBy,
  ]);

  /* ── computed: result stats ────────────────── */
  const resultStats = useMemo(() => {
    if (filteredProperties.length === 0) return null;
    const prices = filteredProperties.map((p) => parsePrice(p.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    };
  }, [filteredProperties]);

  /* ── computed: pagination ──────────────────── */
  const visibleProperties = useMemo(
    () => filteredProperties.slice(0, visibleCount),
    [filteredProperties, visibleCount],
  );
  const hasMore = visibleCount < filteredProperties.length;

  /* ── computed: is current search saved? ────── */
  const isCurrentSearchSaved = useMemo(() => {
    const c = getCurrentFilters();
    return savedSearches.some((s) => {
      const f = s.filters;
      return (
        f.searchQuery === c.searchQuery &&
        f.status === c.status &&
        f.minPrice === c.minPrice &&
        f.maxPrice === c.maxPrice &&
        f.bedrooms === c.bedrooms &&
        f.bathrooms === c.bathrooms &&
        f.propertyType === c.propertyType &&
        f.sortBy === c.sortBy
      );
    });
  }, [savedSearches, getCurrentFilters]);

  /* ========== LOADING SKELETON ========== */
  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen">
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

  /* ========== MAIN RENDER ========== */
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* global keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`,
        }}
      />

      {/* toast */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white text-sm px-5 py-3 rounded-none shadow-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
          {toast.message}
        </div>
      </div>

      {/* HERO */}
      <SearchHero
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onClear={() => {
          setSearchInput("");
          setSearchQuery("");
        }}
        inputRef={searchInputRef}
      />

      {/* BODY */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
        {/* mobile filter toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white py-5 rounded-none font-medium text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? "Hide filters" : "Show filters"}
          </button>
        </div>

        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <SearchFilters
            filters={filters}
            onUpdateFilter={updateFilter}
            onReset={resetFilters}
            propertyTypeCounts={propertyTypeCounts}
            savedSearches={savedSearches}
            showSavedSearches={showSavedSearches}
            onToggleSavedSearches={() => setShowSavedSearches((v) => !v)}
            onLoadSearch={handleLoadSearch}
            onDeleteSavedSearch={handleDeleteSavedSearch}
            onSaveSearch={handleSaveSearch}
            isCurrentSearchSaved={isCurrentSearchSaved}
            showFilters={showFilters}
            onCloseFilters={() => setShowFilters(false)}
          />

          {/* RESULTS */}
          <SearchResults
            visibleProperties={visibleProperties}
            filteredCount={filteredProperties.length}
            loading={loading}
            error={error}
            onRetry={() => fetchProperties()}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeFilters={activeFilters}
            onClearAllFilters={resetFilters}
            resultStats={resultStats}
            formatPrice={formatPrice}
            animKey={animKey}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onShare={handleShare}
            resultsRef={resultsRef}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Suspense wrapper (uses SlidersHorizontal for mobile toggle) ── */
import { SlidersHorizontal } from "lucide-react";
import {
  Filters,
  SavedSearch,
  SearchFilters,
} from "../components/search/SearchFilters";
import { SearchHero } from "../components/search/SearchHero";
import { SearchResults } from "../components/search/SearchResults";

function Page() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <SearchContent />
    </Suspense>
  );
}

export default Page;
