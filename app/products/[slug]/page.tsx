import { products } from "@/lib/data/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const similarProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} similarProducts={similarProducts} />;
}
