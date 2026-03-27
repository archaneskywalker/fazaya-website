import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Upload gambar untuk produk
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      console.log('Upload middleware called');
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log('Upload complete:', file.url);
      return { url: file.url };
    }),

  // Upload gambar untuk koleksi
  collectionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      console.log('Collection upload middleware called');
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log('Collection upload complete:', file.url);
      return { url: file.url };
    }),

  // Upload multiple images untuk product gallery
  productGallery: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      console.log('Gallery upload middleware called');
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log('Gallery upload complete:', file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
