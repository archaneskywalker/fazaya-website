"use client";

import { useEffect, useState } from "react";
import { formatIDR } from "@/lib/utils/format";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No orders yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Items</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4 font-medium">#{order.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <div>{order.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customerPhone}
                    </div>
                  </td>
                  <td className="p-4">
                    {order.items.length} item(s)
                  </td>
                  <td className="p-4 font-medium">
                    {formatIDR(order.total)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 ${getStatusColor(order.status)} text-white text-xs rounded-full`}
                    >
                      {status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
