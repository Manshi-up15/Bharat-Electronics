import xss from "xss";

export function sanitizeInput(input: string) {
  return xss(input);
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === "string") out[key] = xss(val);
    else if (Array.isArray(val)) out[key] = val.map((v) => (typeof v === "string" ? xss(v) : v));
    else out[key] = val;
  }
  return out as T;
}
