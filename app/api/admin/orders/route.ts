import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/storage';
import { verifyToken } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = readJSON('orders.json');
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orders: any[] = readJSON('orders.json');

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      province: body.province,
      postalCode: body.postalCode,
      items: body.items,
      subtotal: body.subtotal,
      shippingCost: body.shippingCost || 0,
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      notes: body.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    writeJSON('orders.json', orders);

    // Update product sold count
    const products: any[] = readJSON('products.json');
    body.items.forEach((item: any) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        product.sold = (product.sold || 0) + item.quantity;
      }
    });
    writeJSON('products.json', products);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
