import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/admin-auth';
import { getAllCollections, createCollection } from '@/lib/db/collections';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collections = await getAllCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Collections GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newCollection = await createCollection(body);
    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.error('Collections POST error:', error);
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}
