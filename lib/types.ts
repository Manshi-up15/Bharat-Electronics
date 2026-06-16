export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt?: string;
}

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export interface ImageResource {
  url: string;
  publicId: string;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  description: string;
  images: ImageResource[];
  availability: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  _id?: string;
  id?: string;
  imageUrl: string;
  publicId: string;
  title?: string;
  uploadedAt?: string;
}

export interface Settings {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  aboutText?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}
