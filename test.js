// 防抖和节流：
const debounce = (fn, time, immediate) => {
  let timer = null;
  return function(...args) {
    let context = this;
    if (immediate && !timer) {
      fn.apply(context, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

const throttle = (fn, time, immediate) => {
  let timer = null;
  return function(...args) {
    const context = this;
    if (immediate) {
      fn.apply(context, args);
      return;
    }
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
      clearTimeout(timer);
      timer = null;
    }, time);
  };
};

// 深拷贝
const isObj = a => {
  const type = typeof a;
  return a !== 'null' && (type === 'object' || type === 'function');
};

const deepClone = (target, map = new Map()) => {
  if (!isObj(target)) {
    return target;
  }

  const isArray = Array.isArray(target);
  let cloneObj = isArray ? [] : {};

  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneObj);

  const keys = Object.keys(target);
  const length = keys.length;
  let index = -1;
  while (++index < length) {
    cloneObj[keys[index]] = deepClone(target[keys[index]]);
  }

  return cloneObj;
};

// eventEmitter
class eventEmitter {
  constructor() {
    this.funcs = [];
  }

  on(type, func) {
    const a = this.funcs[type] || [];
    a.push(func);
  }

  emit(type) {
    const arr = this.funcs[type];
    for (let index = 0; index < arr.length; index++) {
      arr[index]();
    }
  }

  off(type, func) {}
}

class a {
  constructor(params) {
    const demo = {
      1: {
        a: (window.a = 1),
        r: (window.a = null)
      },
      2: {
        a: (window.a = 1),
        r: (window.a = null)
      }
    };
    this.demo = demo;
  }

  dispatch(type, ...props) {
    this.demo[type].apply(this, props);
  }

  recover() {
    Object.keys(this.demo).forEach(v => v.r());
  }
}
