"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  Suspense,
  useCallback,
  useRef,
} from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Share2,
  BookmarkPlus,
  BookmarkCheck,
  ChevronDown,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import PropertyCardTwo from "../components/searchPropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;
const DEBOUNCE_MS = 300;
const STORAGE_KEY = "savedPropertySearches";

interface SavedSearch {
  id: string;
  name: string;
  timestamp: number;
  filters: {
    searchQuery: string;
    status: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    propertyType: string;
    sortBy: string;
  };
}

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

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { properties, loading, error, fetchProperties } = useProperties();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [propertyType, setPropertyType] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  }>({ message: "", visible: false });
  const [animKey, setAnimKey] = useState(0);

  /* ---------- localStorage: saved searches ---------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedSearches(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---------- init from URL params ---------- */
  useEffect(() => {
    setMounted(true);
    const q = searchParams.get("search") || "";
    setSearchQuery(q);
    setSearchInput(q);
    setStatus(searchParams.get("status") || "All");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setBedrooms(searchParams.get("bedrooms") || "Any");
    setBathrooms(searchParams.get("bathrooms") || "Any");
    setPropertyType(searchParams.get("type") || "All");
    setSortBy(searchParams.get("sort") || "latest");
  }, [searchParams]);

  /* ---------- debounced search ---------- */
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ---------- reset page & trigger animation on filter change ---------- */
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

  /* ---------- keyboard shortcut: / to focus search ---------- */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(tag)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* ---------- fetch on mount ---------- */
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  /* ---------- helpers ---------- */
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
      status,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      propertyType,
      sortBy,
    }),
    [searchQuery, status, minPrice, maxPrice, bedrooms, bathrooms, propertyType, sortBy],
  );

  /* ---------- share ---------- */
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

  /* ---------- save / load / delete ---------- */
  const handleSaveSearch = useCallback(() => {
    const filters = getCurrentFilters();
    const next: SavedSearch = {
      id: Date.now().toString(),
      name: generateSearchName(filters),
      timestamp: Date.now(),
      filters,
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
    setStatus(f.status);
    setMinPrice(f.minPrice);
    setMaxPrice(f.maxPrice);
    setBedrooms(f.bedrooms);
    setBathrooms(f.bathrooms);
    setPropertyType(f.propertyType);
    setSortBy(f.sortBy);
    setShowSavedSearches(false);
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

  /* ---------- reset ---------- */
  const resetFilters = () => {
    setSearchQuery("");
    setSearchInput("");
    setStatus("All");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("Any");
    setBathrooms("Any");
    setPropertyType("All");
    setSortBy("latest");
  };

  const loadMore = () => setVisibleCount((c) => c + ITEMS_PER_PAGE);

  /* ---------- property type counts ---------- */
  const propertyTypeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: properties.length };
    properties.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [properties]);

  /* ---------- active filter chips ---------- */
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
        onClear: () => setStatus("All"),
      });
    if (propertyType !== "All")
      chips.push({
        label: propertyType,
        onClear: () => setPropertyType("All"),
      });
    if (minPrice)
      chips.push({
        label: `Min $${Number(minPrice).toLocaleString()}`,
        onClear: () => setMinPrice(""),
      });
    if (maxPrice)
      chips.push({
        label: `Max $${Number(maxPrice).toLocaleString()}`,
        onClear: () => setMaxPrice(""),
      });
    if (bedrooms !== "Any")
      chips.push({
        label: `${bedrooms}+ Beds`,
        onClear: () => setBedrooms("Any"),
      });
    if (bathrooms !== "Any")
      chips.push({
        label: `${bathrooms}+ Baths`,
        onClear: () => setBathrooms("Any"),
      });
    return chips;
  }, [searchQuery, status, propertyType, minPrice, maxPrice, bedrooms, bathrooms]);

  /* ---------- filtered + sorted ---------- */
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        !searchQuery ||
        property.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        property.location
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesStatus =
        status === "All" || property.status === status;
      const propertyPrice = parsePrice(property.price);
      const matchesMin =
        !minPrice || propertyPrice >= Number(minPrice);
      const matchesMax =
        !maxPrice || propertyPrice <= Number(maxPrice);
      const matchesBedrooms =
        bedrooms === "Any" ||
        property.bedrooms >= Number(bedrooms);
      const matchesBathrooms =
        bathrooms === "Any" ||
        property.bathrooms >= Number(bathrooms);
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

  /* ---------- result statistics ---------- */
  const resultStats = useMemo(() => {
    if (filteredProperties.length === 0) return null;
    const prices = filteredProperties.map((p) => parsePrice(p.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(
        prices.reduce((a, b) => a + b, 0) / prices.length,
      ),
    };
  }, [filteredProperties]);

  /* ---------- pagination ---------- */
  const visibleProperties = useMemo(
    () => filteredProperties.slice(0, visibleCount),
    [filteredProperties, visibleCount],
  );
  const hasMore = visibleCount < filteredProperties.length;

  /* ---------- is current filter combo already saved? ---------- */
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
      {/* ── global keyframes ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`,
        }}
      />

      {/* ── toast ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white text-sm px-5 py-3 rounded-sm shadow-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
          {toast.message}
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-primary-dark pt-24 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-secondary" />
            <span className="text-secondary text-xs tracking-[0.18em] uppercase">
              Advanced property search
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white mb-6">
            Find your ideal property
          </h1>

          <div className="relative max-w-3xl">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by name or location..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-sm bg-white/10 border border-white/10 text-white placeholder:text-white/40 pl-12 sm:pl-14 pr-20 sm:pr-24 py-3.5 sm:py-4 outline-none focus:border-secondary text-base"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-white/30 border border-white/10 rounded-sm font-mono">
                /
              </kbd>
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                  className="text-white/40 hover:text-white/70 transition-colors p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BODY ═══════════ */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white py-5 rounded-sm"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? "Hide filters" : "Show filters"}
          </Button>
        </div>

        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[280px_1fr]">
          {/* ═══════════ SIDEBAR ═══════════ */}
          <aside
            className={`relative bg-white rounded-sm p-5 sm:p-6 shadow-sm h-fit ${
              showFilters ? "block" : "hidden lg:block"
            } lg:sticky lg:top-28`}
          >
            <span className="pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-secondary hidden lg:block" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="text-secondary w-4 h-4" />
                <h2 className="font-serif text-xl sm:text-2xl font-light text-gray-900">
                  Filters
                </h2>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-400 hover:text-gray-700"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {/* ── saved searches ── */}
              {savedSearches.length > 0 && (
                <div className="border-b border-gray-100 pb-5">
                  <button
                    onClick={() =>
                      setShowSavedSearches(!showSavedSearches)
                    }
                    className="flex items-center justify-between w-full text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    <span className="flex items-center gap-2">
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      Saved searches
                      <span className="text-gray-400 normal-case tracking-normal">
                        ({savedSearches.length})
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showSavedSearches ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSavedSearches && (
                    <div className="mt-3 space-y-1.5">
                      {savedSearches.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => handleLoadSearch(s)}
                          className="group flex items-start justify-between gap-2 p-2.5 rounded-sm hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-sm text-gray-700 truncate">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {new Date(
                                s.timestamp,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) =>
                              handleDeleteSavedSearch(s.id, e)
                            }
                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all shrink-0 mt-0.5"
                            aria-label="Delete saved search"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── property status ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Property status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="All">All properties</option>
                  <option value="FOR_SALE">For sale</option>
                  <option value="FOR_RENT">For rent</option>
                </select>
              </div>

              {/* ── property type (with counts) ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Property type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="All">
                    All types ({propertyTypeCounts.All || 0})
                  </option>
                  <option value="HOUSE">
                    House ({propertyTypeCounts.HOUSE || 0})
                  </option>
                  <option value="CONDO">
                    Condo ({propertyTypeCounts.CONDO || 0})
                  </option>
                  <option value="APARTMENT">
                    Apartment ({propertyTypeCounts.APARTMENT || 0})
                  </option>
                </select>
              </div>

              {/* ── price range ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Price range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* ── bedrooms ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="Any">Any</option>
                  <option value="1">1+ bedrooms</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                </select>
              </div>

              {/* ── bathrooms ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Bathrooms
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="Any">Any</option>
                  <option value="1">1+ bathrooms</option>
                  <option value="2">2+ bathrooms</option>
                  <option value="3">3+ bathrooms</option>
                  <option value="4">4+ bathrooms</option>
                </select>
              </div>

              {/* ── sort ── */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="latest">Latest listings</option>
                  <option value="price-low">
                    Price: low to high
                  </option>
                  <option value="price-high">
                    Price: high to low
                  </option>
                </select>
              </div>

              {/* ── actions ── */}
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="flex-1 text-sm rounded-sm"
                >
                  Reset
                </Button>
                <Button
                  onClick={handleSaveSearch}
                  variant="outline"
                  className="flex-1 text-sm rounded-sm"
                  disabled={isCurrentSearchSaved}
                >
                  {isCurrentSearchSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                      Saved
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5 mr-1.5" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          </aside>

          {/* ═══════════ RESULTS ═══════════ */}
          <main className="w-full" ref={resultsRef}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-sm text-red-700 text-sm">
                {error}
                <button
                  onClick={() => fetchProperties()}
                  className="ml-4 underline font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {/* header row */}
            <div className="mb-6 sm:mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-secondary text-xs tracking-[0.18em] uppercase mb-2">
                  Search results
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900">
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1
                    ? "property"
                    : "properties"}{" "}
                  found
                </h2>
                {resultStats && (
                  <p className="text-gray-400 text-xs mt-2 tracking-wide">
                    <span>
                      Price range: {formatPrice(resultStats.min)} –{" "}
                      {formatPrice(resultStats.max)}
                    </span>
                    <span className="mx-2 text-gray-200">·</span>
                    <span>Avg: {formatPrice(resultStats.avg)}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs border border-gray-200 rounded-sm px-3 py-2 transition-colors"
                  aria-label="Share this search"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {/* view toggle */}
                <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                    className={`p-2 rounded-sm transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                    className={`p-2 rounded-sm transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* active filter chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {activeFilters.map((chip, i) => (
                  <button
                    key={i}
                    onClick={chip.onClear}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-300 transition-colors"
                  >
                    {chip.label}
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-secondary text-xs font-medium hover:underline px-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* ── loading ── */}
            {loading ? (
              <div
                className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-80 sm:h-96 w-full rounded-sm"
                  />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              /* ── empty ── */
              <div className="text-center py-16 sm:py-20 px-4">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-300 w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-light text-gray-900 mb-3">
                    No properties found
                  </h3>
                  <p className="text-gray-500 text-base mb-6 font-light">
                    Try adjusting your search filters to find more
                    properties.
                  </p>
                  <Button
                    onClick={resetFilters}
                    className="bg-primary hover:bg-primary-dark text-white px-8 rounded-sm"
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            ) : (
              /* ── results grid ── */
              <>
                <div
                  key={animKey}
                  className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {visibleProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 60}ms`,
                      }}
                    >
                      <PropertyCardTwo property={property} />
                    </div>
                  ))}
                </div>

                {/* load more */}
                {hasMore && (
                  <div className="mt-8 sm:mt-10 text-center">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      className="text-sm px-8 py-5 rounded-sm"
                    >
                      Load more properties
                      <span className="text-gray-400 ml-2 normal-case">
                        (
                        {filteredProperties.length - visibleCount}{" "}
                        remaining)
                      </span>
                    </Button>
                  </div>
                )}

                {!hasMore &&
                  filteredProperties.length > ITEMS_PER_PAGE && (
                    <p className="text-center text-gray-400 text-xs mt-8 tracking-wide">
                      Showing all{" "}
                      {filteredProperties.length} properties
                    </p>
                  )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

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