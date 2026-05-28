// ── Featured Products section on homepage ────────────────────

import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRightIcon } from '@/components/layout/Icons';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Our Range"
          title="Featured Spices & Blends"
          subtitle="Handpicked favourites — bestsellers that our customers can't get enough of."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-200"
          >
            View All Products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
