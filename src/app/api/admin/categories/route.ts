import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/requireAdmin';
import { listCategories, createCategory } from '@/lib/db/categoryRepository';
import { categoryInputSchema } from '@/lib/validations/product';

export async function GET() {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const categories = await listCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const body = await request.json().catch(() => null);
  const parsed = categoryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const category = await createCategory(parsed.data);
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to create category' }, { status: 400 });
  }
}
