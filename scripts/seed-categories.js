const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bharat-electronics";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();

    const defaultCategories = [
      { name: "Wires & Cables", slug: "wires-cables" },
      { name: "Switches & Sockets", slug: "switches-sockets" },
      { name: "Fans", slug: "fans" },
      { name: "Lighting", slug: "lighting" },
      { name: "Circuit Breakers", slug: "circuit-breakers" },
      { name: "Tools & Accessories", slug: "tools-accessories" }
    ];

    let created = 0;
    for (const cat of defaultCategories) {
      const existing = await db.collection("categories").findOne({ slug: cat.slug });
      if (!existing) {
        await db.collection("categories").insertOne({ ...cat, createdAt: new Date() });
        console.log("Created category:", cat.name);
        created++;
      } else {
        console.log("Category already exists:", cat.name);
      }
    }
    console.log(`\nDone. ${created} new categories created.`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
