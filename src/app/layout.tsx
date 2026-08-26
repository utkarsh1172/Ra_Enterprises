import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'RA A1 Masale – Finest Spices & Blends',
    template: '%s | RA A1 Masale',
  },
  description:
    'RA A1 Masale offers 100% natural, stone-ground spices and masala blends including Ghati Masala, Malvani Masala, and more. Pure tradition, authentic flavour.',
  keywords: [
    'RA A1 Masale', 'spices', 'masala', 'Ghati Masala', 'Malvani Masala',
    'Indian spices', 'pure spices', 'natural masala', 'Maharashtra spices',
  ],
  authors: [{ name: 'RA A1 Masale' }],
  creator: 'RA A1 Masale',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RA A1 Masale',
    title: 'RA A1 Masale – Finest Spices & Blends',
    description:
      'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RA A1 Masale – Finest Spices & Blends',
    description: 'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  robots: {
    index: true,
    follow: true,
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Cart state is available across all pages */}
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Floating WhatsApp button on every page */}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
