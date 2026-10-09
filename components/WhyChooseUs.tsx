'use client';

import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';

const reasons = [
  {
    title: 'Curated Selection',
    description:
      'Every property in our portfolio is hand-selected for architectural merit, location, and investment potential.',
  },
  {
    title: 'Market Intelligence',
    description:
      'Deep, data-driven insights into luxury markets ensure you buy and sell at the right time, at the right price.',
  },
  {
    title: 'Discretion & Trust',
    description:
      'We handle every transaction with the utmost confidentiality, protecting your privacy and your interests.',
  },
  {
    title: 'End-to-End Service',
    description:
      'From first viewing to final closing, our team manages every detail so your experience is seamless.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-warmgray-bg">
      <div className="container-px max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>Why Horizon</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-section font-bold text-navy mt-5 mb-6">
                Why Choose Horizon
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-warmgray leading-relaxed mb-8 max-w-md">
                We bring a level of rigour, taste, and personal attention that
                transforms property transactions into lasting relationships.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex items-center gap-8 pt-6 border-t border-navy/10">
                <div>
                  <div className="text-4xl font-bold text-navy">250+</div>
                  <div className="text-sm text-warmgray mt-1">Properties Sold</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-navy">15</div>
                  <div className="text-sm text-warmgray mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-navy">98%</div>
                  <div className="text-sm text-warmgray mt-1">Client Satisfaction</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <div className="space-y-px">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.1}>
                <div className="group flex gap-6 py-8 border-b border-navy/10">
                  <span className="text-2xl font-light text-champagne shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-champagne transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-warmgray leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
