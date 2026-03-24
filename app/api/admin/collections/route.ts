import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/storage';
import { verifyToken } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collections = readJSON('collections.json');
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
    const collections = readJSON('collections.json');

    const newCollection = {
      ...body,
      productCount: 0,
    };

    collections.push(newCollection);
    writeJSON('collections.json', collections);

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.error('Collections POST error:', error);
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}
