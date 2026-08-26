// ── Individual Product Detail Page ───────────────────────────

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, getProductBySlug, getCategoryLabels, getProductsByCategory } from '@/data/products';
import AddToCartSection from '@/components/products/AddToCartSection';
import ProductCard from '@/components/products/ProductCard';
import { CheckIcon, ChevronRightIcon } from '@/components/layout/Icons';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Generate static paths for all products at build time (new products still render on demand)
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;
export const revalidate = 60;

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = product.seoTitle || product.name;
  const description = product.seoDescription || product.description;
  const canonicalPath = product.canonicalPath || `/products/${product.slug}`;

  return {
    title,
    description,
    keywords: product.seoKeywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${title} | RA A1 Masale`,
      description,
      images: [{ url: product.ogImage || product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const [categoryLabels, sameCategory] = await Promise.all([
    getCategoryLabels(),
    getProductsByCategory(product.category),
  ]);

  // Related products: same category, exclude current
  const related = sameCategory.filter((p) => p.id !== product.id).slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`${SITE_URL}${product.image}`],
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'RA A1 Masale' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.discountPrice ?? product.price,
      availability:
        product.stockStatus === 'in_stock'
          ? 'https://schema.org/InStock'
          : product.stockStatus === 'low_stock'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestSeller && (
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  New
                </span>
              )}
              <span className="bg-white text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                {categoryLabels[product.category] ?? product.category}
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

          {(product.ingredients?.length || product.benefits?.length || product.usageInstructions) && (
            <div className="mt-8 grid sm:grid-cols-2 gap-8">
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-700 mb-2">Ingredients</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.ingredients.join(', ')}</p>
                </div>
              )}
              {product.benefits && product.benefits.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-700 mb-2">Benefits</h3>
                  <ul className="text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
                    {product.benefits.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              )}
              {product.usageInstructions && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-700 mb-2">Usage</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.usageInstructions}</p>
                </div>
              )}
              {product.storageInstructions && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-700 mb-2">Storage</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.storageInstructions}</p>
                </div>
              )}
            </div>
          )}

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
