import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Public products API error:', error);
    // Return empty array if error
    return NextResponse.json([]);
  }
}
