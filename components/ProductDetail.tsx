"use client";

import { useState } from "react";
import { formatIDR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailProps {
  product: {
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
    material?: string;
    care?: string;
    size?: string;
  };
  similarProducts: Array<{
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
  }>;
}

export function ProductDetail({ product, similarProducts }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const allImages = product.images || [product.image];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      image: product.image,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo Fazaya! 🌸 Saya ingin memesan:\n\n- ${product.name} (${selectedColor}) x${quantity}\n\nHarga: ${formatIDR(product.price * quantity)}\n\nMohon konfirmasi ketersediaan. Terima kasih!`;
    window.open(`https://wa.me/6282201626070?text=${encodeURIComponent(message)}`, "_blank");
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div>
      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">Beranda</a>
            <span className="mx-2">/</span>
            <a href="/collections/all" className="hover:text-foreground transition-colors">Koleksi</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-portrait rounded-2xl overflow-hidden bg-muted mb-4">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1">
                      NEW
                    </Badge>
                  )}
                  {product.isPromo && (
                    <Badge className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1">
                      PROMO
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-primary">
                  {formatIDR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!) ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.sold} terjual)
                  </span>
                </div>
              )}

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Warna: <span className="text-muted-foreground">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Jumlah</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 border border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pesan via WhatsApp
                </button>
              </div>

              {/* Description */}
              <div className="border-t pt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Deskripsi</p>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
                {product.material && (
                  <div>
                    <p className="text-sm font-medium mb-2">Bahan</p>
                    <p className="text-muted-foreground">{product.material}</p>
                  </div>
                )}
                {product.size && (
                  <div>
                    <p className="text-sm font-medium mb-2">Ukuran</p>
                    <p className="text-muted-foreground">{product.size}</p>
                  </div>
                )}
                {product.care && (
                  <div>
                    <p className="text-sm font-medium mb-2">Perawatan</p>
                    <p className="text-muted-foreground">{product.care}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8 text-center">
              Produk Serupa
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
