'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Product } from '@/types';

interface ProductFormProps {
  product?: Product;
  categories: { slug: string; name: string }[];
}

type FormState = {
  name: string;
  sku: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  image: string;
  tags: string;
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  active: boolean;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  seoTitle: string;
  seoDescription: string;
};

function toFormState(product?: Product): FormState {
  return {
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    category: product?.category ?? '',
    description: product?.description ?? '',
    longDescription: product?.longDescription ?? '',
    price: product?.price ?? 0,
    unit: product?.unit ?? '',
    image: product?.image ?? '',
    tags: product?.tags?.join(', ') ?? '',
    featured: product?.featured ?? false,
    bestSeller: product?.bestSeller ?? false,
    isNew: product?.isNew ?? false,
    active: product?.active ?? true,
    stockStatus: product?.stockStatus ?? 'in_stock',
    seoTitle: product?.seoTitle ?? '',
    seoDescription: product?.seoDescription ?? '',
  };
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm] = useState<FormState>(toFormState(product));
  const [imagePath, setImagePath] = useState(product?.image ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !product) return; // image upload requires an existing product id
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append('file', file);
    const res = await fetch(`/api/admin/products/${product.id}/images`, { method: 'POST', body });
    setUploading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Image upload failed.');
      return;
    }
    const data = await res.json();
    setImagePath(data.path);
    update('image', data.path);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      images: imagePath ? [imagePath] : [],
      image: imagePath || form.image,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      availableSizes: product?.availableSizes ?? [{ label: form.unit || '100g', price: form.price }],
      inStock: form.stockStatus !== 'out_of_stock',
    };

    const res = await fetch(isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Failed to save product.');
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">SKU</label>
          <input
            required
            value={form.sku}
            onChange={(e) => update('sku', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
          <select
            required
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="">Select category…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Price (INR)</label>
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Unit (e.g. 100g)</label>
          <input
            required
            value={form.unit}
            onChange={(e) => update('unit', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Stock status</label>
          <select
            value={form.stockStatus}
            onChange={(e) => update('stockStatus', e.target.value as FormState['stockStatus'])}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Short description</label>
        <textarea
          required
          rows={2}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Full description</label>
        <textarea
          required
          rows={4}
          value={form.longDescription}
          onChange={(e) => update('longDescription', e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Tags (comma separated)</label>
        <input
          value={form.tags}
          onChange={(e) => update('tags', e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Main image</label>
        {imagePath && (
          <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-stone-200 mb-2">
            <Image src={imagePath} alt="Product" fill className="object-cover" />
          </div>
        )}
        {product ? (
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="text-sm" />
        ) : (
          <p className="text-xs text-stone-500">Save the product first, then upload its image on the edit page.</p>
        )}
        {uploading && <p className="text-xs text-stone-500 mt-1">Uploading…</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">SEO title</label>
          <input
            value={form.seoTitle}
            onChange={(e) => update('seoTitle', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">SEO description</label>
          <input
            value={form.seoDescription}
            onChange={(e) => update('seoDescription', e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {(['featured', 'bestSeller', 'isNew', 'active'] as const).map((flag) => (
          <label key={flag} className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" checked={form[flag]} onChange={(e) => update(flag, e.target.checked)} />
            {flag === 'isNew' ? 'New product' : flag.charAt(0).toUpperCase() + flag.slice(1)}
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
