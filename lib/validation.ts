import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  categoryId: z.string().min(1),
  images: z.array(z.object({ url: z.string().url(), publicId: z.string().optional() })).optional()
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1)
});

export const galleryItemSchema = z.object({
  imageUrl: z.string().url(),
  publicId: z.string().min(1),
  title: z.string().max(200).optional()
});

export const settingsSchema = z.object({
  businessName: z.string().min(1).optional(),
  ownerName: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  whatsappNumber: z.string().min(1).optional(),
  email: z.string().email().optional(),
  instagram: z.string().min(1).optional(),
  heroTitle: z.string().min(1).optional(),
  heroSubtitle: z.string().optional(),
  aboutContent: z.string().optional(),
  address: z.string().optional(),
  googleMapsUrl: z.string().url().optional()
});

export default { loginSchema, productSchema, categorySchema, galleryItemSchema, settingsSchema };
