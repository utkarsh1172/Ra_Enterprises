import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/requireAdmin';
import { listProducts, createProduct } from '@/lib/db/productRepository';
import { productInputSchema } from '@/lib/validations/product';

export async function GET() {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const products = await listProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const body = await request.json().catch(() => null);
  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const product = await createProduct({ ...parsed.data, createdBy: session.user.email ?? undefined });
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to create product' }, { status: 400 });
  }
}
