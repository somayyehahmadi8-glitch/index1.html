'use client';

import { services } from '@/data/services';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';

export default function Services() {
  return (
    <section id="services" className="section-pad bg-parchment">
      <div className="container-px max-w-container mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>Services</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-navy mt-5">
              What We Offer
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <div className="group bg-parchment p-8 lg:p-10 h-full hover:bg-navy transition-all duration-500 cursor-pointer">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-light text-champagne/40 group-hover:text-champagne/60 transition-colors duration-500">
                    {service.number}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-navy/30 group-hover:text-champagne group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy group-hover:text-white transition-colors duration-500 mb-3">
                  {service.title}
                </h3>
                <p className="text-warmgray leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
