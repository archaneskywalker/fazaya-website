"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatIDR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Filter } from "lucide-react";
import { useCart } from "@/components/CartContext";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter states
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);

  useEffect(() => {
    // Add timestamp to prevent caching
    fetch("/api/products?t=" + Date.now(), {
      cache: 'no-store',
    })
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

  // Get unique collections from products
  const collections = Array.from(new Set(products.map((p) => p.collection)));

  // Get unique colors from products
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    // Collection filter
    if (selectedCollections.length > 0 && !selectedCollections.includes(product.collection)) {
      return false;
    }

    // Color filter
    if (selectedColors.length > 0) {
      const hasSelectedColor = product.colors.some((color) =>
        selectedColors.some((selected) =>
          color.toLowerCase().includes(selected.toLowerCase())
        )
      );
      if (!hasSelectedColor) return false;
    }

    // Price filter
    if (selectedPriceRange) {
      if (selectedPriceRange === "under-200k" && product.price >= 200000) return false;
      if (selectedPriceRange === "200k-300k" && (product.price < 200000 || product.price > 300000)) return false;
      if (selectedPriceRange === "above-300k" && product.price <= 300000) return false;
    }

    // Sale filter
    if (showOnSaleOnly && !product.originalPrice) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") return 0;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const handleCollectionChange = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((c) => c !== collection)
        : [...prev, collection]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
    setShowOnSaleOnly(false);
  };

  const activeFiltersCount =
    selectedCollections.length +
    selectedColors.length +
    (selectedPriceRange ? 1 : 0) +
    (showOnSaleOnly ? 1 : 0);

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
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-3xl md:text-4xl font-medium">
              Semua Koleksi
            </h1>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCollections.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCollectionChange(c)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1"
                >
                  {c}
                  <span onClick={(e) => { e.stopPropagation(); handleCollectionChange(c); }}>×</span>
                </button>
              ))}
              {selectedColors.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1"
                >
                  {c}
                  <span onClick={(e) => { e.stopPropagation(); handleColorChange(c); }}>×</span>
                </button>
              ))}
              {selectedPriceRange && (
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1"
                >
                  Price
                  <span>×</span>
                </button>
              )}
              {showOnSaleOnly && (
                <button
                  onClick={() => setShowOnSaleOnly(false)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1"
                >
                  On Sale
                  <span>×</span>
                </button>
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <DesktopFilters
                collections={collections}
                allColors={allColors}
                openFilter={openFilter}
                toggleFilter={toggleFilter}
                selectedCollections={selectedCollections}
                selectedColors={selectedColors}
                selectedPriceRange={selectedPriceRange}
                showOnSaleOnly={showOnSaleOnly}
                handleCollectionChange={handleCollectionChange}
                handleColorChange={handleColorChange}
                setSelectedPriceRange={setSelectedPriceRange}
                setShowOnSaleOnly={setShowOnSaleOnly}
              />
            </aside>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowMobileFilters(false)}
                />
                <div className="absolute right-0 top-0 h-full w-80 bg-background shadow-lg overflow-y-auto">
                  <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background">
                    <h2 className="font-heading text-lg font-semibold">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-muted rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <DesktopFilters
                      collections={collections}
                      allColors={allColors}
                      openFilter={openFilter}
                      toggleFilter={toggleFilter}
                      selectedCollections={selectedCollections}
                      selectedColors={selectedColors}
                      selectedPriceRange={selectedPriceRange}
                      showOnSaleOnly={showOnSaleOnly}
                      handleCollectionChange={handleCollectionChange}
                      handleColorChange={handleColorChange}
                      setSelectedPriceRange={setSelectedPriceRange}
                      setShowOnSaleOnly={setShowOnSaleOnly}
                    />
                  </div>
                </div>
              </div>
            )}

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

function DesktopFilters({
  collections,
  allColors,
  openFilter,
  toggleFilter,
  selectedCollections,
  selectedColors,
  selectedPriceRange,
  showOnSaleOnly,
  handleCollectionChange,
  handleColorChange,
  setSelectedPriceRange,
  setShowOnSaleOnly,
}: {
  collections: string[];
  allColors: string[];
  openFilter: string | null;
  toggleFilter: (filter: string) => void;
  selectedCollections: string[];
  selectedColors: string[];
  selectedPriceRange: string | null;
  showOnSaleOnly: boolean;
  handleCollectionChange: (collection: string) => void;
  handleColorChange: (color: string) => void;
  setSelectedPriceRange: (range: string | null) => void;
  setShowOnSaleOnly: (show: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Collections Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleFilter("collections")}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          <span>Kategori / Koleksi</span>
          <svg
            className={`w-4 h-4 transition-transform ${openFilter === "collections" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openFilter === "collections" && (
          <div className="space-y-2 mt-2">
            {collections.map((collection) => (
              <label key={collection} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCollections.includes(collection)}
                  onChange={() => handleCollectionChange(collection)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                {collection}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleFilter("colors")}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          <span>Warna</span>
          <svg
            className={`w-4 h-4 transition-transform ${openFilter === "colors" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openFilter === "colors" && (
          <div className="space-y-2 mt-2">
            {allColors.map((color) => (
              <label key={color} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleFilter("price")}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          <span>Harga</span>
          <svg
            className={`w-4 h-4 transition-transform ${openFilter === "price" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openFilter === "price" && (
          <div className="space-y-2 mt-2">
            {[
              { value: "under-200k", label: "Di bawah Rp200.000" },
              { value: "200k-300k", label: "Rp200.000 - Rp300.000" },
              { value: "above-300k", label: "Di atas Rp300.000" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === option.value}
                  onChange={() => setSelectedPriceRange(selectedPriceRange === option.value ? null : option.value)}
                  className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* On Sale Filter */}
      <div className="border-b pb-4">
        <label className="flex items-center justify-between w-full py-2 text-sm font-medium cursor-pointer">
          <span className="text-muted-foreground">Sedang Diskon</span>
          <input
            type="checkbox"
            checked={showOnSaleOnly}
            onChange={(e) => setShowOnSaleOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </label>
      </div>
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
