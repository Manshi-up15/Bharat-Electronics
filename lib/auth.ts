import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "change_this_secret";

export interface AuthPayload {
  id: string;
  role: string;
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value;
}

export async function verifyAuth() {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export function requireAuth() {
  const payload = verifyAuth();
  if (!payload) {
    throw new Error("Unauthorized");
  }
  return payload;
}

export function createAuthToken(payload: AuthPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// Verify token from an incoming Request (server API route)
export async function verifyRequestAuth(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/authToken=([^;]+)/);
  const token = match ? match[1] : null;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as AuthPayload;
  } catch {
    return null;
  }
}
