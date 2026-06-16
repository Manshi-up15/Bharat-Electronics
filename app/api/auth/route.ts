import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../../../lib/models";
import { createAuthToken } from "../../../lib/auth";
import { generateCsrfToken } from "../../../lib/csrf";
import { loginSchema } from "../../../lib/validation";
import { sanitizeObject } from "../../../lib/sanitize";

export async function POST(request: Request) {
  const body = await request.json();
  const cleaned = sanitizeObject(body);
  const parse = loginSchema.safeParse(cleaned);
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { email, password } = parse.data;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = createAuthToken({ id: user.id as string, role: user.role });
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  // set csrf cookie for subsequent mutating requests
  const csrf = generateCsrfToken();
  response.cookies.set({ name: "csrfToken", value: csrf, httpOnly: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
