import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/db/productRepository';
import { listCategories } from '@/lib/db/categoryRepository';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), listCategories()]);
  if (!product) notFound();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-stone-900">Edit Product</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
