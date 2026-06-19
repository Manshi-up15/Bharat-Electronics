import { ObjectId } from "mongodb";
export interface User {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
}

export interface Category {
  _id?: ObjectId;
  id?: string;
  name: string;
  slug: string;
  image?: ImageResource;
  createdAt?: Date;
}

export interface ImageResource {
  url: string;
  publicId: string;
}

export interface Product {
  _id?: ObjectId;
  id?: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  description: string;
  images: ImageResource[];
  availability: string;
  featured?: boolean;
  isNewArrival?: boolean;
  price?: number;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GalleryItem {
  _id?: ObjectId;
  id?: string;
  imageUrl: string;
  publicId: string;
  title?: string;
  uploadedAt?: Date;
}

export interface Settings {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  aboutContent?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  whatsappNumber?: string;
  address?: string;
  googleMapsUrl?: string;
}
