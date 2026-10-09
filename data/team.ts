export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const team: TeamMember[] = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    image: img('photo-1507003211169-0a1dd7228f2d'),
    phone: '(555) 246-7890',
    email: 'daniel@horizonproperties.com',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    image: img('photo-1494790108377-be9c29b29330'),
    phone: '(555) 246-7891',
    email: 'olivia@horizonproperties.com',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    image: img('photo-1500648767791-00dcc994a43e'),
    phone: '(555) 246-7892',
    email: 'james@horizonproperties.com',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    image: img('photo-1438761681033-6461ffad8d80'),
    phone: '(555) 246-7893',
    email: 'sophia@horizonproperties.com',
  },
];
