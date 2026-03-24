import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// Instagram icon SVG component
function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
    </svg>
  );
}

// TikTok icon SVG component
function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Fazaya" className="h-16 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Style For Enchanting Ladies. Hijab segi empat premium untuk wanita berdaya.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/fazaya_id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://tiktok.com/@fazaya.collection"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://shopee.co.id/fazaya.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                aria-label="Shopee"
              >
                <ShoppingCart className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bantuan Pelanggan */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Bantuan Pelanggan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/kontak" className="hover:text-foreground transition-colors">
                  Cara Order
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-foreground transition-colors">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Lacak Pesanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Kebijakan Pengiriman
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Kota Semarang, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="https://wa.me/6282201626070" className="hover:text-foreground transition-colors">
                  +62 882-0166-26070
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t mt-12 pt-8">
          <p className="text-sm text-muted-foreground mb-4">Metode Pembayaran</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-card border rounded-md text-sm font-medium">BCA</div>
            <div className="px-4 py-2 bg-card border rounded-md text-sm font-medium">Mandiri</div>
            <div className="px-4 py-2 bg-card border rounded-md text-sm font-medium">GoPay</div>
            <div className="px-4 py-2 bg-card border rounded-md text-sm font-medium">ShopeePay</div>
            <div className="px-4 py-2 bg-card border rounded-md text-sm font-medium">QRIS</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Fazaya. All rights reserved. | Kota Semarang 🌸
          </p>
        </div>
      </div>
    </footer>
  );
}
