"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatIDR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  collection: string;
  colors: string[];
  image: string;
  images?: string[];
  isNew?: boolean;
  isPromo?: boolean;
  rating?: number | null;
  sold?: number;
  description: string;
}

export default function AllCollectionsPage() {
  const [sortBy, setSortBy] = useState("newest");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "newest") return 0;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb & Title */}
      <section className="pt-8 pb-6">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Semua Koleksi</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-medium">
            Semua Koleksi
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    FILTER BY:
                  </span>
                </div>
                {/* Filter sections */}
                <div className="border rounded-md mb-2">
                  <button
                    onClick={() => toggleFilter("category")}
                    className="w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
                  >
                    CATEGORY
                    <svg className={cn("w-4 h-4 transition-transform", openFilter === "category" && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === "category" && (
                    <div className="px-4 pb-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Serena Series
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Jasmine Series
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Bloom Series
                      </label>
                    </div>
                  )}
                </div>
                <div className="border rounded-md mb-2">
                  <button
                    onClick={() => toggleFilter("color")}
                    className="w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
                  >
                    COLOR
                    <svg className={cn("w-4 h-4 transition-transform", openFilter === "color" && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === "color" && (
                    <div className="px-4 pb-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Black
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Brown
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Beige
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Green
                      </label>
                    </div>
                  )}
                </div>
                <div className="border rounded-md mb-2">
                  <button
                    onClick={() => toggleFilter("price")}
                    className="w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
                  >
                    PRICE
                    <svg className={cn("w-4 h-4 transition-transform", openFilter === "price" && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === "price" && (
                    <div className="px-4 pb-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Under Rp 200.000
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Rp 200.000 - Rp 300.000
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Above Rp 300.000
                      </label>
                    </div>
                  )}
                </div>
                <div className="border rounded-md mb-2">
                  <button
                    onClick={() => toggleFilter("type")}
                    className="w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
                  >
                    TYPE
                    <svg className={cn("w-4 h-4 transition-transform", openFilter === "type" && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === "type" && (
                    <div className="px-4 pb-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Segi Empat
                      </label>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        Pashmina
                      </label>
                    </div>
                  )}
                </div>
                <div className="border rounded-md mb-2">
                  <button
                    onClick={() => toggleFilter("discount")}
                    className="w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
                  >
                    DISCOUNT
                    <svg className={cn("w-4 h-4 transition-transform", openFilter === "discount" && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === "discount" && (
                    <div className="px-4 pb-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" />
                        On Sale
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex items-center justify-end mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">SORT BY</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground py-12">
                    No products available
                  </div>
                ) : (
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
}: {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isPromo?: boolean;
}) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, price, color: "Default", image });
  };

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="relative">
        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
        <div className="relative overflow-hidden rounded-sm bg-muted aspect-portrait">
          <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1">NEW</Badge>
            )}
            {isPromo && (
              <Badge className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1">PROMO</Badge>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-md"
            aria-label="Tambah ke keranjang"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {name}
          </h3>
          <span className="font-semibold text-foreground text-sm">{formatIDR(price)}</span>
          {originalPrice && (
            <div className="mt-1">
              <span className="text-xs text-muted-foreground line-through">{formatIDR(originalPrice)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
