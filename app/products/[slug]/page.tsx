import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug, getAllProducts } from "@/lib/db/products";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    // Get similar products from same collection
    const allProducts = await getAllProducts();
    const similarProducts = allProducts
      .filter((p) => p.collection === product.collection && p.id !== product.id)
      .slice(0, 4);

    // Map snake_case to camelCase
    const mappedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.original_price ?? undefined,
      collection: product.collection,
      colors: product.colors,
      image: product.image,
      images: product.images,
      description: product.description,
      material: product.material,
      care: product.care,
      size: product.size,
      isNew: product.is_new,
      isPromo: product.is_promo,
      rating: product.rating ?? undefined,
      sold: product.sold,
    };

    const mappedSimilarProducts = similarProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      originalPrice: p.original_price ?? undefined,
      collection: p.collection,
      colors: p.colors,
      image: p.image,
      images: p.images,
      description: p.description,
      material: p.material,
      care: p.care,
      size: p.size,
      isNew: p.is_new,
      isPromo: p.is_promo,
      rating: p.rating ?? undefined,
      sold: p.sold,
    }));

    return <ProductDetail product={mappedProduct} similarProducts={mappedSimilarProducts} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
