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

export const settingsSchema = z.object({
  siteTitle: z.string().optional(),
  siteDescription: z.string().optional()
});

export default { loginSchema, productSchema, categorySchema, settingsSchema };
