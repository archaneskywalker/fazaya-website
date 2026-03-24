"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Collection {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    try {
      const res = await fetch(`/api/admin/collections/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCollections(collections.filter((c) => c.slug !== slug));
      } else {
        alert("Failed to delete collection");
      }
    } catch {
      alert("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading collections...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Collections</h1>
          <p className="text-muted-foreground mt-1">
            Manage your collection categories
          </p>
        </div>
        <Link
          href="/admin/collections/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Collection
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12 bg-card border rounded-lg">
            <p>No collections found. Click "Add Collection" to create one.</p>
          </div>
        ) : (
          collections.map((collection) => (
            <div
              key={collection.slug}
              className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-heading font-semibold text-lg">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {collection.description}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {collection.productCount} products
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/collections/${collection.slug}/edit`}
                    className="flex-1 bg-primary text-primary-foreground text-center px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Pencil className="w-4 h-4 inline mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(collection.slug)}
                    className="px-4 py-2 border border-destructive text-destructive rounded-md font-medium hover:bg-destructive/10 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
