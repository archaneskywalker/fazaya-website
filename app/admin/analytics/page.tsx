"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Package, ShoppingCart, Users } from "lucide-react";

interface Analytics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  topProducts: Array<{
    name: string;
    sold: number;
  }>;
  recentOrders: number[];
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold">
                Rp {analytics?.totalRevenue.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-semibold">
                {analytics?.totalOrders || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Products</p>
              <p className="text-2xl font-semibold">
                {analytics?.totalProducts || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-semibold">
                Rp {analytics?.avgOrderValue.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Top Selling Products
        </h2>
        {analytics?.topProducts && analytics.topProducts.length > 0 ? (
          <div className="space-y-3">
            {analytics.topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span>{product.name}</span>
                </div>
                <span className="font-medium">{product.sold} sold</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No product sales data yet
          </p>
        )}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Revenue Overview
        </h2>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Revenue chart will be displayed here</p>
            <p className="text-sm mt-1">Connect a charting library for visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}
