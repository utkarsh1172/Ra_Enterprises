// ── Individual Product Detail Page ───────────────────────────

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts, getProductBySlug, getProductsByCategory } from '@/data/products';
import AddToCartSection from '@/components/products/AddToCartSection';
import ProductCard from '@/components/products/ProductCard';
import ProductDetailTabs from '@/components/products/ProductDetailTabs';
import ProductGallery from '@/components/products/ProductGallery';
import ProductViewTracker from '@/components/products/ProductViewTracker';
import {
  ChevronRightIcon,
  FlameIcon,
  HomeIcon,
  LeafIcon,
  ShieldCheckIcon,
} from '@/components/layout/Icons';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const guarantees = [
  { icon: LeafIcon, title: '100% Natural', text: 'No preservatives' },
  { icon: HomeIcon, title: 'Homemade', text: 'Small batches' },
  { icon: FlameIcon, title: 'Rich Aroma', text: 'Authentic taste' },
  { icon: ShieldCheckIcon, title: 'Hygienically Packed', text: 'Quality assured' },
];

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
      title: `${title} | RA A1 Enterprises`,
      description,
      images: [{ url: product.ogImage || product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const sameCategory = await getProductsByCategory(product.category);

  const related = sameCategory.filter((p) => p.id !== product.id).slice(0, 4);
  const productImages = Array.from(new Set([product.image, ...product.images].filter(Boolean)));

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`${SITE_URL}${product.image}`],
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'RA A1 Enterprises' },
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
    <div className="min-h-screen bg-[#fff8ea]">
      <ProductViewTracker id={product.id} name={product.name} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="border-b border-[#ead8b6] bg-[#fffaf0] px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs font-semibold text-[#7b6658]">
          <Link href="/" className="transition-colors hover:text-[#8d301d]">Home</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link href="/products" className="transition-colors hover:text-[#8d301d]">Products</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-[#8d301d]">{product.name}</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
          <ProductGallery productName={product.name} images={productImages} />

          <div className="lg:pt-2">
            <div className="flex flex-wrap gap-2">
              {product.bestSeller && (
                <span className="rounded-full bg-[#f5a831] px-3.5 py-1.5 text-[0.68rem] font-black uppercase text-[#38170e]">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="rounded-full bg-[#542315] px-3.5 py-1.5 text-[0.68rem] font-black uppercase text-[#fff8ea]">
                  New
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-product-name-lg text-[#542315] sm:text-h1">
              {product.name}
            </h1>
            {product.nameHindi && (
              <p className="mt-1.5 font-serif text-2xl font-bold leading-tight text-[#542315] sm:text-3xl">
                {product.nameHindi}
              </p>
            )}

            {/* Price, description, pack size and quantity all live in the
                purchase panel so the price tracks the selected pack size. */}
            <div className="mt-5">
              <AddToCartSection product={product} />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <div key={item.title} className="rounded-lg bg-[#f9f0e0] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#fbe3bd] text-[#b15a2a]">
                <item.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-sm font-extrabold text-[#3d2015]">{item.title}</h2>
              <p className="mt-1.5 text-sm font-semibold text-[#7b6658]">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <ProductDetailTabs product={product} />
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <span className="text-eyebrow uppercase text-[#b15a2a]">More to Taste</span>
                <h2 className="mt-2 font-serif text-h2 text-[#542315]">You May Also Like</h2>
              </div>
              <Link href="/products" className="hidden text-sm font-bold text-[#8d301d] transition-colors hover:text-[#542315] sm:block">
                View all products
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
