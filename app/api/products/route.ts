import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/storage';

export async function GET() {
  try {
    const products = readJSON('products.json');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Public products API error:', error);
    // Return empty array if file doesn't exist
    return NextResponse.json([]);
  }
}
