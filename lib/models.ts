import { ObjectId } from "mongodb";
import clientPromise from "./db";
import type { Category, GalleryItem, Product, Settings, User } from "./types";

function normalizeDocument<T>(doc: T & { _id?: ObjectId | string }) {
  const { _id, ...rest } = doc;

  return {
    ...rest,
    id: _id?.toString()
  };
}

export async function getUsers() {
  const db = (await clientPromise).db();
  const users = await db.collection<User>("users").find().toArray();
  return users.map((user) => normalizeDocument(user));
}

export async function findUserByEmail(
  email: string
): Promise<(User & { id?: string }) | null> {
  const db = (await clientPromise).db();
  const user = await db.collection<User>("users").findOne({ email });

  return user
    ? (normalizeDocument(user) as User & { id?: string })
    : null;
}

export async function createUser(user: Omit<User, "id" | "createdAt">) {
  const db = (await clientPromise).db();
  const result = await db.collection<User>("users").insertOne({ ...user, createdAt: new Date() });
  return normalizeDocument({ ...user, _id: result.insertedId } as User);
}

export async function getCategories() {
  const db = (await clientPromise).db();
  const categories = await db.collection<Category>("categories").find().sort({ name: 1 }).toArray();
  return categories.map(normalizeDocument);
}

export async function getCategoryBySlug(slug: string) {
  const db = (await clientPromise).db();
  const category = await db.collection<Category>("categories").findOne({ slug });
  return category ? normalizeDocument(category) : null;
}

export async function getCategoryById(id: string) {
  const db = (await clientPromise).db();
  const category = await db.collection<Category>("categories").findOne({ _id: new ObjectId(id) });
  return category ? normalizeDocument(category) : null;
}

export async function createCategory(input: Omit<Category, "id" | "createdAt">) {
  const db = (await clientPromise).db();
  const result = await db.collection<Category>("categories").insertOne({ ...input, createdAt: new Date() });
  return normalizeDocument({ ...input, _id: result.insertedId } as Category);
}

export async function updateCategory(id: string, input: Partial<Omit<Category, "id" | "createdAt">>) {
  const db = (await clientPromise).db();
  const objectId = new ObjectId(id);
  await db.collection<Category>("categories").updateOne({ _id: objectId }, { $set: input });
  return getCategoryById(id);
}

export async function deleteCategory(id: string) {
  const db = (await clientPromise).db();
  const objectId = new ObjectId(id);
  return db.collection<Category>("categories").deleteOne({ _id: objectId });
}

export async function getProducts() {
  const db = (await clientPromise).db();
  const products = await db
    .collection<Product>("products")
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          categoryName: "$category.name"
        }
      },
      {
        $project: {
          category: 0
        }
      }
    ])
    .toArray();
  return products.map(normalizeDocument) as (Product & { categoryName?: string })[];
}

export async function getProductById(id: string) {
  const db = (await clientPromise).db();
  const product = await db
    .collection<Product>("products")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          categoryName: "$category.name"
        }
      },
      {
        $project: {
          category: 0
        }
      }
    ])
    .next();
  return product ? (normalizeDocument(product) as Product & { categoryName?: string }) : null;
}

type ProductInsert = Omit<Product, "id" | "createdAt" | "updatedAt" | "categoryId"> & {
  categoryId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  const db = (await clientPromise).db();
  const { categoryId, ...rest } = product;
  const result = await db.collection<ProductInsert>("products").insertOne({
    ...rest,
    categoryId: new ObjectId(categoryId),
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return normalizeDocument({ ...product, _id: result.insertedId } as Product);
}

export async function updateProduct(id: string, product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) {
  const db = (await clientPromise).db();
  const objectId = new ObjectId(id);
  const updateBody: Record<string, unknown> = { ...product, updatedAt: new Date() };
  if (product.categoryId) {
    updateBody.categoryId = new ObjectId(product.categoryId);
  }
  await db.collection("products").updateOne({ _id: objectId }, { $set: updateBody });
  return getProductById(id);
}

export async function deleteProduct(id: string) {
  const db = (await clientPromise).db();
  return db.collection<Product>("products").deleteOne({ _id: new ObjectId(id) });
}

export async function getGalleryItems() {
  const db = (await clientPromise).db();
  const gallery = await db.collection<GalleryItem>("gallery").find().sort({ uploadedAt: -1 }).toArray();
  return gallery.map(normalizeDocument);
}

export async function getGalleryItem(id: string) {
  const db = (await clientPromise).db();
  const item = await db.collection<GalleryItem>("gallery").findOne({ _id: new ObjectId(id) });
  return item ? normalizeDocument(item) : null;
}

export async function createGalleryItem(input: Omit<GalleryItem, "id" | "uploadedAt">) {
  const db = (await clientPromise).db();
  const result = await db.collection<GalleryItem>("gallery").insertOne({ ...input, uploadedAt: new Date() });
  return normalizeDocument({ ...input, _id: result.insertedId } as GalleryItem);
}

export async function deleteGalleryItem(id: string) {
  const db = (await clientPromise).db();
  return db.collection<GalleryItem>("gallery").deleteOne({ _id: new ObjectId(id) });
}

export async function removeImageFromProducts(publicId: string) {
  const db = (await clientPromise).db();
  const result = await db.collection<Product>("products").updateMany({}, { $pull: { images: { publicId } } });
  return result;
}

export async function getSettings() {
  const db = (await clientPromise).db();
  const settings = await db.collection<Settings>("settings").findOne({});
  return settings || null;
}

export async function upsertSettings(settings: Partial<Settings>) {
  const db = (await clientPromise).db();
  await db.collection<Settings>("settings").updateOne({}, { $set: settings }, { upsert: true });
  return getSettings();
}
