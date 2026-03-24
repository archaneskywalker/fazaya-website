"use client";

import { useEffect, useState } from "react";
import { formatIDR } from "@/lib/utils/format";
import { Check, X } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: Array<{
    id: string;
    name: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  notes: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, orderStatus: newStatus, updatedAt: new Date().toISOString() }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
          <div className="space-y-4 p-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-muted p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      {expandedOrder === order.id ? "Hide Details" : "View Details"}
                    </button>
                    <span className="font-medium">#{order.id}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 ${getStatusColor(order.orderStatus)} text-xs rounded-full border`}
                    >
                      {order.orderStatus.toUpperCase()}
                    </span>
                    {order.orderStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(order.id, "processing")}
                          disabled={updatingId === order.id}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order.id, "cancelled")}
                          disabled={updatingId === order.id}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="p-4 space-y-4">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span> {order.customerName}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span> {order.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span> {order.phone}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payment:</span> {order.paymentMethod.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <p className="text-sm">{order.address}</p>
                      <p className="text-sm">{order.city}, {order.province} {order.postalCode}</p>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-2 bg-card border rounded">
                            <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity} x {formatIDR(item.price)}</p>
                            </div>
                            <p className="font-medium">{formatIDR(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4 flex justify-end">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-8">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>{formatIDR(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span className="text-muted-foreground">Shipping:</span>
                          <span>{order.shippingCost === 0 ? "FREE" : formatIDR(order.shippingCost)}</span>
                        </div>
                        <div className="flex justify-between gap-8 font-semibold text-base">
                          <span>Total:</span>
                          <span className="text-primary">{formatIDR(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div>
                        <h4 className="font-semibold mb-2">Customer Notes</h4>
                        <p className="text-sm text-muted-foreground italic">{order.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
