"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Tags, ShoppingCart, TrendingUp } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalCollections: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCollections: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "text-blue-500",
    },
    {
      title: "Collections",
      value: stats.totalCollections,
      icon: Tags,
      href: "/admin/collections",
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "text-orange-500",
    },
    {
      title: "Total Revenue",
      value: `Rp ${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      href: "/admin/analytics",
      color: "text-emerald-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Fazaya admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <Icon className={cn("w-10 h-10", stat.color)} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/collections/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Add New Collection
          </Link>
          <Link
            href="/admin/orders"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Recent Orders
        </h2>
        <div className="text-muted-foreground text-center py-8">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No recent orders</p>
          <Link
            href="/admin/orders"
            className="text-primary hover:underline mt-2 inline-block"
          >
            View all orders
          </Link>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
