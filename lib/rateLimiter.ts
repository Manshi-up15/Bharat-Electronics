import LRU from "lru-cache";

const tokenCache = new LRU<string, number>({ max: 5000, ttl: 1000 * 60 });

export function tooManyRequests(key: string, limit = 60) {
  const current = tokenCache.get(key) || 0;
  tokenCache.set(key, current + 1);
  return current + 1 > limit;
}
