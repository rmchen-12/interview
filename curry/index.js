var curry = (fn) =>
  (judge = (...args) =>
    args.length === fn.length ? fn(...args) : (arg) => judge(...args, arg));

function add(a, b) {
  return a + b;
}

// let a = curry(add, 1, 2)();
// let a = curry(add)(1, 2);
let a = curry(add)(1)(2);

// console.log(a);

// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) == 6;
// add(1, 2, 3)(4) == 10;
// add(1)(2)(3)(4)(5) == 15;

function add(...args) {
  const newArgs = args;
  const _adder = function (...params) {
    newArgs.push(...params);
    return add(...newArgs);
  };

  _adder.toString = () => newArgs.reduce((a, b) => a + b, 0);

  return _adder;
}

// console.log(add(1)(2)(3) == 6);

let myCurry = function (fn, len = fn.length, ...args) {
  return function (...params) {
    const newArgs = [...args, ...params];
    if (newArgs.length === len) {
      return fn(...newArgs);
    } else {
      return myCurry(fn, len, ...newArgs);
    }
  };
};

function add(a, b) {
  return a + b;
}

// let a = curry(add, 1, 2)();
// let a = curry(add)(1, 2);
let result = myCurry(add)(1)(2);
console.log(result);
