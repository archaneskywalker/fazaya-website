import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Floral SVG Decoration */}
      <svg
        className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M200 400c0-50 30-80 60-100s50-30 50-60-20-50-50-70-70-30-100-30-80 10-110 30-50 40-50 70 20 40 50 60 60 50 60 100-30 80-60 100-50 30-50 60 20 50 50 70 70 30 100 30 80-10 110-30 50-40 50-70-20-40-50-60-60-50-60-100z"
          fill="currentColor"
          className="text-primary"
        />
      </svg>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <img src="/logo.png" alt="Fazaya" className="h-20 md:h-24 w-auto mx-auto mb-8" />

          {/* Heading */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium mb-6 leading-tight">
            <span className="block">Style For</span>
            <span className="block font-normal italic">Enchanting Ladies</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Hijab segi empat premium untuk wanita berdaya. Tampil memukau dengan cara Anda sendiri.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/collections/all">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full"
              >
                Belanja Sekarang
              </Button>
            </Link>
            <Link href="/tentang-kami">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-base rounded-full"
              >
                Tentang Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
