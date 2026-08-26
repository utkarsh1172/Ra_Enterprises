'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/types';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  async function load() {
    const res = await fetch('/api/admin/categories');
    if (!res.ok) {
      setError('Failed to load categories.');
      return;
    }
    const data = await res.json();
    setCategories(data.categories);
  }

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = await fetch('/api/admin/categories');
      if (ignore) return;
      if (!res.ok) {
        setError('Failed to load categories.');
        return;
      }
      const data = await res.json();
      if (!ignore) setCategories(data.categories);
    })();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    if (res.ok) load();
    else setError('Failed to delete category.');
  }

  async function toggleActive(category: Category) {
    const res = await fetch(`/api/admin/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !category.active }),
    });
    if (res.ok) load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          + Add Category
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!categories ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-stone-500">No categories yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wide text-stone-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-stone-800">{c.name}</td>
                  <td className="px-4 py-3 text-stone-500">{c.slug}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(c)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/categories/${c.id}/edit`} className="text-stone-600 hover:text-amber-700">
                      Edit
                    </Link>
                    <button onClick={() => setDeleteTarget(c)} className="text-red-600 hover:text-red-700">
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
        title="Delete category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Products already assigned to it will keep the old category value.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
