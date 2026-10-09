'use client';

import Link from 'next/link';
import { Property } from '@/data/properties';
import { formatPrice } from '@/lib/utils';
import { useFavorites } from '@/lib/useFavorites';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact';
}

export default function PropertyCard({
  property,
  variant = 'default',
}: PropertyCardProps) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(property.id);

  return (
    <article
      className={
        variant === 'compact'
          ? 'group flex-shrink-0 w-[300px] sm:w-[340px]'
          : 'group flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px]'
      }
    >
      <Link href={`/properties/${property.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-navy-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.images[0]}
            alt={`${property.title} in ${property.location}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(property.id);
            }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={fav ? '#C5A059' : 'none'}
              stroke={fav ? '#C5A059' : '#0A192F'}
              strokeWidth="1.5"
              className="transition-all duration-300"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Price tag */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-champagne text-navy px-4 py-2 text-sm font-semibold tracking-wide">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-navy/70 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider">
              {property.type}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-navy group-hover:text-champagne transition-colors duration-300">
            {property.title}
          </h3>
          <p className="text-sm text-warmgray mt-1.5 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.location}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-5 mt-4 text-sm text-warmgray">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4v3M2 20h20M4 7v13M20 7v13M6 11h8M6 15h8" />
              </svg>
              {property.beds} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0L3.5 4.38a1.5 1.5 0 0 0 0 2.12L6 9.5M9 6l11 11-3 3L6 9.5M9 6l3 3M6 9.5l3 3" />
              </svg>
              {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
