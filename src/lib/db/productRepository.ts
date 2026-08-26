import { readJson, writeJson } from './jsonStore';
import type { Product } from '@/types';

const FILE = 'products.json';

export async function listProducts(): Promise<Product[]> {
  return readJson<Product[]>(FILE);
}

export async function listActiveProducts(): Promise<Product[]> {
  return (await listProducts()).filter((p) => p.active);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return (await listProducts()).find((p) => p.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await listProducts()).find((p) => p.slug === slug);
}

export async function getActiveProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await getProductBySlug(slug);
  return product?.active ? product : undefined;
}

export async function listProductsByCategory(category: string): Promise<Product[]> {
  return (await listActiveProducts()).filter((p) => p.category === category);
}

export async function listFeaturedProducts(): Promise<Product[]> {
  return (await listActiveProducts()).filter((p) => p.featured);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createProduct(
  input: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }
): Promise<Product> {
  const products = await listProducts();
  const slug = input.slug || slugify(input.name);
  if (products.some((p) => p.slug === slug)) {
    throw new Error(`A product with slug "${slug}" already exists`);
  }
  const now = new Date().toISOString();
  const product: Product = {
    ...input,
    id: slug,
    slug,
    createdAt: now,
    updatedAt: now,
  };
  products.push(product);
  await writeJson(FILE, products);
  return product;
}

export async function updateProduct(
  id: string,
  patch: Partial<Omit<Product, 'id' | 'createdAt'>>,
  updatedBy?: string
): Promise<Product | undefined> {
  const products = await listProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  const updated: Product = {
    ...products[index],
    ...patch,
    id: products[index].id,
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString(),
    updatedBy: updatedBy ?? products[index].updatedBy,
  };
  products[index] = updated;
  await writeJson(FILE, products);
  return updated;
}

export async function setProductActive(id: string, active: boolean): Promise<Product | undefined> {
  return updateProduct(id, { active });
}

export async function setProductFeatured(id: string, featured: boolean): Promise<Product | undefined> {
  return updateProduct(id, { featured });
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await listProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  await writeJson(FILE, products);
  return true;
}
