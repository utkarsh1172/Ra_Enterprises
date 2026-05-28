'use client';

// ── Products Catalog Page ─────────────────────────────────────

import { useState } from 'react';
import { products, categoryLabels } from '@/data/products';
import type { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';

const allCategories = ['all', ...Object.keys(categoryLabels)] as const;
type Filter = typeof allCategories[number];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered: Product[] =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
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
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-amber-600 border-amber-600 text-white shadow'
                  : 'border-amber-200 text-amber-700 hover:bg-amber-50 bg-white'
              }`}
            >
              {cat === 'all' ? 'All Products' : categoryLabels[cat as keyof typeof categoryLabels]}
            </button>
          ))}
        </div>

        {/* Product count */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl block mb-4">🌶️</span>
            No products in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
