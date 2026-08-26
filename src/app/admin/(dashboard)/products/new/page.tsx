import { listCategories } from '@/lib/db/categoryRepository';
import ProductForm from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const categories = await listCategories();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-stone-900">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
