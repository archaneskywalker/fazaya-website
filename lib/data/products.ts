// Types only - for use in both client and server components
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  collection: string;
  colors: string[];
  image: string;
  images?: string[];
  isNew?: boolean;
  isPromo?: boolean;
  rating?: number | null;
  sold?: number;
  description: string;
  material?: string;
  care?: string;
  size: string;
}

export interface Collection {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Static fallback data (used when JSON file is not available)
export const products: Product[] = [
  {
    id: "1",
    name: "Serena Series",
    slug: "serena-series",
    price: 70999,
    originalPrice: 89999,
    collection: "serena",
    colors: ["Navy", "Pink", "Ungu"],
    image: "https://picsum.photos/seed/serena/600/800",
    images: [
      "https://picsum.photos/seed/serena/600/800",
      "https://picsum.photos/seed/serena2/600/800",
      "https://picsum.photos/seed/serena3/600/800",
      "https://picsum.photos/seed/serena4/600/800",
    ],
    isNew: true,
    isPromo: true,
    rating: 5.0,
    sold: 12,
    description: "Hijab segi empat dengan motif elegan, bahan voal premium anti-geser.",
    material: "Voal Premium",
    care: "Cuci tangan dengan air dingin, jangan gunakan pemutih",
    size: "115cm x 115cm",
  },
  {
    id: "2",
    name: "Jasmine Series - Palette Hijau",
    slug: "jasmine-hijau",
    price: 50000,
    originalPrice: 65000,
    collection: "jasmine",
    colors: ["Hijau Sage", "Olive", "Mint"],
    image: "https://picsum.photos/seed/jasmine-green/600/800",
    images: [
      "https://picsum.photos/seed/jasmine-green/600/800",
      "https://picsum.photos/seed/jasmine-green2/600/800",
    ],
    isNew: true,
    isPromo: true,
    rating: 5.0,
    sold: 1,
    description: "Hijab segi empat polos premium dengan warna-warna pilihan aesthetic.",
    material: "Polyester Premium",
    care: "Machine wash cold, hang dry",
    size: "115cm x 115cm",
  },
  {
    id: "3",
    name: "Jasmine Series - Palette Pink",
    slug: "jasmine-pink",
    price: 50000,
    originalPrice: 65000,
    collection: "jasmine",
    colors: ["Dusty Pink", "Blush", "Rose"],
    image: "https://picsum.photos/seed/jasmine-pink/600/800",
    images: [
      "https://picsum.photos/seed/jasmine-pink/600/800",
      "https://picsum.photos/seed/jasmine-pink2/600/800",
    ],
    isNew: true,
    isPromo: true,
    rating: null,
    sold: 0,
    description: "Hijab segi empat polos premium dengan palette pink aesthetic.",
    material: "Polyester Premium",
    care: "Machine wash cold, hang dry",
    size: "115cm x 115cm",
  },
  {
    id: "4",
    name: "Bloom Series",
    slug: "bloom-series",
    price: 60500,
    originalPrice: 75000,
    collection: "bloom",
    colors: ["Mint", "Peach", "Lavender"],
    image: "https://picsum.photos/seed/bloom/600/800",
    images: [
      "https://picsum.photos/seed/bloom/600/800",
      "https://picsum.photos/seed/bloom2/600/800",
    ],
    isNew: true,
    isPromo: true,
    rating: null,
    sold: 1,
    description: "Hijab segi empat motif bunga lembut, cocok untuk tampilan feminine.",
    material: "Voal Printing",
    care: "Hand wash recommended, do not bleach",
    size: "115cm x 115cm",
  },
  {
    id: "5",
    name: "Jasmine Series - Palette Biru",
    slug: "jasmine-biru",
    price: 50000,
    collection: "jasmine",
    colors: ["Navy", "Baby Blue", "Dusty Blue"],
    image: "https://picsum.photos/seed/jasmine-blue/600/800",
    images: [
      "https://picsum.photos/seed/jasmine-blue/600/800",
      "https://picsum.photos/seed/jasmine-blue2/600/800",
    ],
    isNew: false,
    isPromo: false,
    rating: null,
    sold: 0,
    description: "Hijab segi empat polos premium dengan palette biru aesthetic.",
    material: "Polyester Premium",
    care: "Machine wash cold, hang dry",
    size: "115cm x 115cm",
  },
  {
    id: "6",
    name: "Jasmine Series - Palette Coklat",
    slug: "jasmine-coklat",
    price: 50000,
    collection: "jasmine",
    colors: ["Coklat Susu", "Mocca", "Cream"],
    image: "https://picsum.photos/seed/jasmine-brown/600/800",
    images: [
      "https://picsum.photos/seed/jasmine-brown/600/800",
      "https://picsum.photos/seed/jasmine-brown2/600/800",
    ],
    isNew: false,
    isPromo: false,
    rating: null,
    sold: 0,
    description: "Hijab segi empat polos premium dengan palette coklat aesthetic.",
    material: "Polyester Premium",
    care: "Machine wash cold, hang dry",
    size: "115cm x 115cm",
  },
];

export const collections: Collection[] = [
  {
    name: "Serena Series",
    slug: "serena-series",
    description: "Motif elegan untuk tampilan sophisticated",
    image: "https://picsum.photos/seed/serena-collection/400/400",
    productCount: 6,
  },
  {
    name: "Jasmine Series",
    slug: "jasmine-series",
    description: "Polos premium dengan warna aesthetic",
    image: "https://picsum.photos/seed/jasmine-collection/400/400",
    productCount: 16,
  },
  {
    name: "Bloom Series",
    slug: "bloom-series",
    description: "Motif bunga feminine dan charming",
    image: "https://picsum.photos/seed/bloom-collection/400/400",
    productCount: 8,
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCollection = (collection: string) => {
  return products.filter(p => p.collection === collection);
};

export const getAllProducts = () => {
  return products;
};
