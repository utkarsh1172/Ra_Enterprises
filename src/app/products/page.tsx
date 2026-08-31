// ── Products Catalog Page ─────────────────────────────────────

import type { Metadata } from 'next';
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
    <div className="min-h-screen bg-[#faf9f6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page header */}
      <div className="bg-gradient-to-br from-amber-950 to-red-950 py-16 px-4 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          Our Products
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">
          Spices &amp; Masalas
        </h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-12 bg-amber-500" />
          <span className="text-amber-500 text-lg">✦</span>
          <div className="h-px w-12 bg-amber-500" />
        </div>
        <p className="mt-4 text-amber-200 max-w-xl mx-auto text-base">
          Pure, natural, stone-ground — every product crafted with care and tradition.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsFilterClient products={products} categoryLabels={categoryLabels} />
      </div>
    </div>
  );
}
