import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: {
    default: 'RA Enterprises – Finest Spices & Blends',
    template: '%s | RA Enterprises',
  },
  description:
    'RA Enterprises offers 100% natural, stone-ground spices and masala blends including Ghati Masala, Malvani Masala, and more. Pure tradition, authentic flavour.',
  keywords: [
    'RA Enterprises', 'spices', 'masala', 'Ghati Masala', 'Malvani Masala',
    'Indian spices', 'pure spices', 'natural masala', 'Maharashtra spices',
  ],
  authors: [{ name: 'RA Enterprises' }],
  creator: 'RA Enterprises',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RA Enterprises',
    title: 'RA Enterprises – Finest Spices & Blends',
    description:
      'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RA Enterprises – Finest Spices & Blends',
    description: 'Pure, natural, stone-ground masalas crafted with generations of expertise.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
