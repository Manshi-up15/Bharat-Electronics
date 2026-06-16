import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

if (!uri) {
  throw new Error("MONGODB_URI environment variable is required.");
}

type MongoGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as MongoGlobal;
let clientPromise: Promise<MongoClient>;

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect();
}

clientPromise = globalWithMongo._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;
