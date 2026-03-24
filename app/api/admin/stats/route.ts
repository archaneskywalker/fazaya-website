import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/storage';
import { verifyToken } from '@/lib/admin-auth';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify auth
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = readJSON('products.json');
    const collections = readJSON('collections.json');
    const orders = readJSON('orders.json');

    const totalRevenue = orders.reduce((sum, order: any) => {
      return sum + (order.total || 0);
    }, 0);

    return NextResponse.json({
      totalProducts: products.length,
      totalCollections: collections.length,
      totalOrders: orders.length,
      totalRevenue,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      {
        totalProducts: 0,
        totalCollections: 0,
        totalOrders: 0,
        totalRevenue: 0,
      },
      { status: 200 }
    );
  }
}
