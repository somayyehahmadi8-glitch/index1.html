'use client';

import { team } from '@/data/team';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';

export default function Team() {
  return (
    <section id="team" className="section-pad bg-parchment">
      <div className="container-px max-w-container mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>Our Team</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-navy mt-5">
              Meet the Professionals
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.1}>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-navy-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Social links on hover */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy hover:bg-champagne transition-colors duration-300"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        aria-label={`Call ${member.name}`}
                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy hover:bg-champagne transition-colors duration-300"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm text-champagne mt-1 tracking-wide">{member.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
