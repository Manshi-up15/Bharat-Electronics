import type { Category, GalleryItem, Product, Settings, User } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function jsonFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${siteUrl}${path}`, {
    cache: "no-store",
    ...options
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch ${path}: ${response.status} ${text}`);
  }
  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  return jsonFetch<Product[]>("/api/products");
}

export async function getProduct(id: string): Promise<Product> {
  return jsonFetch<Product>(`/api/products/${id}`);
}

export async function createProduct(input: Partial<Product>) {
  return jsonFetch<Product>("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function updateProduct(id: string, input: Partial<Product>) {
  return jsonFetch<Product>(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function deleteProduct(id: string) {
  return jsonFetch<{ deletedCount: number }>(`/api/products/${id}`, {
    method: "DELETE"
  });
}

export async function getCategories(): Promise<Category[]> {
  return jsonFetch<Category[]>("/api/categories");
}

export async function getCategory(slug: string): Promise<Category & { products: Product[] }> {
  return jsonFetch<Category & { products: Product[] }>(`/api/categories/${slug}`);
}

export async function createCategory(input: Partial<Category>) {
  return jsonFetch<Category>("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function updateCategory(id: string, input: Partial<Category>) {
  return jsonFetch<Category>(`/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function deleteCategory(id: string) {
  return jsonFetch<{ deletedCount: number }>(`/api/categories/${id}`, {
    method: "DELETE"
  });
}

export async function getGallery(): Promise<GalleryItem[]> {
  return jsonFetch<GalleryItem[]>("/api/gallery");
}

export async function createGalleryItem(input: Partial<GalleryItem>) {
  return jsonFetch<GalleryItem>("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function deleteGalleryItem(id: string) {
  return jsonFetch<{ deletedCount: number }>(`/api/gallery/${id}`, {
    method: "DELETE"
  });
}

export async function getSettings(): Promise<Settings | null> {
  return jsonFetch<Settings>("/api/settings");
}

export async function saveSettings(input: Partial<Settings>) {
  return jsonFetch<Settings>("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function uploadProductImage(file: File) {
  const data = new FormData();
  data.append("file", file);
  data.append("folder", "bharat-electronics/products");
  const response = await fetch(`${siteUrl}/api/uploads/product-images`, {
    method: "POST",
    body: data
  });
  if (!response.ok) {
    throw new Error("Image upload failed.");
  }
  return response.json();
}

export async function uploadGalleryImage(file: File, title?: string) {
  const data = new FormData();
  data.append("file", file);
  data.append("folder", "bharat-electronics/gallery");
  if (title) {
    data.append("title", title);
  }
  const response = await fetch(`${siteUrl}/api/uploads/gallery`, {
    method: "POST",
    body: data
  });
  if (!response.ok) {
    throw new Error("Gallery upload failed.");
  }
  return response.json();
}

export async function deleteUploadedImage(publicId: string) {
  return jsonFetch<{ result: string }>("/api/uploads/image-delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId })
  });
}
