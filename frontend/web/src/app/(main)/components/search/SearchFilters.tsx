import React from "react";
import {
  SlidersHorizontal,
  X,
  BookmarkPlus,
  BookmarkCheck,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* types (exported for the orchestrator)  */

export interface Filters {
  status: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  sortBy: string;
}

export interface SavedSearchFilters extends Filters {
  searchQuery: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  timestamp: number;
  filters: SavedSearchFilters;
}

/* props  */

interface SearchFiltersProps {
  filters: Filters;
  onUpdateFilter: (key: keyof Filters, value: string) => void;
  onReset: () => void;
  propertyTypeCounts: Record<string, number>;
  savedSearches: SavedSearch[];
  showSavedSearches: boolean;
  onToggleSavedSearches: () => void;
  onLoadSearch: (search: SavedSearch) => void;
  onDeleteSavedSearch: (id: string, e: React.MouseEvent) => void;
  onSaveSearch: () => void;
  isCurrentSearchSaved: boolean;
  showFilters: boolean;
  onCloseFilters: () => void;
}

/* select styling */

const selectCls =
  "w-full rounded-none border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

/* component  */

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onUpdateFilter,
  onReset,
  propertyTypeCounts,
  savedSearches,
  showSavedSearches,
  onToggleSavedSearches,
  onLoadSearch,
  onDeleteSavedSearch,
  onSaveSearch,
  isCurrentSearchSaved,
  showFilters,
  onCloseFilters,
}) => (
  <aside
    className={`relative bg-white rounded-none p-5 sm:p-6 shadow-sm h-fit ${
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
        onClick={onCloseFilters}
        className="lg:hidden text-gray-400 hover:text-gray-700"
        aria-label="Close filters"
      >
        <X className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-5">
      {/* saved searches */}
      {savedSearches.length > 0 && (
        <div className="border-b border-gray-100 pb-5">
          <button
            onClick={onToggleSavedSearches}
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
                  onClick={() => onLoadSearch(s)}
                  className="group flex items-start justify-between gap-2 p-2.5 rounded-none hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 truncate">{s.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {new Date(s.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => onDeleteSavedSearch(s.id, e)}
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

      {/* property status */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Property status
        </label>
        <select
          value={filters.status}
          onChange={(e) => onUpdateFilter("status", e.target.value)}
          className={selectCls}
        >
          <option value="All">All properties</option>
          <option value="FOR_SALE">For sale</option>
          <option value="FOR_RENT">For rent</option>
        </select>
      </div>

      {/* property type */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Property type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => onUpdateFilter("propertyType", e.target.value)}
          className={selectCls}
        >
          <option value="All">All types ({propertyTypeCounts.All || 0})</option>
          <option value="HOUSE">House ({propertyTypeCounts.HOUSE || 0})</option>
          <option value="CONDO">Condo ({propertyTypeCounts.CONDO || 0})</option>
          <option value="APARTMENT">Apartment ({propertyTypeCounts.APARTMENT || 0})</option>
        </select>
      </div>

      {/* price range */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Price range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onUpdateFilter("minPrice", e.target.value)}
            className={selectCls}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onUpdateFilter("maxPrice", e.target.value)}
            className={selectCls}
          />
        </div>
      </div>

      {/* bedrooms */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Bedrooms
        </label>
        <select
          value={filters.bedrooms}
          onChange={(e) => onUpdateFilter("bedrooms", e.target.value)}
          className={selectCls}
        >
          <option value="Any">Any</option>
          <option value="1">1+ bedrooms</option>
          <option value="2">2+ bedrooms</option>
          <option value="3">3+ bedrooms</option>
          <option value="4">4+ bedrooms</option>
        </select>
      </div>

      {/* bathrooms */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Bathrooms
        </label>
        <select
          value={filters.bathrooms}
          onChange={(e) => onUpdateFilter("bathrooms", e.target.value)}
          className={selectCls}
        >
          <option value="Any">Any</option>
          <option value="1">1+ bathrooms</option>
          <option value="2">2+ bathrooms</option>
          <option value="3">3+ bathrooms</option>
          <option value="4">4+ bathrooms</option>
        </select>
      </div>

      {/* sort */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Sort by
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onUpdateFilter("sortBy", e.target.value)}
          className={selectCls}
        >
          <option value="latest">Latest listings</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-1">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 text-sm rounded-none text-white py-4!"
        >
          Reset
        </Button>
        <Button
          onClick={onSaveSearch}
          variant="outline"
          className="flex-1 text-sm rounded-none text-white py-4!"
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
);