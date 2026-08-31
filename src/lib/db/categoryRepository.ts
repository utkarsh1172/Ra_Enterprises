import { db } from '@/lib/firebase/admin';
import type { Category } from '@/types';

const COLLECTION = 'categories';

export async function listCategories(): Promise<Category[]> {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as Category);
}

export async function listActiveCategories(): Promise<Category[]> {
  return (await listCategories()).filter((c) => c.active);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as Category) : undefined;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const snapshot = await db.collection(COLLECTION).where('slug', '==', slug).limit(1).get();
  return snapshot.empty ? undefined : (snapshot.docs[0].data() as Category);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createCategory(
  input: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }
): Promise<Category> {
  const slug = input.slug || slugify(input.name);
  const existing = await getCategoryBySlug(slug);
  if (existing) {
    throw new Error(`A category with slug "${slug}" already exists`);
  }
  const now = new Date().toISOString();
  const category: Category = { ...input, id: slug, slug, createdAt: now, updatedAt: now };
  await db.collection(COLLECTION).doc(slug).set(category);
  return category;
}

export async function updateCategory(
  id: string,
  patch: Partial<Omit<Category, 'id' | 'createdAt'>>
): Promise<Category | undefined> {
  const existing = await getCategoryById(id);
  if (!existing) return undefined;
  const updated: Category = {
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  await db.collection(COLLECTION).doc(id).set(updated);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const existing = await getCategoryById(id);
  if (!existing) return false;
  await db.collection(COLLECTION).doc(id).delete();
  return true;
}
