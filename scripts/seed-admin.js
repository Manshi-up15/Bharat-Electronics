const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bharat-electronics";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const email = "admin@bharatelectronics.com";
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      console.log("Admin user already exists:", email);
      return;
    }
    const password = "ChangeMe123!";
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { name: "Admin", email, passwordHash, role: "admin", createdAt: new Date() };
    const result = await db.collection("users").insertOne(user);
    console.log("Admin user created with id:", result.insertedId.toString());
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
