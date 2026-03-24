"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, MessageCircle, Menu, Heart, User, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "./CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/collections/all", label: "Koleksi" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

const collectionLinks = [
  { href: "/collections/serena-series", label: "Serena Series" },
  { href: "/collections/jasmine-series", label: "Jasmine Series" },
  { href: "/collections/bloom-series", label: "Bloom Series" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-shadow",
        isScrolled && "shadow-md"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Fazaya" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* Collections Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Koleksi
                <svg className={`w-4 h-4 transition-transform ${isCollectionOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCollectionOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsCollectionOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20 py-2">
                    {collectionLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsCollectionOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden md:flex">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden md:flex">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden md:flex">
              <Heart className="w-5 h-5" />
            </button>

            <Link href="/keranjang" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link href="https://wa.me/6282201626070" className="p-2 hover:bg-muted rounded-full transition-colors">
              <MessageCircle className="w-5 h-5" />
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Koleksi</p>
                    {collectionLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
