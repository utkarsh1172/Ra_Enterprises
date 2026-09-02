import type { MetadataRoute } from 'next';
import { listActiveProducts } from '@/lib/db/productRepository';
import { SITE_URL } from '@/lib/siteUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listActiveProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/journey`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
