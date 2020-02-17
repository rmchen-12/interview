### 迭代器协议
对象的next方法是一个无参函数，它返回一个对象，该对象拥有done和value两个属性：
- done(boolean)
  - 迭代器已经超过了可迭代次数。这种情况下,value的值可以被省略
  - 如果迭代器可以产生序列中的下一个值，则为 false。这等效于没有指定done这个属性。
- value: 迭代器返回的任何 JavaScript值。done为true时可省略。

### 可迭代协议
对象的[Symbol.iterator]值是一个无参函数，该函数返回一个迭代器
满足可迭代协议的对象是`可迭代对象`

同时实现迭代器协议和可迭代协议，供一些集合调用
```
function createIterator(items) {
    var i = 0;

    return {
        next: function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        },
        // 下面这个属性就是部署了迭代器的对象调用的属性
        [Symbol.iterator]: function() { return this }
    };
}
```

### 生成器
给对象部署 Iterator 接口
```
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}
```