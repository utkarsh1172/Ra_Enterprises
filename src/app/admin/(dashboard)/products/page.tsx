'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

type SortKey = 'name' | 'price' | 'updatedAt';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  async function load() {
    setError(null);
    const res = await fetch('/api/admin/products');
    if (!res.ok) {
      setError('Failed to load products.');
      return;
    }
    const data = await res.json();
    setProducts(data.products);
  }

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = await fetch('/api/admin/products');
      if (ignore) return;
      if (!res.ok) {
        setError('Failed to load products.');
        return;
      }
      const data = await res.json();
      if (!ignore) setProducts(data.products);
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products;
    if (statusFilter === 'active') list = list.filter((p) => p.active);
    if (statusFilter === 'inactive') list = list.filter((p) => !p.active);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'price') return a.price - b.price;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [products, search, statusFilter, sortKey]);

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    if (res.ok) load();
    else setError('Failed to delete product.');
  }

  async function toggleActive(product: Product) {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !product.active }),
    });
    if (res.ok) load();
  }

  async function toggleFeatured(product: Product) {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !product.featured }),
    });
    if (res.ok) load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          + Add Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by name or SKU…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm w-64 focus:border-amber-600 focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
        >
          <option value="updatedAt">Sort: Recently updated</option>
          <option value="name">Sort: Name</option>
          <option value="price">Sort: Price</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!products ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-stone-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-stone-800">{p.name}</td>
                  <td className="px-4 py-3 text-stone-500">{p.category}</td>
                  <td className="px-4 py-3 text-stone-500">₹{p.price}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.active ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(p)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.featured ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {p.featured ? 'Featured' : 'Not featured'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/products/${p.id}`} className="text-stone-600 hover:text-amber-700">
                      View
                    </Link>
                    <Link href={`/admin/products/${p.id}/edit`} className="text-stone-600 hover:text-amber-700">
                      Edit
                    </Link>
                    <button onClick={() => setDeleteTarget(p)} className="text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
