// ── Homepage ──────────────────────────────────────────────────

import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import JourneyPreview from '@/components/home/JourneyPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RA A1 Masale',
  url: SITE_URL,
  description:
    'RA A1 Masale offers 100% natural, stone-ground spices and masala blends including Ghati Masala, Malvani Masala, and more.',
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
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
