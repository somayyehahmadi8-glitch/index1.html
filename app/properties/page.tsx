import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import PropertiesBrowser from '@/components/PropertiesBrowser';

export const metadata: Metadata = {
  title: 'Properties — Horizon Properties',
  description: 'Browse our curated collection of premium properties and luxury homes.',
};

export default function PropertiesPage() {
  return (
    <div className="pt-32 pb-20 bg-warmgray-bg min-h-screen">
      <div className="container-px max-w-container mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>Our Portfolio</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-section font-bold text-navy mt-5">
              Explore Properties
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-warmgray mt-4 max-w-xl mx-auto">
              Browse our curated collection of exceptional homes and investment
              opportunities in prime locations.
            </p>
          </Reveal>
        </div>

        <PropertiesBrowser />
      </div>
    </div>
  );
}
