import { db } from '@/lib/firebase/admin';
import type { Product } from '@/types';

const COLLECTION = 'products';

export async function listProducts(): Promise<Product[]> {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as Product);
}

export async function listActiveProducts(): Promise<Product[]> {
  return (await listProducts()).filter((p) => p.active);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as Product) : undefined;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const snapshot = await db.collection(COLLECTION).where('slug', '==', slug).limit(1).get();
  return snapshot.empty ? undefined : (snapshot.docs[0].data() as Product);
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
  const slug = input.slug || slugify(input.name);
  const existing = await getProductBySlug(slug);
  if (existing) {
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
  await db.collection(COLLECTION).doc(slug).set(product);
  return product;
}

export async function updateProduct(
  id: string,
  patch: Partial<Omit<Product, 'id' | 'createdAt'>>,
  updatedBy?: string
): Promise<Product | undefined> {
  const existing = await getProductById(id);
  if (!existing) return undefined;

  const updated: Product = {
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
    updatedBy: updatedBy ?? existing.updatedBy,
  };
  await db.collection(COLLECTION).doc(id).set(updated);
  return updated;
}

export async function setProductActive(id: string, active: boolean): Promise<Product | undefined> {
  return updateProduct(id, { active });
}

export async function setProductFeatured(id: string, featured: boolean): Promise<Product | undefined> {
  return updateProduct(id, { featured });
}

export async function deleteProduct(id: string): Promise<boolean> {
  const existing = await getProductById(id);
  if (!existing) return false;
  await db.collection(COLLECTION).doc(id).delete();
  return true;
}
