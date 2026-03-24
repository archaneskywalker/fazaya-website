"use client";

import Link from "next/link";
import { formatIDR } from "@/lib/utils/format";
import { useCart } from "@/components/CartContext";
import { ShoppingCart, Trash2, Minus, Plus, MessageCircle } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  const handleCheckout = () => {
    const message = `Halo Fazaya! 🌸 Saya ingin memesan:\n\n${items
      .map((i) => `- ${i.name} (${i.color}) x${i.quantity} = ${formatIDR(i.price * i.quantity)}`)
      .join("\n")}\n\nTotal: ${formatIDR(total)}\n\nMohon konfirmasi ketersediaan. Terima kasih!`;
    window.open(`https://wa.me/6282201626070?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-heading text-3xl font-semibold mb-4">Keranjang Kosong</h1>
          <p className="text-muted-foreground mb-8">
            Belum ada produk di keranjang kamu
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-8">
          Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="flex gap-4 p-4 bg-card border rounded-2xl"
              >
                {/* Product Image */}
                <div className="w-24 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-medium text-lg mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Warna: {item.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatIDR(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {formatIDR(item.price)} / pcs
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="text-muted-foreground hover:text-destructive transition-colors self-start"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Hapus Semua Item
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-2xl p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold mb-6">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatIDR(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pengiriman</span>
                  <span className="text-primary font-medium">FREE Ongkir*</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatIDR(total)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                *Free ongkir untuk pembelian di atas Rp100.000
              </p>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Checkout via WhatsApp
              </button>

              <Link
                href="/collections/all"
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
