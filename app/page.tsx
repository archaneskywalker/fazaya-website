import { HeroSection } from "@/components/HeroSection";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { ProductGrid } from "@/components/ProductGrid";
import { BrandStory } from "@/components/BrandStory";
import { Testimonials } from "@/components/Testimonials";
import { InstagramTeaser } from "@/components/InstagramTeaser";
import { collections, products } from "@/lib/data/products";

// Force dynamic rendering to avoid @base-ui/react static generation issues
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const newProducts = products.filter(p => p.isNew).slice(0, 8);

  return (
    <>
      <HeroSection />
      <FeaturedCollections collections={collections} />
      <ProductGrid
        products={newProducts}
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
