"use client";

import Link from "next/link";
import { formatIDR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
    isPromo?: boolean;
  }>;
  title?: string;
  viewAllHref?: string;
}

export function ProductGrid({ products, title, viewAllHref }: ProductGridProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {title && (
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              {title}
            </h2>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                Lihat Semua
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  isNew,
  isPromo,
}: ProductGridProps["products"][0]) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      color: "Default",
      image,
    });
  };

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-portrait">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1">
              NEW
            </Badge>
          )}
          {isPromo && (
            <Badge className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1">
              PROMO
            </Badge>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-md"
          aria-label="Tambah ke keranjang"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-heading font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatIDR(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatIDR(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
