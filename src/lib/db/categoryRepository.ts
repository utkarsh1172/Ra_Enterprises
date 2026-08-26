import { readJson, writeJson } from './jsonStore';
import type { Category } from '@/types';

const FILE = 'categories.json';

export async function listCategories(): Promise<Category[]> {
  return readJson<Category[]>(FILE);
}

export async function listActiveCategories(): Promise<Category[]> {
  return (await listCategories()).filter((c) => c.active);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return (await listCategories()).find((c) => c.id === id);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await listCategories()).find((c) => c.slug === slug);
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
  const categories = await listCategories();
  const slug = input.slug || slugify(input.name);
  if (categories.some((c) => c.slug === slug)) {
    throw new Error(`A category with slug "${slug}" already exists`);
  }
  const now = new Date().toISOString();
  const category: Category = { ...input, id: slug, slug, createdAt: now, updatedAt: now };
  categories.push(category);
  await writeJson(FILE, categories);
  return category;
}

export async function updateCategory(
  id: string,
  patch: Partial<Omit<Category, 'id' | 'createdAt'>>
): Promise<Category | undefined> {
  const categories = await listCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  const updated: Category = {
    ...categories[index],
    ...patch,
    id: categories[index].id,
    createdAt: categories[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  categories[index] = updated;
  await writeJson(FILE, categories);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const categories = await listCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return false;
  categories.splice(index, 1);
  await writeJson(FILE, categories);
  return true;
}
