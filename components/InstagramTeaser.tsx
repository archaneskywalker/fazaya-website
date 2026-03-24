import Link from "next/link";

// Instagram icon SVG component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const images = [
  "https://picsum.photos/seed/ig1/300/300",
  "https://picsum.photos/seed/ig2/300/300",
  "https://picsum.photos/seed/ig3/300/300",
  "https://picsum.photos/seed/ig4/300/300",
  "https://picsum.photos/seed/ig5/300/300",
  "https://picsum.photos/seed/ig6/300/300",
];

export function InstagramTeaser() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3">
            Follow @fazaya_id
          </h2>
          <p className="text-muted-foreground">
            Update terbaru dari Instagram kami
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {images.map((src, index) => (
            <a
              key={index}
              href="https://instagram.com/fazaya_id"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <img
                src={src}
                alt={`Instagram ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="https://instagram.com/fazaya_id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Lihat di Instagram <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
