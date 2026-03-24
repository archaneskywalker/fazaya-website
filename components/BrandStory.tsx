import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-accent/30 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-6">
                &quot;Setiap perempuan berhak tampil memukau dengan caranya sendiri.&quot;
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Fazaya hadir untuk menemani perjalananmu dalam menampilkan versi terbaik dari diri sendiri.
                Dengan keyakinan bahwa setiap perempuan adalah pribadi yang memukau, kami berkomitmen
                menghadirkan hijab berkualitas dengan desain yang elegan dan tetap sesuai syariat.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Dari Semarang, kami melayani ribuan wanita berdaya di seluruh Indonesia dengan bangga.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-portrait rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://picsum.photos/seed/fazaya-story/600/800"
                  alt="Tentang Fazaya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Belanja Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
