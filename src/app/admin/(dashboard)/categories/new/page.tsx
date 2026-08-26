import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-stone-900">Add Category</h1>
      <CategoryForm />
    </div>
  );
}
