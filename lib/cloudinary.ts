import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary environment variables are not fully configured. Image uploads will fail without CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
}

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadDataUri(dataUri: string, options: { folder?: string } = {}) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name") {
    throw new Error("Cloudinary credentials are not configured in .env.local. Please add your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
  }
  return cloudinary.uploader.upload(dataUri, { folder: options.folder });
}

export async function destroy(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export function optimizedUrl(publicIdOrUrl: string, opts: { width?: number; quality?: "auto" | number } = {}) {
  // If passed a full URL already, return it (Cloudinary URLs may be used as-is)
  if (publicIdOrUrl.startsWith("http")) return publicIdOrUrl;
  const transformations = [];
  if (opts.width) transformations.push(`w_${opts.width}`);
  if (opts.quality) transformations.push(`q_${opts.quality}`);
  const base = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const t = transformations.length ? `${transformations.join(",")}/` : "";
  return `${base}/${t}${publicIdOrUrl}`;
}

export default cloudinary;
