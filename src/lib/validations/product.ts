import { z } from 'zod';

const sizeSchema = z.object({
  label: z.string().min(1),
  price: z.number().nonnegative(),
});

export const productInputSchema = z.object({
  slug: z.string().min(1).optional(),
  sku: z.string().min(1),
  name: z.string().min(1),
  nameHindi: z.string().optional(),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  price: z.number().nonnegative(),
  discountPrice: z.number().nonnegative().optional(),
  unit: z.string().min(1),
  availableSizes: z.array(sizeSchema).min(1),
  image: z.string().min(1),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  active: z.boolean().default(true),
  inStock: z.boolean().default(true),
  stockStatus: z.enum(['in_stock', 'low_stock', 'out_of_stock']).default('in_stock'),
  tags: z.array(z.string()).default([]),
  ingredients: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  usageInstructions: z.string().optional(),
  storageInstructions: z.string().optional(),
  shelfLife: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  manufacturer: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  canonicalPath: z.string().optional(),
});

export const productUpdateSchema = productInputSchema.partial();

export const categoryInputSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  active: z.boolean().default(true),
});

export const categoryUpdateSchema = categoryInputSchema.partial();

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});
