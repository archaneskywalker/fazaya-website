import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedCollectionsProps {
  collections: Array<{
    name: string;
    slug: string;
    description: string;
    image: string;
  }>;
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3">
            Koleksi Kami
          </h2>
          <p className="text-muted-foreground">
            Temukan rangkaian koleksi hijab premium untuk setiap ocasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square bg-muted">
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-heading text-2xl font-semibold mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                    Lihat Koleksi <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
