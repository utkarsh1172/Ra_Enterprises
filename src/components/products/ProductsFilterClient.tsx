'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  products: Product[];
  categoryLabels: Record<string, string>;
}

export default function ProductsFilterClient({ products, categoryLabels }: Props) {
  const categories = ['all', ...Object.keys(categoryLabels)];
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered =
    activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              activeFilter === cat
                ? 'bg-amber-600 border-amber-600 text-white shadow'
                : 'border-amber-200 text-amber-700 hover:bg-amber-50 bg-white'
            }`}
          >
            {cat === 'all' ? 'All Products' : categoryLabels[cat]}
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
    </>
  );
}
