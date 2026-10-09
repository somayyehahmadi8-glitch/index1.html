'use client';

import Reveal from '@/components/ui/Reveal';

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-warmgray-bg">
      <div className="container-px max-w-container mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left: icon + text */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Circular key icon */}
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-navy flex items-center justify-center shrink-0">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
                  <circle cx="8" cy="15" r="5" />
                  <path d="M11.5 12.5L20 4M18 2l2 2M16 4l2 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="text-warmgray text-lg">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>
            </div>

            {/* Right: button */}
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-navy text-parchment px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-champagne hover:text-navy transition-all duration-300 whitespace-nowrap group"
            >
              Get in Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
