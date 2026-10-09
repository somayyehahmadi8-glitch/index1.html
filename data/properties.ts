export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  country: string;
  price: number;
  type: 'Villa' | 'House' | 'Penthouse' | 'Estate' | 'Residence';
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  garage: number;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    image: string;
  };
  featured: boolean;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Verified-valid Unsplash photo IDs for luxury architecture
const PHOTOS = {
  villaPool: 'photo-1613977257363-707ba9348227',
  glassPool: 'photo-1582268611958-ebfd161ef9cf',
  poolLounge: 'photo-1706808849780-7a04fbac83ef',
  poolBuilding: 'photo-1512917774080-9991f1c4c750',
  buildingPool: 'photo-1670589953882-b94c9cb380f5',
  concreteLight: 'photo-1505843513577-22bb7d21e455',
  hillside: 'photo-1777516027356-d43488256f2b',
  largeWindows: 'photo-1766603636700-e9d80473f40f',
  beigeVilla: 'photo-1787489066309-cb14d5b1a450',
  twoStory: 'photo-1721815693498-cc28507c0ba2',
  whiteConcrete: 'photo-1600596542815-ffad4c1539a9',
  brownConcrete: 'photo-1613490493576-7fde63acd811',
  whiteSky: 'photo-1628012209120-d9db7abf7eab',
  brownBuilding: 'photo-1580587771525-78b9dba3b914',
  houseCar: 'photo-1688653802629-5360086bf632',
};

export const properties: Property[] = [
  {
    id: 'lakeside-modern-villa',
    title: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 2_350_000,
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSize: '0.8 acres',
    yearBuilt: 2021,
    garage: 2,
    description:
      'A stunning modern villa set on the shores of Lake Austin, featuring floor-to-ceiling glass walls, an infinity-edge pool, and seamless indoor-outdoor living. The interior showcases premium materials including white oak flooring, marble countertops, and custom millwork throughout.',
    features: [
      'Floor-to-ceiling glass walls',
      'Infinity-edge pool with lake views',
      "Chef's kitchen with Wolf appliances",
      'Primary suite with private terrace',
      'Smart home automation',
      'Three-car garage',
    ],
    amenities: [
      'Infinity Pool',
      'Lake Frontage',
      'Wine Cellar',
      'Home Theater',
      'Smart Home System',
      'Outdoor Kitchen',
      'Spa Bathroom',
      'Private Dock',
    ],
    images: [
      img(PHOTOS.villaPool, 1600),
      img(PHOTOS.poolBuilding, 1200),
      img(PHOTOS.poolLounge, 1200),
      img(PHOTOS.glassPool, 1200),
      img(PHOTOS.buildingPool, 1200),
    ],
    agent: {
      name: 'Daniel Morgan',
      role: 'Managing Director',
      phone: '(555) 246-7890',
      email: 'daniel@horizonproperties.com',
      image: img('photo-1507003211169-0a1dd7228f2d', 400),
    },
    featured: true,
  },
  {
    id: 'pacific-glass-house',
    title: 'Pacific Glass House',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    price: 4_800_000,
    type: 'House',
    beds: 6,
    baths: 5,
    sqft: 5800,
    lotSize: '1.2 acres',
    yearBuilt: 2022,
    garage: 3,
    description:
      'An architectural masterpiece perched on the Malibu coastline, this glass-walled residence offers panoramic Pacific Ocean views from every room. The design emphasizes transparency and light, with retractable glass walls that dissolve the boundary between interior and exterior.',
    features: [
      '360-degree ocean views',
      'Retractable glass walls',
      'Solar-powered energy system',
      'Beachfront access',
      'Cantilevered design',
      'Underground wine cave',
    ],
    amenities: [
      'Ocean View',
      'Beach Access',
      'Solar Power',
      'Wine Cave',
      'Infinity Pool',
      'Gym',
      'Home Office',
      'EV Charging',
    ],
    images: [
      img(PHOTOS.glassPool, 1600),
      img(PHOTOS.villaPool, 1200),
      img(PHOTOS.poolLounge, 1200),
      img(PHOTOS.poolBuilding, 1200),
      img(PHOTOS.brownBuilding, 1200),
    ],
    agent: {
      name: 'Olivia Carter',
      role: 'Luxury Property Advisor',
      phone: '(555) 246-7891',
      email: 'olivia@horizonproperties.com',
      image: img('photo-1494790108377-be9c29b29330', 400),
    },
    featured: true,
  },
  {
    id: 'desert-horizon-estate',
    title: 'Desert Horizon Estate',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    price: 3_150_000,
    type: 'Estate',
    beds: 4,
    baths: 4,
    sqft: 4500,
    lotSize: '2.5 acres',
    yearBuilt: 2020,
    garage: 2,
    description:
      'A desert modern estate that harmonizes with its rugged Sonoran surroundings. Natural materials, deep overhangs, and strategic shading create a sustainable luxury retreat with sweeping desert and mountain views.',
    features: [
      'Desert-modern architecture',
      'Mountain view terrace',
      'Native desert landscaping',
      'Passive solar design',
      'Guest casita',
      'Resort-style pool',
    ],
    amenities: [
      'Mountain Views',
      'Guest House',
      'Resort Pool',
      'Outdoor Fireplace',
      'Hiking Trail Access',
      'Solar Panels',
      '3-Car Garage',
      'Storage Room',
    ],
    images: [
      img(PHOTOS.concreteLight, 1600),
      img(PHOTOS.brownConcrete, 1200),
      img(PHOTOS.whiteConcrete, 1200),
      img(PHOTOS.whiteSky, 1200),
      img(PHOTOS.brownBuilding, 1200),
    ],
    agent: {
      name: 'James Wilson',
      role: 'Investment Consultant',
      phone: '(555) 246-7892',
      email: 'james@horizonproperties.com',
      image: img('photo-1500648767791-00dcc994a43e', 400),
    },
    featured: true,
  },
  {
    id: 'oceanfront-residence',
    title: 'Oceanfront Residence',
    location: 'Miami, Florida, USA',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    price: 5_200_000,
    type: 'Residence',
    beds: 5,
    baths: 6,
    sqft: 6200,
    lotSize: '0.5 acres',
    yearBuilt: 2023,
    garage: 2,
    description:
      'A contemporary oceanfront residence in exclusive Miami Beach, featuring a dramatic two-story living space, private beach access, and a rooftop terrace with uninterrupted Atlantic views. The interior blends warm wood tones with crisp white surfaces.',
    features: [
      'Private beach access',
      'Rooftop terrace with ocean views',
      'Two-story living room',
      'Summer kitchen',
      'Elevator',
      'Hurricane-impact glass',
    ],
    amenities: [
      'Beachfront',
      'Rooftop Terrace',
      'Elevator',
      'Summer Kitchen',
      'Pool & Spa',
      'Boat Dock',
      'Security System',
      'Generator',
    ],
    images: [
      img(PHOTOS.poolLounge, 1600),
      img(PHOTOS.villaPool, 1200),
      img(PHOTOS.glassPool, 1200),
      img(PHOTOS.buildingPool, 1200),
      img(PHOTOS.poolBuilding, 1200),
    ],
    agent: {
      name: 'Sophia Bennett',
      role: 'Senior Property Specialist',
      phone: '(555) 246-7893',
      email: 'sophia@horizonproperties.com',
      image: img('photo-1438761681033-6461ffad8d80', 400),
    },
    featured: true,
  },
  {
    id: 'modern-hillside-retreat',
    title: 'Modern Hillside Retreat',
    location: 'Los Angeles, California, USA',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    price: 3_750_000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 3800,
    lotSize: '0.6 acres',
    yearBuilt: 2021,
    garage: 2,
    description:
      'Nestled in the Hollywood Hills, this architectural retreat offers panoramic city views through walls of glass. The multi-level design follows the natural topography, creating intimate spaces that open to expansive view terraces.',
    features: [
      'Panoramic city views',
      'Multi-level design',
      'Glass-walled living area',
      'Zero-edge plunge pool',
      'Studio/guest quarters',
      'Two-car garage',
    ],
    amenities: [
      'City Views',
      'Plunge Pool',
      'Guest Studio',
      'Home Office',
      'Wine Storage',
      'Smart Lighting',
      'Outdoor Lounge',
      'Privacy Hedge',
    ],
    images: [
      img(PHOTOS.hillside, 1600),
      img(PHOTOS.largeWindows, 1200),
      img(PHOTOS.concreteLight, 1200),
      img(PHOTOS.brownConcrete, 1200),
      img(PHOTOS.whiteSky, 1200),
    ],
    agent: {
      name: 'Daniel Morgan',
      role: 'Managing Director',
      phone: '(555) 246-7890',
      email: 'daniel@horizonproperties.com',
      image: img('photo-1507003211169-0a1dd7228f2d', 400),
    },
    featured: false,
  },
  {
    id: 'palm-garden-residence',
    title: 'Palm Garden Residence',
    location: 'Beverly Hills, California, USA',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    price: 6_400_000,
    type: 'Estate',
    beds: 7,
    baths: 8,
    sqft: 8500,
    lotSize: '1.5 acres',
    yearBuilt: 2022,
    garage: 4,
    description:
      'An estate of unparalleled grandeur in the heart of Beverly Hills. Manicured palm gardens frame a residence that exudes timeless luxury, with grand entertaining spaces, a primary wing, and resort-quality outdoor amenities.',
    features: [
      'Mature palm gardens',
      'Grand entertaining spaces',
      'Primary wing with dual baths',
      'Resort-quality pool & spa',
      'Detached guest house',
      'Four-car showcase garage',
    ],
    amenities: [
      'Resort Pool & Spa',
      'Guest House',
      'Tennis Court',
      'Formal Gardens',
      'Wine Room',
      'Home Theater',
      'Gym',
      'Staff Quarters',
    ],
    images: [
      img(PHOTOS.beigeVilla, 1600),
      img(PHOTOS.villaPool, 1200),
      img(PHOTOS.twoStory, 1200),
      img(PHOTOS.poolLounge, 1200),
      img(PHOTOS.poolBuilding, 1200),
    ],
    agent: {
      name: 'Olivia Carter',
      role: 'Luxury Property Advisor',
      phone: '(555) 246-7891',
      email: 'olivia@horizonproperties.com',
      image: img('photo-1494790108377-be9c29b29330', 400),
    },
    featured: true,
  },
  {
    id: 'contemporary-lake-house',
    title: 'Contemporary Lake House',
    location: 'Lake Tahoe, Nevada, USA',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    price: 2_950_000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 3600,
    lotSize: '1.0 acres',
    yearBuilt: 2020,
    garage: 2,
    description:
      'A contemporary lake house that embraces its wooded setting with warm wood siding, stone accents, and walls of glass overlooking the crystal-clear waters of Lake Tahoe. The design balances modern comfort with rustic warmth.',
    features: [
      'Lakefront with private dock',
      'Warm wood and stone interior',
      'Great room with stone fireplace',
      'Wraparound deck',
      'Boathouse',
      'Heated driveway',
    ],
    amenities: [
      'Lakefront',
      'Private Dock',
      'Stone Fireplace',
      'Wraparound Deck',
      'Hot Tub',
      'Ski Storage',
      'Heated Driveway',
      'Generator',
    ],
    images: [
      img(PHOTOS.poolBuilding, 1600),
      img(PHOTOS.buildingPool, 1200),
      img(PHOTOS.glassPool, 1200),
      img(PHOTOS.villaPool, 1200),
      img(PHOTOS.poolLounge, 1200),
    ],
    agent: {
      name: 'James Wilson',
      role: 'Investment Consultant',
      phone: '(555) 246-7892',
      email: 'james@horizonproperties.com',
      image: img('photo-1500648767791-00dcc994a43e', 400),
    },
    featured: false,
  },
  {
    id: 'architectural-downtown-penthouse',
    title: 'Architectural Downtown Penthouse',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 1_850_000,
    type: 'Penthouse',
    beds: 3,
    baths: 3,
    sqft: 2800,
    lotSize: 'N/A',
    yearBuilt: 2023,
    garage: 2,
    description:
      'A full-floor penthouse in downtown Austin with 360-degree city views, double-height ceilings, and a private rooftop terrace. The interior features custom Italian cabinetry, wide-plank oak floors, and integrated smart home technology.',
    features: [
      'Full-floor privacy',
      '360-degree city views',
      'Private rooftop terrace',
      'Double-height ceilings',
      'Italian custom cabinetry',
      'Two deeded parking spaces',
    ],
    amenities: [
      'Rooftop Terrace',
      'Concierge',
      'Fitness Center',
      'Pool & Spa',
      'EV Charging',
      'Storage Unit',
      'Smart Home',
      'Pet Spa',
    ],
    images: [
      img(PHOTOS.twoStory, 1600),
      img(PHOTOS.whiteSky, 1200),
      img(PHOTOS.whiteConcrete, 1200),
      img(PHOTOS.brownConcrete, 1200),
      img(PHOTOS.houseCar, 1200),
    ],
    agent: {
      name: 'Sophia Bennett',
      role: 'Senior Property Specialist',
      phone: '(555) 246-7893',
      email: 'sophia@horizonproperties.com',
      image: img('photo-1438761681033-6461ffad8d80', 400),
    },
    featured: false,
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getSimilarProperties(id: string, limit = 3): Property[] {
  const current = getPropertyById(id);
  if (!current) return [];
  return properties
    .filter((p) => p.id !== id)
    .sort((a, b) => {
      const aScore =
        (a.type === current.type ? 1 : 0) +
        (a.state === current.state ? 1 : 0);
      const bScore =
        (b.type === current.type ? 1 : 0) +
        (b.state === current.state ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export const propertyTypes = ['Villa', 'House', 'Penthouse', 'Estate', 'Residence'] as const;
export const locations = Array.from(new Set(properties.map((p) => p.state))).sort();
export const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $2M', min: 0, max: 2_000_000 },
  { label: '$2M – $4M', min: 2_000_000, max: 4_000_000 },
  { label: '$4M – $6M', min: 4_000_000, max: 6_000_000 },
  { label: '$6M+', min: 6_000_000, max: Infinity },
];
