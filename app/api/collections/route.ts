import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/storage';

export async function GET() {
  try {
    const collections = readJSON('collections.json');
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Public collections API error:', error);
    return NextResponse.json([]);
  }
}
