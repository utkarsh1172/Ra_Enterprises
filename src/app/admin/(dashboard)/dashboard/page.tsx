import Link from 'next/link';
import { listProducts } from '@/lib/db/productRepository';
import { listCategories } from '@/lib/db/categoryRepository';

export const dynamic = 'force-dynamic';

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-stone-900">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([listProducts(), listCategories()]);

  const active = products.filter((p) => p.active);
  const inactive = products.filter((p) => !p.active);
  const featured = products.filter((p) => p.featured);

  const recentlyCreated = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
  const recentlyUpdated = [...products]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Active" value={active.length} />
        <StatCard label="Inactive" value={inactive.length} />
        <StatCard label="Featured" value={featured.length} />
        <StatCard label="Categories" value={categories.length} />
        <StatCard label="Active Categories" value={categories.filter((c) => c.active).length} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-bold text-stone-700 mb-3">Recently Created</h2>
          <ul className="divide-y divide-stone-100">
            {recentlyCreated.map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between text-sm">
                <Link href={`/admin/products/${p.id}`} className="text-stone-700 hover:text-amber-700">
                  {p.name}
                </Link>
                <span className="text-stone-400">{new Date(p.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-bold text-stone-700 mb-3">Recently Updated</h2>
          <ul className="divide-y divide-stone-100">
            {recentlyUpdated.map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between text-sm">
                <Link href={`/admin/products/${p.id}`} className="text-stone-700 hover:text-amber-700">
                  {p.name}
                </Link>
                <span className="text-stone-400">{new Date(p.updatedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
