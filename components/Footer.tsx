'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-navy text-parchment">
      <div className="container-px max-w-container mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M2 24L14 4L26 24M6 24V16M22 24V16M10 24V20M18 24V20"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg font-bold tracking-wide text-white">HORIZON</span>
              <span className="text-lg font-light tracking-wide text-champagne">PROPERTIES</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Connecting people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction at the heart of everything we do.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="overline text-champagne mb-5">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="overline text-champagne mb-5">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+15552467890" className="hover:text-white transition-colors">(555) 246-7890</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@horizonproperties.com" className="hover:text-white transition-colors">info@horizonproperties.com</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>1200 Architectural Way, Suite 200<br />Beverly Hills, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="overline text-champagne mb-5">Newsletter</h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe for exclusive listings and market insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter"
                className="bg-transparent border-b border-white/20 px-0 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-champagne focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="self-start text-sm text-champagne hover:text-white transition-colors duration-300 tracking-wide uppercase font-medium"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe →'}
              </button>
            </form>
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 tracking-wide">
            © {new Date().getFullYear()} Horizon Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Instagram', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5zM17.5 6.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z' },
              { label: 'LinkedIn', path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.34a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18.34v-4.3c0-2.3-1.23-3.37-2.87-3.37-1.32 0-1.91.73-2.24 1.24v-1.06H10.6c.04.84 0 7.84 0 7.84h2.63v-4.38c0-.35.03-.7.13-.95.28-.7.92-1.43 2-1.43 1.41 0 1.97.95 1.97 2.35v4.41h2.67z' },
              { label: 'Twitter', path: 'M22 5.8c-.75.33-1.54.55-2.36.65a4.1 4.1 0 0 0 1.8-2.27c-.8.47-1.68.82-2.62 1A4.1 4.1 0 0 0 11.9 9a11.65 11.65 0 0 1-8.46-4.3 4.1 4.1 0 0 0 1.27 5.48 4.1 4.1 0 0 1-1.86-.5v.05a4.1 4.1 0 0 0 3.3 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67l-.01-.53A8.3 8.3 0 0 0 22 5.8z' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-champagne hover:text-champagne text-white/60 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
