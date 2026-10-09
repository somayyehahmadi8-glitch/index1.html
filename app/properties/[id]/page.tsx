import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { properties, getPropertyById, getSimilarProperties } from '@/data/properties';
import PropertyDetail from '@/components/PropertyDetail';

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const property = getPropertyById(params.id);
  if (!property) return { title: 'Property Not Found — Horizon Properties' };
  return {
    title: `${property.title} — Horizon Properties`,
    description: property.description.slice(0, 160),
  };
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  const similar = getSimilarProperties(params.id, 3);

  return <PropertyDetail property={property} similar={similar} />;
}
