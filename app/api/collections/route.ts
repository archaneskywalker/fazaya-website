import { NextResponse } from 'next/server';
import { getAllCollections } from '@/lib/db/collections';

export async function GET() {
  try {
    const collections = await getAllCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Public collections API error:', error);
    return NextResponse.json([]);
  }
}
