'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/data/properties';
import { formatPrice } from '@/lib/utils';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyCard from '@/components/PropertyCard';
import Reveal from '@/components/ui/Reveal';
import { useFavorites } from '@/lib/useFavorites';

interface PropertyDetailProps {
  property: Property;
  similar: Property[];
}

export default function PropertyDetail({ property, similar }: PropertyDetailProps) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(property.id);
  const [showSchedule, setShowSchedule] = useState(false);

  const specs = [
    { label: 'Type', value: property.type },
    { label: 'Bedrooms', value: String(property.beds) },
    { label: 'Bathrooms', value: String(property.baths) },
    { label: 'Square Feet', value: property.sqft.toLocaleString() },
    { label: 'Lot Size', value: property.lotSize },
    { label: 'Year Built', value: String(property.yearBuilt) },
    { label: 'Garage', value: String(property.garage) },
    { label: 'Location', value: property.city },
  ];

  return (
    <div className="pt-28 pb-20 bg-parchment">
      <div className="container-px max-w-container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-champagne transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-navy">{property.title}</span>
        </nav>

        {/* Title + price row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy">{property.title}</h1>
            <p className="text-warmgray mt-2 flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {property.location}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-champagne">
              {formatPrice(property.price)}
            </span>
            <button
              onClick={() => toggle(property.id)}
              className="w-12 h-12 rounded-full border border-navy/15 flex items-center justify-center hover:border-champagne transition-all duration-300"
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={fav ? '#C5A059' : 'none'}
                stroke={fav ? '#C5A059' : '#0A192F'}
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Left: details */}
          <div className="lg:col-span-2">
            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-navy/10 rounded-2xl overflow-hidden mb-10">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-parchment p-5 text-center">
                  <div className="text-xs uppercase tracking-wider text-warmgray mb-1">{spec.label}</div>
                  <div className="text-lg font-semibold text-navy">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 className="text-2xl font-bold text-navy mb-4">About This Property</h2>
            <p className="text-warmgray leading-relaxed mb-10">{property.description}</p>

            {/* Key features */}
            <h3 className="text-xl font-semibold text-navy mb-5">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
              {property.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <span className="w-6 h-6 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-warmgray">{feature}</span>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <h3 className="text-xl font-semibold text-navy mb-5">Amenities</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="border border-navy/15 px-4 py-2 text-sm text-navy hover:border-champagne hover:text-champagne transition-colors duration-300"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Right: agent card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-navy rounded-2xl p-6 lg:p-8 text-parchment">
              <h3 className="overline text-champagne mb-5">Your Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">{property.agent.name}</div>
                  <div className="text-sm text-champagne">{property.agent.role}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {property.agent.email}
                </a>
              </div>

              <button
                onClick={() => setShowSchedule(true)}
                className="w-full bg-champagne text-navy py-3.5 text-sm font-medium uppercase tracking-wider hover:bg-champagne-light transition-colors duration-300 mb-3"
              >
                Schedule a Viewing
              </button>
              <a
                href={`tel:${property.agent.phone}`}
                className="w-full border border-white/30 text-white py-3.5 text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
              >
                Contact Agent
              </a>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">Similar Properties</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <div className="w-full">
                    <PropertyCard property={p} variant="compact" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-parchment border-t border-navy/10 p-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-warmgray uppercase tracking-wider">Price</div>
          <div className="text-lg font-bold text-navy">{formatPrice(property.price)}</div>
        </div>
        <button
          onClick={() => setShowSchedule(true)}
          className="flex-1 bg-navy text-parchment py-3 text-sm font-medium uppercase tracking-wider"
        >
          Schedule Viewing
        </button>
      </div>

      {/* Schedule modal */}
      <AnimatePresence>
        {showSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSchedule(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-parchment rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-navy">Schedule a Viewing</h3>
                <button onClick={() => setShowSchedule(false)} aria-label="Close" className="p-1 text-warmgray hover:text-navy transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-warmgray text-sm mb-6">
                Book a private viewing of <span className="font-semibold text-navy">{property.title}</span> with {property.agent.name}.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); setShowSchedule(false); }} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 text-sm text-navy bg-warmgray-bg border border-navy/10 focus:border-champagne focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 text-sm text-navy bg-warmgray-bg border border-navy/10 focus:border-champagne focus:outline-none transition-colors"
                />
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 text-sm text-navy bg-warmgray-bg border border-navy/10 focus:border-champagne focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  className="w-full px-4 py-3 text-sm text-navy bg-warmgray-bg border border-navy/10 focus:border-champagne focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-navy text-parchment py-3.5 text-sm font-medium uppercase tracking-wider hover:bg-navy-600 transition-colors duration-300"
                >
                  Request Viewing
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
