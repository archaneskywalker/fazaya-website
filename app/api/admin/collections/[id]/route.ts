import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/storage';
import { verifyToken } from '@/lib/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const collections = readJSON('collections.json');
    const collection = collections.find((c: any) => c.slug === id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Collection GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const collections = readJSON('collections.json');

    const index = collections.findIndex((c: any) => c.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const updatedCollection = { ...(collections[index] as object), ...body };
    collections[index] = updatedCollection as any;
    writeJSON('collections.json', collections);

    return NextResponse.json(collections[index]);
  } catch (error) {
    console.error('Collection PUT error:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const collections = readJSON('collections.json');
    const filteredCollections = collections.filter((c: any) => c.slug !== id);

    if (filteredCollections.length === collections.length) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    writeJSON('collections.json', filteredCollections);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Collection DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}
