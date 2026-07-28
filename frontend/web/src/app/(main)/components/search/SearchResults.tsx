import React from "react";
import { Search, Share2, LayoutGrid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyCardTwo from "../searchPropertyCard";

/* types  */

interface ActiveFilter {
  label: string;
  onClear: () => void;
}

interface ResultStats {
  min: number;
  max: number;
  avg: number;
}

interface SearchResultsProps {
  visibleProperties: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  filteredCount: number;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  activeFilters: ActiveFilter[];
  onClearAllFilters: () => void;
  resultStats: ResultStats | null;
  formatPrice: (price: number) => string;
  animKey: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onShare: () => void;
  resultsRef: React.RefObject<HTMLDivElement | null>;
}

/* component  */

export const SearchResults: React.FC<SearchResultsProps> = ({
  visibleProperties,
  filteredCount,
  loading,
  error,
  onRetry,
  viewMode,
  onViewModeChange,
  activeFilters,
  onClearAllFilters,
  resultStats,
  formatPrice,
  animKey,
  hasMore,
  onLoadMore,
  onShare,
  resultsRef,
}) => {
  const gridCls =
    viewMode === "grid"
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-2"
      : "grid-cols-1";

  return (
    <main className="w-full" ref={resultsRef}>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-none text-red-700 text-sm">
          {error}
          <button onClick={onRetry} className="ml-4 underline font-medium">
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
            {filteredCount} {filteredCount === 1 ? "property" : "properties"} found
          </h2>
          {resultStats && (
            <p className="text-gray-400 text-xs mt-2 tracking-wide">
              <span>
                Price range: {formatPrice(resultStats.min)} – {formatPrice(resultStats.max)}
              </span>
              <span className="mx-2 text-gray-200">·</span>
              <span>Avg: {formatPrice(resultStats.avg)}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs border border-gray-200 rounded-none px-3 py-2 transition-colors"
            aria-label="Share this search"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-none p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`p-2 rounded-none transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`p-2 rounded-none transition-colors ${
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
            onClick={onClearAllFilters}
            className="text-secondary text-xs font-medium hover:underline px-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* loading */}
      {loading ? (
        <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${gridCls}`}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-80 sm:h-96 w-full rounded-none" />
          ))}
        </div>
      ) : filteredCount === 0 ? (
        /* empty */
        <div className="text-center py-16 sm:py-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-300 w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-light text-gray-900 mb-3">
              No properties found
            </h3>
            <p className="text-gray-500 text-base mb-6 font-light">
              Try adjusting your search filters to find more properties.
            </p>
            <Button
              onClick={onClearAllFilters}
              className="bg-primary hover:bg-primary-dark text-white px-8 rounded-none"
            >
              Clear all filters
            </Button>
          </div>
        </div>
      ) : (
        /* results grid */
        <>
          <div
            key={animKey}
            className={`grid gap-4 sm:gap-6 lg:gap-8 ${gridCls}`}
          >
            {visibleProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <PropertyCardTwo property={property} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 sm:mt-10 text-center">
              <Button
                onClick={onLoadMore}
                variant="outline"
                className="text-sm px-8 py-5 rounded-none text-white"
              >
                Load more properties
                <span className="text-gray-400 ml-2 normal-case">
                  ({filteredCount - visibleProperties.length} remaining)
                </span>
              </Button>
            </div>
          )}

          {!hasMore && filteredCount > 6 && (
            <p className="text-center text-gray-400 text-xs mt-8 tracking-wide">
              Showing all {filteredCount} properties
            </p>
          )}
        </>
      )}
    </main>
  );
};