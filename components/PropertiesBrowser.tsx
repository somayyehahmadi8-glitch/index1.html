'use client';

import { useState, useMemo } from 'react';
import { properties, propertyTypes, locations, priceRanges, Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import Reveal from '@/components/ui/Reveal';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'beds-desc';

export default function PropertiesBrowser() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let result: Property[] = properties.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q)
        )
          return false;
      }
      if (location !== 'All' && p.state !== location) return false;
      if (type !== 'All' && p.type !== type) return false;
      const range = priceRanges[priceRange];
      if (p.price < range.min || p.price >= range.max) return false;
      if (beds > 0 && p.beds < beds) return false;
      if (baths > 0 && p.baths < baths) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'beds-desc':
        result = [...result].sort((a, b) => b.beds - a.beds);
        break;
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, location, type, priceRange, beds, baths, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setLocation('All');
    setType('All');
    setPriceRange(0);
    setBeds(0);
    setBaths(0);
    setSortBy('featured');
  };

  const selectClass =
    'bg-parchment border border-navy/15 px-4 py-3 text-sm text-navy focus:border-champagne focus:outline-none transition-colors appearance-none cursor-pointer';

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-parchment border border-navy/10 rounded-2xl p-5 lg:p-6 mb-10 shadow-sm">
        {/* Search */}
        <div className="relative mb-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A5568"
            strokeWidth="1.5"
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, city, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm text-navy bg-warmgray-bg border border-navy/10 focus:border-champagne focus:outline-none transition-colors"
            aria-label="Search properties"
          />
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={selectClass}
            aria-label="Filter by location"
          >
            <option value="All">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={selectClass}
            aria-label="Filter by property type"
          >
            <option value="All">All Types</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className={selectClass}
            aria-label="Filter by price range"
          >
            {priceRanges.map((r, i) => (
              <option key={i} value={i}>{r.label}</option>
            ))}
          </select>

          <select
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value))}
            className={selectClass}
            aria-label="Filter by bedrooms"
          >
            <option value={0}>Any Beds</option>
            <option value={3}>3+ Beds</option>
            <option value={4}>4+ Beds</option>
            <option value={5}>5+ Beds</option>
            <option value={6}>6+ Beds</option>
          </select>

          <select
            value={baths}
            onChange={(e) => setBaths(Number(e.target.value))}
            className={selectClass}
            aria-label="Filter by bathrooms"
          >
            <option value={0}>Any Baths</option>
            <option value={3}>3+ Baths</option>
            <option value={4}>4+ Baths</option>
            <option value={5}>5+ Baths</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className={selectClass}
            aria-label="Sort properties"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="beds-desc">Most Bedrooms</option>
          </select>
        </div>

        {/* Results count + reset */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy/10">
          <p className="text-sm text-warmgray">
            <span className="font-semibold text-navy">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'} found
          </p>
          <button
            onClick={resetFilters}
            className="text-sm text-champagne hover:text-navy transition-colors duration-300 flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((property, i) => (
            <Reveal key={property.id} delay={i * 0.05}>
              <div className="w-full">
                <PropertyCard property={property} variant="compact" />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-warmgray mb-4">No properties match your filters.</p>
          <button
            onClick={resetFilters}
            className="text-champagne hover:text-navy transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
