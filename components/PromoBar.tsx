"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("promo-bar-dismissed");
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("promo-bar-dismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground text-sm py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>🌸 FREE ONGKIR untuk pembelian di atas Rp100.000</span>
        <button
          onClick={handleDismiss}
          className="ml-2 hover:opacity-70 transition-opacity"
          aria-label="Tutup promo"
        >
          <X className="w-4 h-4" />
        </button>
        <a href="/collections/all" className="underline font-medium">
          Belanja sekarang →
        </a>
      </div>
    </div>
  );
}
