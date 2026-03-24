import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="text-sm text-muted-foreground mb-4">
              <a href="/" className="hover:text-foreground transition-colors">Beranda</a>
              <span className="mx-2">/</span>
              <span className="text-foreground">Tentang Kami</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
              Tentang Fazaya
            </h1>
            <p className="text-lg text-muted-foreground">
              Style For Enchanting Ladies
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
                Cerita Kami
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fazaya hadir untuk menemani perjalananmu dalam menampilkan versi terbaik dari diri sendiri.
                Dengan keyakinan bahwa setiap perempuan adalah pribadi yang memukau, kami berkomitmen
                menghadirkan hijab berkualitas dengan desain yang elegan dan tetap sesuai syariat.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Berbasis di Kota Semarang, Jawa Tengah, kami melayani ribuan wanita berdaya di seluruh
                Indonesia dengan bangga. Setiap helai kain yang kami pilih mewakili komitmen kami terhadap
                kualitas dan kenyamanan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Kami percaya bahwa hijab bukan sekadar penutup, melainkan ekspresi diri dan identitas
                seorang muslimah. Fazaya hadir untuk mendukung setiap langkahmu meraih mimpi dan
                meraih kesuksesan.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-portrait rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://picsum.photos/seed/fazaya-about/600/800"
                  alt="Tentang Fazaya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-12">
            Nilai-Nilai Fazaya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Kualitas */}
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Kualitas</h3>
              <p className="text-muted-foreground">
                Bahan premium pilihan yang nyaman dan tahan lama untuk menemani aktivitas sehari-harimu
              </p>
            </div>

            {/* Keanggunan */}
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Keanggunan</h3>
              <p className="text-muted-foreground">
                Desain elegan dan feminine yang membuatmu tampil memukau dalam setiap kesempatan
              </p>
            </div>

            {/* Kepercayaan */}
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Kepercayaan</h3>
              <p className="text-muted-foreground">
                Mendorong setiap perempuan untuk percaya diri menjadi versi terbaik dari diri mereka
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-accent/30 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
              Temukan Koleksi Fazaya
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Jelajahi rangkaian koleksi hijab premium kami dan temukan gaya yang paling cocok untukmu
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Belanja Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
