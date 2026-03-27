import { HeroSection } from "@/components/HeroSection";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { ProductGrid } from "@/components/ProductGrid";
import { BrandStory } from "@/components/BrandStory";
import { Testimonials } from "@/components/Testimonials";
import { InstagramTeaser } from "@/components/InstagramTeaser";
import { products, collections } from "@/lib/data/products";
import { getAllProducts } from "@/lib/db/products";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let newProducts = [];

  try {
    // Fetch products from Supabase
    const allProducts = await getAllProducts();
    newProducts = allProducts.filter(p => p.is_new).slice(0, 8);
  } catch (error) {
    // Fallback to static data if Supabase not configured
    console.log('Using fallback data:', error);
    newProducts = products.filter(p => p.isNew).slice(0, 8);
  }

  // Map snake_case to camelCase for components
  const mappedProducts = newProducts.map(p => ({
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

  return (
    <>
      <HeroSection />
      <FeaturedCollections collections={collections} />
      <ProductGrid
        products={mappedProducts}
        title="Produk Terbaru"
        viewAllHref="/collections/all"
      />
      <BrandStory />
      <Testimonials />
      <InstagramTeaser />

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
              Dapatkan Info Terbaru
            </h2>
            <p className="text-muted-foreground mb-6">
              Berlangganan newsletter untuk update koleksi baru dan promo eksklusif
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email kamu"
                className="flex-1 px-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
