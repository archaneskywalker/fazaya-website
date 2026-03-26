import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Upload gambar untuk produk
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(() => {
      return { message: "Upload berhasil" };
    }),

  // Upload gambar untuk koleksi
  collectionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(() => {
      return { message: "Upload berhasil" };
    }),

  // Upload multiple images untuk product gallery
  productGallery: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(() => {
      return { message: "Upload berhasil" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
