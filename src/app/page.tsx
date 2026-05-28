// ── Homepage ──────────────────────────────────────────────────

import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import JourneyPreview from '@/components/home/JourneyPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedProducts />
      <JourneyPreview />
      <TestimonialsSection />
    </>
  );
}
