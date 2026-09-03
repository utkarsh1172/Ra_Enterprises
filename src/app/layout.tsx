import type { Metadata } from 'next';
import { Fraunces, Manrope, Yeseva_One } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CartProvider } from '@/context/CartContext';
import Loader from '@/components/loader/Loader';
import Analytics from '@/components/analytics/Analytics';
import { SITE_URL } from '@/lib/siteUrl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RA A1 Enterprises Masale – Authentic Taste. Pure Spices.',
    template: '%s | RA A1 Enterprises Masale',
  },
  description:
    'RA A1 Enterprises brings 100% natural, stone-ground Indian spices and masala blends — Ghati Masala, Malvani Masala and more — to every kitchen. Authentic taste, pure spices.',
  alternates: { canonical: '/' },
  keywords: [
    'RA A1 Enterprises', 'RA A1 Enterprises Masale', 'Indian masala', 'Indian spices',
    'spice products', 'masala products', 'authentic Indian spices',
    'Ghati Masala', 'Malvani Masala', 'natural masala', 'Maharashtra spices',
  ],
  authors: [{ name: 'RA A1 Enterprises' }],
  creator: 'RA A1 Enterprises',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RA A1 Enterprises Masale',
    title: 'RA A1 Enterprises Masale – Authentic Taste. Pure Spices.',
    description:
      'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RA A1 Enterprises Masale – Authentic Taste. Pure Spices.',
    description: 'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  robots: {
    index: true,
    follow: true,
  },
  // Optional: set GOOGLE_SITE_VERIFICATION in .env for meta-tag verification
  // instead of/in addition to the HTML file method.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

// Distinct display face reserved for the homepage hero headline only —
// keeps the brand's single most visible line from reading as a generic
// "Fraunces + Manrope" AI-template pairing.
const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  variable: '--font-hero',
  weight: '400',
});

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RA A1 Enterprises',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  telephone: '+919920382812',
  email: 'utkarsh117@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919920382812',
    email: 'utkarsh117@gmail.com',
    contactType: 'customer service',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${yesevaOne.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Organization structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Cinematic first-load brand intro — musal meets masala */}
        <Loader />
        {/* Cart state is available across all pages */}
        <CartProvider>
          <Header />
          {/* overflow-x-clip contains the horizontal entry transforms used by
              Reveal while a section is still below the fold. `clip` rather than
              `hidden` so it never becomes a scroll container — sticky headers
              and the sticky cart summary keep working. */}
          <main className="flex-1 overflow-x-clip">{children}</main>
          <Footer />
          {/* Floating WhatsApp button on every page */}
          <WhatsAppButton />
        </CartProvider>
        {/* GA4 — only loads when NEXT_PUBLIC_GA_ID is configured */}
        <Analytics />
      </body>
    </html>
  );
}
