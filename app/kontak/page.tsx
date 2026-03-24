"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

// Instagram icon SVG component
function InstagramIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
    </svg>
  );
}

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to WhatsApp
    const text = `Halo Fazaya! Saya ${formData.name} (${formData.email}).\n\nSubjek: ${formData.subject}\n\nPesan: ${formData.message}`;
    window.open(`https://wa.me/6282201626070?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <nav className="text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground transition-colors">Beranda</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">Kontak</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted-foreground">
            Kami siap melayani pertanyaan dan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-semibold mb-6">
                Informasi Kontak
              </h2>
              <p className="text-muted-foreground mb-6">
                Jangan ragu untuk menghubungi kami melalui WhatsApp, email, atau
                media sosial kami. Tim kami akan dengan senang hati membantu Anda.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/6282201626070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">
                      +62 882-0166-26070
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Respon cepat pada jam kerja (08.00 - 21.00 WIB)
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/fazaya_id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <InstagramIcon />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Instagram</h3>
                    <p className="text-muted-foreground text-sm">
                      @fazaya_id
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Follow untuk update koleksi terbaru
                    </p>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@fazaya.collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">TikTok</h3>
                    <p className="text-muted-foreground text-sm">
                      @fazaya.collection
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Konten eksklusif dan behind the scenes
                    </p>
                  </div>
                </a>

                {/* Shopee */}
                <a
                  href="https://shopee.co.id/fazaya.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Shopee</h3>
                    <p className="text-muted-foreground text-sm">
                      fazaya.id
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Belanja dengan promo dan cashback menarik
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-medium mb-2">Lokasi</h3>
              <p className="text-muted-foreground">
                Kota Semarang, Jawa Tengah, Indonesia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <h2 className="font-heading text-2xl font-semibold mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="email@contoh.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Subjek pesan Anda"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Kirim via WhatsApp
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Pesan Anda akan diteruskan ke WhatsApp kami untuk respon yang lebih cepat
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
