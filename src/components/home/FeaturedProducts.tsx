// ── Featured Products section on homepage ────────────────────

import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRightIcon } from '@/components/layout/Icons';
import Reveal from '@/components/motion/Reveal';
import StaggerGrid from '@/components/motion/StaggerGrid';

export default async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <section className="bg-[#f8efe0] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="Our Range"
            title="Featured Spices & Blends"
            subtitle="Handpicked favourites — bestsellers that our customers can't get enough of."
          />
        </Reveal>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGrid>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-[#542315] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#8d301d]"
          >
            View All Products
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
