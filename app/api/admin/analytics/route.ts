import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/admin-auth';
import { getAllProducts } from '@/lib/db/products';
import { getAllOrders } from '@/lib/db/orders';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [products, orders] = await Promise.all([
      getAllProducts(),
      getAllOrders()
    ]);

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.total || 0);
    }, 0);

    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    const topProducts = products
      .filter((p) => p.sold && p.sold > 0)
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 5)
      .map((p) => ({
        name: p.name,
        sold: p.sold || 0,
      }));

    return NextResponse.json({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      avgOrderValue,
      topProducts,
      recentOrders: [],
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
      topProducts: [],
      recentOrders: [],
    });
  }
}
