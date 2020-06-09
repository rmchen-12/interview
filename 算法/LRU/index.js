function LRU(max) {
  this.max = max;
  this.cache = new Map();
}

LRU.prototype = {
  get(key) {
    const { cache } = this,
      value = cache.get(key);
    if (!value) return;
    cache.delete(key);
    cache.set(key, value);
    return value;
  },
  add(key, value) {
    const { cache } = this;
    if (cache.size > this.max - 1) {
      const keys = cache.keys().next().value;
      cache.delete(keys);
    }
    cache.set(key, value);
  },
};
