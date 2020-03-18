require('@babel/register')({ presets: ['node'] });
require('@babel/polyfill');

const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2',
      child3: ['child3']
    }
  }
};

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function clone(target, map = new weakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  const isArray = Array.isArray(target);
  let cloneTarget = isArray ? [] : {};

  // 解决循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  const keys = isArray ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone2(target[key], map);
  });

  return cloneTarget;
}

console.log(clone(target));
