import { NextResponse } from "next/server";
import cloudinary, { uploadDataUri } from "../../../../lib/cloudinary";
import { verifyRequestAuth } from "../../../../lib/auth";

export async function POST(request: Request) {
  const auth = await verifyRequestAuth(request);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const files = form.getAll("file") as any[];
  const folder = (form.get("folder") as string) || "bharat-electronics/products";

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  try {
    const uploads = [] as any[];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const result = await uploadDataUri(dataUri, { folder });
      uploads.push({ url: result.secure_url, publicId: result.public_id });
    }
    return NextResponse.json(uploads);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
