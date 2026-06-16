import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../../../lib/models";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name, setupSecret } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }

  if (setupSecret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized setup attempt." }, { status: 403 });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, passwordHash, role: "admin" });
  return NextResponse.json({ user });
}
