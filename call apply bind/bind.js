function log(name, age) {
  console.log(this.a, name, age);
}

const obj = {
  a: '123'
};

/**
 * 实现bind方法
 */
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments);
  };
}

Function.prototype.myBind = function(context) {
  let _this = this;
  let args = [...arguments].slice(1);
  return function() {
    _this.apply(context, args.concat([...arguments].slice(1)));
  };
};

log.bind(obj, 'lucy', 18)();
log.myBind(obj, 'lucy', 18)();
