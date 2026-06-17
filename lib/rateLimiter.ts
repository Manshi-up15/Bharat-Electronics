import { LRUCache } from "lru-cache";
const cache = new LRUCache<string, number>({
  max: 500,
});
export function tooManyRequests(key: string, limit = 60) {
  const current = cache.get(key) || 0;
  cache.set(key, current + 1);
  return current + 1 > limit;
}
