// ============================================================
// RA A1 Enterprises – Product Catalog data access
// ============================================================
// Thin async wrapper around the JSON-backed repository layer so
// existing call sites keep the same function names. Server-only
// (reads files from disk) — call from Server Components / Route
// Handlers, never from 'use client' components.
// ============================================================

import type { Product } from '@/types';
import * as productRepository from '@/lib/db/productRepository';
import * as categoryRepository from '@/lib/db/categoryRepository';

export const getAllProducts = (): Promise<Product[]> => productRepository.listActiveProducts();

export const getFeaturedProducts = (): Promise<Product[]> => productRepository.listFeaturedProducts();

export const getProductBySlug = (slug: string): Promise<Product | undefined> =>
  productRepository.getActiveProductBySlug(slug);

export const getProductsByCategory = (category: string): Promise<Product[]> =>
  productRepository.listProductsByCategory(category);

export async function getCategoryLabels(): Promise<Record<string, string>> {
  const categories = await categoryRepository.listActiveCategories();
  return Object.fromEntries(categories.map((c) => [c.slug, c.name]));
}
