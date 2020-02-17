const set = new Set([1, 2, 3, 4, 4]);

const a = [
  [1, 2],
  [3, 4]
];
const ws = new WeakSet(a);

const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

const wm = new WeakMap();
let key = {};
let obj = { foo: 1 };

wm.set(key, obj);
