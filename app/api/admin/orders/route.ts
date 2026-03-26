import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/admin-auth';
import { getAllOrders, createOrder, deleteOrder, deleteAllOrders } from '@/lib/db/orders';
import { getAllProducts, updateProduct } from '@/lib/db/products';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newOrder = await createOrder(body);

    // Update product sold count
    const products = await getAllProducts();
    for (const item of body.items) {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        await updateProduct(product.id, { sold: (product.sold || 0) + item.quantity });
      }
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      await deleteOrder(orderId);
      return NextResponse.json({ success: true });
    } else {
      await deleteAllOrders();
      return NextResponse.json({ success: true, message: 'All orders cleared' });
    }
  } catch (error) {
    console.error('Orders DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
