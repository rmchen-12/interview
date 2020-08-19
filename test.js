// 防抖和节流：
const debounce = (fn, time, immediate) => {
  let timer = null;
  return function (...args) {
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
  return function (...args) {
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

const isObj = (target) => {
  const t = typeof target;
  return t !== null && (t === 'object' || t === 'function');
};

const deepClone = function (obj, map = new Map()) {
  if (!isObj(obj)) return obj;

  let newObj = Array.isArray(obj) ? [] : {};

  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, newObj);

  for (const [key, value] of Object.entries(obj)) {
    newObj[key] = isObj(value) ? deepClone(value) : value;
  }

  return newObj;
};

class Promise {
  constructor(fn) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.state = value;
      }
    };
    this.reject = (value) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = value;
      }
    };
    try {
      fn(resolve, reject);
    } catch (error) {
      this.reject(this.reason);
    }
  }

  then(onFulfilled, onRejected) {
    switch (this.state) {
      case 'fulfilled':
        onFulfilled(this.value);
        break;
      case 'rejected':
        onRejected(this.reason);
        break;
      default:
        break;
    }
  }
}

Promise.all = (pArr) => {
  let iterator = pArr[Symbol.iterator]();

  return new Promise((resolve, reject) => {
    let result = [];
    const next = function () {
      let { done, value } = iterator.next();
      if (done) {
        resolve(result);
      } else {
        value
          .then((res) => {
            result.push(res);
            next();
          })
          .catch((e) => reject(e));
      }
    };
    next();
  });
};
