import { NextResponse } from 'next/server';
import { listActiveCategories } from '@/lib/db/categoryRepository';

export async function GET() {
  const categories = await listActiveCategories();
  return NextResponse.json({ categories });
}
