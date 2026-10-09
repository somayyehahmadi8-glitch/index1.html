'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';

export default function About() {
  return (
    <section id="about" className="section-pad bg-parchment">
      <div className="container-px max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div>
            <Reveal>
              <SectionLabel>About Us</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-section font-bold text-navy mt-5 mb-6">
                Who We Are
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-warmgray leading-relaxed mb-8 max-w-lg">
                At Horizon Properties, we connect people with extraordinary homes
                and smart investments. Integrity, transparency, and client
                satisfaction are at the heart of everything we do.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="/#services"
                className="inline-flex items-center gap-2 bg-navy text-parchment px-7 py-3.5 text-sm font-medium uppercase tracking-wider hover:bg-navy-600 transition-all duration-300 group"
              >
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: asymmetric image composition */}
          <Reveal delay={0.15} className="relative">
            <div className="relative grid grid-cols-5 gap-4 h-[460px] md:h-[540px]">
              {/* Main image */}
              <div className="col-span-3 relative overflow-hidden rounded-2xl group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop"
                  alt="Luxury modern home with pool"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Secondary image */}
              <div className="col-span-2 relative overflow-hidden rounded-2xl mt-12 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&q=80&auto=format&fit=crop"
                  alt="Modern architectural interior"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Circular arrow button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-navy text-champagne flex items-center justify-center shadow-xl hover:bg-champagne hover:text-navy transition-colors duration-300 z-10"
                aria-label="Explore more about Horizon Properties"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
