import { randomBytes } from "crypto";

export function generateCsrfToken() {
  return randomBytes(32).toString("hex");
}

export function verifyCsrfToken(cookieToken?: string, headerToken?: string) {
  if (!cookieToken || !headerToken) return false;
  return cookieToken === headerToken;
}
