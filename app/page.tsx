import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedProperties from '@/components/FeaturedProperties';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Team from '@/components/Team';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChooseUs />
      <Team />
      <CTA />
    </>
  );
}
