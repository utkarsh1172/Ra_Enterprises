import { NextRequest, NextResponse } from 'next/server';
import { listActiveProducts, listProductsByCategory, listFeaturedProducts } from '@/lib/db/productRepository';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  let products = featured === 'true'
    ? await listFeaturedProducts()
    : category
    ? await listProductsByCategory(category)
    : await listActiveProducts();

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ products });
}
