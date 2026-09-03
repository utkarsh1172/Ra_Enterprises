'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import StaggerGrid from '@/components/motion/StaggerGrid';
import { MagnifyingGlassIcon, SparklesIcon } from '@/components/layout/Icons';

interface Props {
  products: Product[];
  categoryLabels: Record<string, string>;
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'masalas', label: 'Masalas' },
  { id: 'blends', label: 'Blends' },
  { id: 'spices', label: 'Spices' },
] as const;

type FilterId = (typeof filters)[number]['id'];
type SortId = 'popular' | 'price-low' | 'price-high' | 'name';

export default function ProductsFilterClient({ products, categoryLabels }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortId>('popular');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    function matchesFilter(product: Product) {
      const category = product.category.toLowerCase();
      const categoryLabel = (categoryLabels[product.category] ?? '').toLowerCase();
      const name = product.name.toLowerCase();
      const tags = product.tags.join(' ').toLowerCase();

      if (activeFilter === 'all') return true;
      if (activeFilter === 'masalas') return name.includes('masala') || category.includes('masala') || categoryLabel.includes('masala');
      if (activeFilter === 'blends') return category.includes('blend') || categoryLabel.includes('blend') || tags.includes('blend') || tags.includes('signature');
      return category.includes('spice') || categoryLabel.includes('spice') || tags.includes('spice');
    }

    function matchesSearch(product: Product) {
      if (!term) return true;
      return [
        product.name,
        product.nameHindi,
        product.description,
        product.category,
        categoryLabels[product.category],
        ...product.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term);
    }

    return products
      .filter((product) => matchesFilter(product) && matchesSearch(product))
      .sort((a, b) => {
        const aPrice = a.availableSizes[0]?.price ?? a.price;
        const bPrice = b.availableSizes[0]?.price ?? b.price;

        if (sort === 'price-low') return aPrice - bPrice;
        if (sort === 'price-high') return bPrice - aPrice;
        if (sort === 'name') return a.name.localeCompare(b.name);

        return Number(b.bestSeller) - Number(a.bestSeller)
          || Number(b.featured) - Number(a.featured)
          || a.name.localeCompare(b.name);
      });
  }, [activeFilter, categoryLabels, products, query, sort]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'border-[#542315] bg-[#542315] text-[#fff8ea] shadow-md shadow-amber-950/10'
                  : 'border-[#e6c990] bg-[#fffaf0] text-[#6b3a25] hover:border-[#b15a2a] hover:bg-[#fff1d0]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px] lg:w-[520px]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b6a45]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="h-11 w-full rounded-lg border border-[#e6c990] bg-[#fffaf0] pl-10 pr-4 text-sm font-medium text-[#3d2015] outline-none transition focus:border-[#b15a2a] focus:ring-2 focus:ring-[#f5a831]/25"
            />
          </label>
          <label className="block">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="h-11 w-full rounded-lg border border-[#e6c990] bg-[#fffaf0] px-3 text-sm font-bold text-[#3d2015] outline-none transition focus:border-[#b15a2a] focus:ring-2 focus:ring-[#f5a831]/25"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* The default "All" view stays clean, as in the design reference; the
          count only appears once a filter or search narrows the results. */}
      {(activeFilter !== 'all' || query.trim() !== '') && (
        <p className="mb-6 text-sm font-semibold text-[#7b6658]">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <StaggerGrid key={`${activeFilter}-${sort}-${query}`} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGrid>
      ) : (
        <div className="rounded-lg border border-[#e6c990] bg-[#fffaf0] py-16 text-center text-[#7b6658]">
          <SparklesIcon className="mx-auto mb-4 h-10 w-10 text-[#b15a2a]" />
          No matching products yet.
        </div>
      )}
    </>
  );
}
