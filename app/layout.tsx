import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/components/CartContext";

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fazaya | Style For Enchanting Ladies",
  description: "Hijab segi empat premium untuk wanita berdaya. Temukan koleksi Serena, Jasmine, dan Bloom Series dengan kualitas terbaik.",
  keywords: "fazaya, hijab, segi empat, modestwear, muslim fashion, hijab premium",
  authors: [{ name: "Fazaya" }],
  openGraph: {
    title: "Fazaya | Style For Enchanting Ladies",
    description: "Hijab segi empat premium untuk wanita berdaya",
    url: "https://fazaya.id",
    siteName: "Fazaya",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(dmSans.variable, cormorantGaramond.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
