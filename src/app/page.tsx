// ── Homepage ──────────────────────────────────────────────────

import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import JourneyPreview from '@/components/home/JourneyPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Organization data lives in the root layout; this page only adds
// WebSite + SearchAction so Google can offer a sitelinks searchbox.
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RA A1 Masale',
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <IntroSection />
      <FeaturedProducts />
      <JourneyPreview />
      <TestimonialsSection />
    </>
  );
}
