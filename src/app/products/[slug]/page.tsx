// ── Individual Product Detail Page ───────────────────────────

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductBySlug, categoryLabels } from '@/data/products';
import AddToCartSection from '@/components/products/AddToCartSection';
import ProductCard from '@/components/products/ProductCard';
import { CheckIcon, ChevronRightIcon } from '@/components/layout/Icons';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | RA Enterprises`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amber-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <Link href="/products" className="hover:text-amber-700 transition-colors">Products</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-amber-700 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product main section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 shadow-lg">
            {/*
              The onError handler cannot be used in Server Components.
              Place real product images in /public/images/products/<slug>.jpg
              and they will render automatically. The emoji placeholder below
              is shown as a visual fallback layered beneath the image.
            */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-8xl">🌶️</span>
              <span className="text-xs text-amber-300 mt-3 opacity-60">
                [ {product.name} image ]
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && (
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}
              <span className="bg-white text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                {categoryLabels[product.category]}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {product.nameHindi && (
              <p className="text-amber-600 font-medium">{product.nameHindi}</p>
            )}

            <h1 className="text-3xl md:text-4xl font-bold font-serif text-stone-900">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium capitalize"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            {/* Add to cart section (client component) */}
            <AddToCartSection product={product} />
          </div>
        </div>

        {/* Long description */}
        <div className="mt-14 bg-white rounded-2xl p-8 shadow-sm border border-amber-50">
          <h2 className="text-xl font-bold font-serif text-stone-800 mb-4">
            About this Product
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>

          {/* Quality guarantees */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              'No artificial colours or flavours',
              'No preservatives added',
              'Traditional stone-ground process',
            ].map((g) => (
              <div key={g} className="flex items-start gap-2">
                <span className="mt-0.5 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-amber-700" />
                </span>
                <span className="text-sm text-gray-600">{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold font-serif text-stone-800 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
