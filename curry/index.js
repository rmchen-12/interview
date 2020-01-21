var curry = fn =>
  (judge = (...args) =>
    args.length === fn.length ? fn(...args) : arg => judge(...args, arg));

function add(a, b) {
  return a + b;
}

// let a = curry(add, 1, 2)();
// let a = curry(add)(1, 2);
let a = curry(add)(1)(2);

console.log(a);
