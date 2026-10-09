'use client';

import { useRef, useState, useCallback } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';

export default function FeaturedProperties() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.42;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setHasDragged(false);
    dragStart.current = {
      x: e.pageX,
      scrollLeft: container.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 5) setHasDragged(true);
    container.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="section-pad bg-warmgray-bg">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 container-px">
          <div>
            <Reveal>
              <SectionLabel>Featured</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-section font-bold text-navy mt-5">
                Featured Properties
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-navy/20 text-navy flex items-center justify-center hover:border-champagne hover:text-champagne transition-all duration-300"
                aria-label="Previous properties"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-navy/20 text-navy flex items-center justify-center hover:border-champagne hover:text-champagne transition-all duration-300"
                aria-label="Next properties"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto carousel-scroll snap-x snap-mandatory pb-4 pl-6 sm:pl-8 lg:pl-12 xl:pl-16 pr-6 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollPaddingLeft: '1rem' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="snap-start"
            style={{ pointerEvents: hasDragged ? 'none' : 'auto' }}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="max-w-container mx-auto mt-12 text-center container-px">
        <Reveal>
          <a
            href="/properties"
            className="inline-flex items-center gap-2 text-navy hover:text-champagne transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
          >
            View All Properties
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
