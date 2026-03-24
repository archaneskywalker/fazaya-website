import Link from "next/link";
import { formatIDR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isPromo?: boolean;
  collection?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  isNew,
  isPromo,
}: ProductCardProps) {
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

        {/* Badges */}
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

        {/* Add to Cart Button (appears on hover) */}
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
