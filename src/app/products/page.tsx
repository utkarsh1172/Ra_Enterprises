// ── Products Catalog Page ─────────────────────────────────────

import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllProducts, getCategoryLabels } from '@/data/products';
import ProductsFilterClient from '@/components/products/ProductsFilterClient';

export const metadata: Metadata = {
  title: 'All Products',
  description:
    'Browse our full range of pure spices and masala blends — 100% natural, stone-ground, and crafted with tradition.',
  alternates: { canonical: '/products' },
};

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function ProductsPage() {
  const [products, categoryLabels] = await Promise.all([getAllProducts(), getCategoryLabels()]);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/products/${p.slug}`,
      name: p.name,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fff8ea]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden bg-[#3a170d] px-4 py-14 text-[#fff8ea] sm:px-6 lg:px-8">
        <Image
          src="/images/traditional-spice-prep.jpeg"
          alt="Earthen bowls of whole Indian spices prepared for grinding"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Keeps the headline side readable while the spice bowls stay visible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a170d] via-[#3a170d]/88 to-[#3a170d]/35" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="text-eyebrow uppercase text-[#ffc45b]">Our Range</span>
          <h1 className="mt-3 font-serif text-h1">Our Spices &amp; Blends</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#fce6c0]">
            Explore our handcrafted masalas made with premium quality spices.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductsFilterClient products={products} categoryLabels={categoryLabels} />
      </div>
    </div>
  );
}
