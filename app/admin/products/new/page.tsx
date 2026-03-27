"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    originalPrice: "",
    collection: "serena",
    colors: "",
    image: "",
    description: "",
    material: "",
    care: "",
    size: "115cm x 115cm",
    isNew: false,
    isPromo: false,
    rating: "",
    sold: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUploadComplete = (res: any, isMain: boolean = false) => {
    console.log('Upload complete response:', res);
    if (!res || res.length === 0) {
      console.error('Empty upload response');
      return;
    }

    const file = res[0];
    const url = file?.url || file?.fileUrl;

    console.log('Extracted URL:', url);

    if (url) {
      if (isMain) {
        setFormData((prev) => ({ ...prev, image: url }));
      } else {
        setImages((prev) => [...prev, url]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const productData = {
      name: formData.name,
      slug: formData.slug,
      price: parseInt(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      collection: formData.collection,
      colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
      image: formData.image || images[0] || "",
      images: images.length > 0 ? images : undefined,
      description: formData.description,
      material: formData.material,
      care: formData.care,
      size: formData.size,
      isNew: formData.isNew,
      isPromo: formData.isPromo,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      sold: formData.sold ? parseInt(formData.sold) : 0,
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create product");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Add New Product</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the product details below
        </p>
      </div>

      {error && (
        <div className="text-destructive text-sm bg-destructive/10 p-4 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold">Basic Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Serena Series - Raisin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., serena-series-raisin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price (Rp) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 70999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Original Price (Rp)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 89999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Collection *
              </label>
              <select
                name="collection"
                value={formData.collection}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="serena">Serena Series</option>
                <option value="jasmine">Jasmine Series</option>
                <option value="bloom">Bloom Series</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Navy, Pink, Ungu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Product description..."
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold">Images</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Main Image *
            </label>

            {/* Main Image Preview */}
            {formData.image && (
              <div className="relative w-32 h-40 mb-3 rounded overflow-hidden border">
                <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Or paste image URL here..."
              />
            </div>

            <div className="mt-2">
              <UploadDropzone
                endpoint="productImage"
                onClientUploadComplete={(res: any) => handleUploadComplete(res, true)}
                onUploadError={(error: Error) => {
                  setError(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: "bg-primary text-primary-foreground hover:bg-primary/90",
                  allowedContent: "text-muted-foreground",
                }}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <label className="block text-sm font-medium mb-2">
              Additional Images
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddImage()}
                className="flex-1 px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Or paste image URL, press Enter..."
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 border rounded-md font-medium hover:bg-muted transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <UploadDropzone
              endpoint="productGallery"
              onClientUploadComplete={(res: any) => {
                console.log('Gallery upload complete:', res);
                const urls = res.map((r: any) => r.url || r.fileUrl).filter(Boolean);
                console.log('Gallery URLs:', urls);
                setImages((prev) => [...prev, ...urls]);
              }}
              onUploadError={(error: Error) => {
                console.error('Upload error:', error);
                setError(`Upload failed: ${error.message}`);
              }}
              appearance={{
                button: "bg-primary text-primary-foreground hover:bg-primary/90",
                allowedContent: "text-muted-foreground",
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold">Product Details</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Voal Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 115cm x 115cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Care Instructions
              </label>
              <input
                type="text"
                name="care"
                value={formData.care}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Hand wash cold"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 4.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Units Sold
              </label>
              <input
                type="number"
                name="sold"
                value={formData.sold}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 10"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold">Status</h2>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleCheckbox}
                className="w-4 h-4"
              />
              <span>New Product</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPromo"
                checked={formData.isPromo}
                onChange={handleCheckbox}
                className="w-4 h-4"
              />
              <span>On Promo</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-md font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
