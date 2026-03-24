import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/storage';
import { verifyToken } from '@/lib/admin-auth';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const orders: any[] = readJSON('orders.json');

    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update allowed fields
    if (body.orderStatus) {
      orders[index].orderStatus = body.orderStatus;
    }
    if (body.paymentStatus) {
      orders[index].paymentStatus = body.paymentStatus;
    }
    if (body.notes) {
      orders[index].adminNotes = body.notes;
    }
    orders[index].updatedAt = new Date().toISOString();

    writeJSON('orders.json', orders);

    return NextResponse.json({ success: true, order: orders[index] });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const orders: any[] = readJSON('orders.json');
    const order = orders.find((o) => o.id === id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
