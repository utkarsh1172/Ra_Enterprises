import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/requireAdmin';
import { getCategoryById, updateCategory, deleteCategory } from '@/lib/db/categoryRepository';
import { categoryUpdateSchema } from '@/lib/validations/product';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const existing = await getCategoryById(id);
  if (!existing) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

  const body = await request.json().catch(() => null);
  const parsed = categoryUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  const category = await updateCategory(id, parsed.data);
  return NextResponse.json({ category });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const existing = await getCategoryById(id);
  if (!existing) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

  await deleteCategory(id);
  return NextResponse.json({ success: true });
}
