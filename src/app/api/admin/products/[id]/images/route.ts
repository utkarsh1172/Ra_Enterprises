import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { requireAdminSession } from '@/lib/requireAdmin';
import { getProductById } from '@/lib/db/productRepository';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'products');

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPEG, PNG, or WebP.' }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large. Max size is 5MB.' }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const safeName = `${product.id}-${Date.now()}.${extension}`;
  const filePath = path.join(UPLOAD_DIR, safeName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const publicPath = `/images/products/${safeName}`;
  return NextResponse.json({ path: publicPath }, { status: 201 });
}
