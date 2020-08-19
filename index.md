## 使用 JSON.stringify 将对象转为 JSON 字符串时，一些非法的数据类型会失真，主要表现如下

- 如果对象含有 toJSON 方法会调用 toJSON
- 在数组中 1.存在 undefined/Symbol/Function 数据类型时会变为 null 2.存在 Infinity/NaN 也会变成 null
- 在对象中 1.属性值为 undefined/Symbol/Function 数据类型时，属性和值都不会转为字符串，直接先显示这个属性 2.属性值为 Infinity/NaN ，属性值会变为 null
- 日期数据类型的值会调用 toISOString
- 非数组/对象/函数/日期的复杂数据类型会变成一个空对象
- 循环引用会抛出错误

## new 关键字做了什么事

1. 创建空对象
2. 将空对象分配 this 值
3. 将空对象的**proto**指向构造函数的 prototype
4. 如果没有显示 return 语句，则返回 this

```javascript
function _new(constructor, ...args) {
  // 创建一个新对象
  let newObj = Object.create(constructor);
  // 执行构造函数，即绑定 this，并且为这个新对象添加属性
  constructor.apply(newObj, args);
  // 返回该对象
  return newObj;
}
```

## 箭头函数跟普通函数表达式不同

1. 箭头函数不可能被提升（匿名）
2. 不存在 this/arguments
3. 不能被作为构造函数，没有 prototype 对象
4. 在对象{}中无法作为属性添加，因为无法访问 this 即对象本身

## 1.toString()和{}.toString()为什么报错

- 1.toString()中的 1 引擎解析的时候有歧义，1 是点运算符呢还是小数点
- {}.toString()中也是解析的时候有歧义，{}是语句块呢还是空对象
- 要解决这两问题只要加上()就行了，解析时消除歧义

## eval,with 为什么不用

欺骗词法作用域

- eval(...) ： 对一段包含一个或多个声明的代码字符串进行演算，借此来修改已经存在的词法作用域（运行时）
- with : 将一个对象的引用当作作用域，将对象的属性当作作用域的标识符，创建一个新的词法作用域（运行时）
  引擎无法在编译时对作用域查找进行优化。因为引擎只能谨慎地认为这样的优化是无效的，使用任何一个机制都将导致代码运行变慢

## Object.defineProperty()

- 共有(configurable，enumerable)
- 属性描述符(value,writable)
- 存取描述符(getter,setter )

## Object.seal()和 Object.freeze()

- 对象常量:结合`writable: false; configurable: false` 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）
- 禁止扩展:如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用 Object.preventExtensions(...)，但属性`configurable:true`
- 密封:这个方法实际上会在一个现有对象上调用 object.preventExtensions(...)并把所有现有属性标记为`configurable:false`
- 冻结:这个方法实际上会在一个现有对象上调用 Object.seal(),并把所有现有属性标记为`writable:false`,这样就无法修改它们的值
- 深度冻结:首先这个对象上调用 Object.freeze()然后遍历它引用的所有对象，并在这些对象上调用 Object.freeze()

## 获取对象深层元素

```javascript
const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
```

## JS 函数传参是按值传递还是按引用传递

是按值传递，传递的是内存地址，也就是说在函数内重新给他赋值并不会影响本身，而是会给赋值后的对象重新给个内存地址

```javascript
function hello(obj) {
  obj.name = 'lucy';
  obj = new Object(); // 新赋值了一个地址
  obj.name = 'lili';
  return obj;
}
```

### 对象的属性遍历规则(由于对象的输出是无序的，但是数组却是有序的（Map 也可以），所以为了保证顺序，搞成数组再输出)：

- Chrome Opera 中使用 for-in 语句遍历对象属性时会遵循一个规律：
  > 它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性
- 其它浏览器则完全按照对象定义的顺序遍历属性

### http2 头部压缩方法

> 第二次的请求头部之所以非常小，是因为大部分键值对只占用了一个字节。尤其是 UserAgent、Cookie 这样的头部，首次请求中需要占用很多字节，后续请求中都只需要一个字节。

- 维护一份相同的静态字典（Static Table），包含常见的头部名称，以及特别常见的头部名称与值的组合；不存在的键值对在首次请求后就可以添加到动态字典里下次就可以一个字节拿到
- 维护一份相同的动态字典（Dynamic Table），可以动态地添加内容；
- 支持基于静态哈夫曼码表的哈夫曼编码（Huffman Coding）；

### input 与 textarea 的区别以及用 div 模拟 textarea

- input 是单行文本框，不会换行
- textarea 是多行文本输入框，不足就是不能像普通 div 标签一样高度可以跟随内容自适应。textarea 总是很自信地显摆它的滚动条，高度固执地岿然不动。
- `<div contenteditable="true"></div>` 高度可写`min-height`和`max-height`来伸缩

### Map 和 Object 区别

- Map 是有序的，可以直接迭代
- 键值可是任意键
- Object 有自己的原型，Map 比较纯粹
- 键值增删改查场景中更加友好，且效率更高

### Object.is(), `===`, `==` 区别

- -0,+0 false true true
- NaN,NaN true false false
- Object.is 其他规则和 `===` 相同
- `==` 会发生隐式转换
  对象  
  |
  字符串
  |
  | 转数值比较
  数值
  | 转数值比较
  |
  布尔值

### onLoad 和 DomContentLoad 的区别

- onLoad 是的在页面所有文件加载完成后执行
- DomContentLoad 是 Dom 加载完成后执行，不必等待样式脚本和图片加载

### new Array(4).fill(new Array(4)) 和 循环创建二位数组

- 第一种 fill 里的 new Array(4)是同一个引用地址，导致一个变全都会变
- 要想避免的话还是得用循环来创建
