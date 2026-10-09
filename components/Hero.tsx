'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2000&q=85&auto=format&fit=crop"
          alt="Modern luxury villa with glass walls and infinity pool at dusk"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/20 to-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center container-px max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-champagne" />
          <span className="overline text-champagne">Horizon Properties</span>
          <span className="h-px w-8 bg-champagne" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-hero font-bold text-white text-balance max-w-4xl"
        >
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
        >
          Premium properties in prime locations. Find your dream home
          or the perfect investment with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/properties"
            className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-champagne hover:text-navy transition-all duration-300"
          >
            Browse Properties
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
