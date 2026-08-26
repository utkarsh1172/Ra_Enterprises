import { notFound } from 'next/navigation';
import { getCategoryById } from '@/lib/db/categoryRepository';
import CategoryForm from '@/components/admin/CategoryForm';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-stone-900">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
