import { LRUCache } from "lru-cache";
const cache = new LRUCache({
  max: 500,
});
export function tooManyRequests(key: string, limit = 60) {
  const current = tokenCache.get(key) || 0;
  tokenCache.set(key, current + 1);
  return current + 1 > limit;
}
