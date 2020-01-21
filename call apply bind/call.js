function log(name, age) {
  console.log(this.a, name, age);
}

const obj = {
  a: '123'
};

/**
 * 实现call方法
 */
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    return;
  }
  context || window || global;
  const fn = Symbol();
  context[fn] = this;
  const args = [...arguments].slice(1);
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

log.call(obj, 'lucy', 18);
log.myCall(obj, 'lucy', 18);
