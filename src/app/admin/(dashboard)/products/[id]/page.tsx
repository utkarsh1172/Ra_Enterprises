import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductById } from '@/lib/db/productRepository';

export default async function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">{product.name}</h1>
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Edit
        </Link>
      </div>

      <div className="relative h-48 w-48 rounded-xl overflow-hidden border border-stone-200">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div><dt className="text-stone-400">SKU</dt><dd className="text-stone-800">{product.sku}</dd></div>
        <div><dt className="text-stone-400">Category</dt><dd className="text-stone-800">{product.category}</dd></div>
        <div><dt className="text-stone-400">Price</dt><dd className="text-stone-800">₹{product.price} / {product.unit}</dd></div>
        <div><dt className="text-stone-400">Stock status</dt><dd className="text-stone-800">{product.stockStatus}</dd></div>
        <div><dt className="text-stone-400">Active</dt><dd className="text-stone-800">{product.active ? 'Yes' : 'No'}</dd></div>
        <div><dt className="text-stone-400">Featured</dt><dd className="text-stone-800">{product.featured ? 'Yes' : 'No'}</dd></div>
        <div><dt className="text-stone-400">Created</dt><dd className="text-stone-800">{new Date(product.createdAt).toLocaleString()}</dd></div>
        <div><dt className="text-stone-400">Updated</dt><dd className="text-stone-800">{new Date(product.updatedAt).toLocaleString()}</dd></div>
      </dl>

      <div>
        <h2 className="text-sm font-bold text-stone-700 mb-1">Description</h2>
        <p className="text-sm text-stone-600">{product.description}</p>
      </div>
    </div>
  );
}
