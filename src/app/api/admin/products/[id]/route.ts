import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/requireAdmin';
import { getProductById, updateProduct, deleteProduct } from '@/lib/db/productRepository';
import { productUpdateSchema } from '@/lib/validations/product';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const existing = await getProductById(id);
  if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const body = await request.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  const product = await updateProduct(id, parsed.data, session.user.email ?? undefined);
  return NextResponse.json({ product });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const existing = await getProductById(id);
  if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
