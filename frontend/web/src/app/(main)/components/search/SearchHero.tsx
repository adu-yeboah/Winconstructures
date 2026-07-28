import { Search, X } from "lucide-react";
import React from "react";

interface SearchHeroProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchInput,
  onSearchChange,
  onClear,
  inputRef,
}) => (
  <section className="relative bg-primary-dark pt-24 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden">
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
          ref={inputRef}
          type="text"
          placeholder="Search by name or location..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-none bg-white/10 border border-white/10 text-white placeholder:text-white/40 pl-12 sm:pl-14 pr-20 sm:pr-24 py-3.5 sm:py-4 outline-none focus:border-secondary text-base"
        />
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-white/30 border border-white/10 rounded-none font-mono">
            /
          </kbd>
          {searchInput && (
            <button
              onClick={onClear}
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
);