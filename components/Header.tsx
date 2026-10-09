'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Horizon Properties home">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="transition-transform duration-500 group-hover:scale-110"
      >
        <path
          d="M2 24L14 4L26 24M6 24V16M22 24V16M10 24V20M18 24V20"
          stroke="#C5A059"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          'text-lg font-bold tracking-wide transition-colors duration-300',
          light ? 'text-white' : 'text-navy'
        )}
      >
        HORIZON
      </span>
      <span
        className={cn(
          'text-lg font-light tracking-wide transition-colors duration-300',
          light ? 'text-champagne' : 'text-champagne'
        )}
      >
        PROPERTIES
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const transparent = isHome && !scrolled;
  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : href.startsWith('/#')
        ? false
        : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          transparent
            ? 'bg-transparent py-5'
            : 'bg-parchment/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,25,47,0.06)] py-3'
        )}
      >
        <div className="container-px max-w-container mx-auto flex items-center justify-between">
          <Logo light={transparent} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-300 link-underline',
                  transparent
                    ? isActive(link.href)
                      ? 'text-champagne'
                      : 'text-white/90 hover:text-white'
                    : isActive(link.href)
                      ? 'text-champagne'
                      : 'text-navy/80 hover:text-navy'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone button (desktop) */}
          <a
            href="tel:+15552467890"
            className={cn(
              'hidden lg:inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300',
              transparent
                ? 'border-white/40 text-white hover:bg-white hover:text-navy'
                : 'border-navy/25 text-navy hover:border-champagne hover:text-champagne'
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (555) 246-7890
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className={cn('block h-px w-6 transition-all duration-300', transparent ? 'bg-white' : 'bg-navy')} />
            <span className={cn('block h-px w-6 transition-all duration-300', transparent ? 'bg-white' : 'bg-navy')} />
            <span className={cn('block h-px w-4 transition-all duration-300', transparent ? 'bg-white' : 'bg-navy')} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy lg:hidden flex flex-col"
          >
            <div className="container-px flex items-center justify-between py-5">
              <Logo light />
              <button
                className="p-2 -mr-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block text-3xl font-light text-white/90 hover:text-champagne transition-colors duration-300 py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-px pb-12">
              <a
                href="tel:+15552467890"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm tracking-wide hover:bg-white hover:text-navy transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                (555) 246-7890
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
