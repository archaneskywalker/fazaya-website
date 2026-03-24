import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aulia Rahman",
    city: "Jakarta",
    rating: 5,
    quote: "Bahannya halus banget dan nggak mudah kusut. Warna juga sesuai sama gambar. Definitely will order again!",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    city: "Bandung",
    rating: 5,
    quote: "Suka banget sama Serena Series! Motifnya elegant, cocok buat acara formal. Pengiriman juga cepet.",
  },
  {
    id: 3,
    name: "Rina Amelia",
    city: "Semarang",
    rating: 5,
    quote: "Jasmine Series palette warna-warnanya cantik semua! Bahan lembut dan nggak nerawang. Recommended!",
  },
];

export function Testimonials() {
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3">
            Kata Mereka 💬
          </h2>
          <p className="text-muted-foreground">
            Apa kata pelanggan setia Fazaya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-heading font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
