export interface Service {
  id: string;
  title: string;
  description: string;
  number: string;
}

export const services: Service[] = [
  {
    id: 'luxury-home-sales',
    title: 'Luxury Home Sales',
    description:
      'Curated marketing and sales of distinguished residences, connecting discerning buyers with exceptional properties.',
    number: '01',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    description:
      'Strategic investment guidance backed by deep market intelligence, helping you build a resilient real estate portfolio.',
    number: '02',
  },
  {
    id: 'property-marketing',
    title: 'Property Marketing',
    description:
      'Editorial-grade visual storytelling and targeted campaigns that position your property above the competition.',
    number: '03',
  },
  {
    id: 'real-estate-advisory',
    title: 'Real Estate Advisory',
    description:
      'Personalised counsel on acquisitions, divestments, and market timing from seasoned property professionals.',
    number: '04',
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation',
    description:
      'Precise, evidence-based appraisals that reflect true market value, informed by comparable sales and architectural merit.',
    number: '05',
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    description:
      'Seamless transition support for clients moving across cities or borders, from neighbourhood selection to settling in.',
    number: '06',
  },
];
