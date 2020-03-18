## 使用 JSON.stringify 将对象转为 JSON 字符串时，一些非法的数据类型会失真，主要表现如下
- 如果对象含有 toJSON 方法会调用 toJSON
- 在数组中
   1.存在 undefined/Symbol/Function 数据类型时会变为 null
   2.存在 Infinity/NaN 也会变成 null
- 在对象中
   1.属性值为 undefined/Symbol/Function 数据类型时，属性和值都不会转为字符串，直接先显示这个属性
   2.属性值为 Infinity/NaN ，属性值会变为 null
- 日期数据类型的值会调用 toISOString
- 非数组/对象/函数/日期的复杂数据类型会变成一个空对象
- 循环引用会抛出错误

## new关键字做了什么事
  1. 创建空对象
  2. 将空对象分配this值
  3. 将空对象的__proto__指向构造函数的prototype
  4. 如果没有显示return语句，则返回this

## 箭头函数跟普通函数表达式不同
  1. 箭头函数不可能被提升（匿名）
  2. 不存在this/arguments
  3. 不能被作为构造函数，没有prototype对象
  4. 在对象{}中无法作为属性添加，因为无法访问this即对象本身

## 1.toString()和{}.toString()为什么报错
- 1.toString()中的1引擎解析的时候有歧义，1是点运算符呢还是小数点
- {}.toString()中也是解析的时候有歧义，{}是语句块呢还是空对象
- 要解决这两问题只要加上()就行了，解析时消除歧义

## eval,with为什么不用
欺骗词法作用域
- eval(...) ： 对一段包含一个或多个声明的代码字符串进行演算，借此来修改已经存在的词法作用域（运行时）
- with : 将一个对象的引用当作作用域，将对象的属性当作作用域的标识符，创建一个新的词法作用域（运行时）
引擎无法在编译时对作用域查找进行优化。因为引擎只能谨慎地认为这样的优化是无效的，使用任何一个机制都将导致代码运行变慢

## Object.defineProperty()
- 共有(configurable，enumerable)
- 属性描述符(value,writable)
- 存取描述符(getter,setter )

## Object.seal()和Object.freeze()
- 对象常量:结合`writable: false; configurable: false` 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）
- 禁止扩展:如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用Object.preventExtensions(...)，但属性`configurable:true`
- 密封:这个方法实际上会在一个现有对象上调用object.preventExtensions(...)并把所有现有属性标记为`configurable:false`
- 冻结:这个方法实际上会在一个现有对象上调用Object.seal(),并把所有现有属性标记为`writable:false`,这样就无法修改它们的值
- 深度冻结:首先这个对象上调用Object.freeze()然后遍历它引用的所有对象，并在这些对象上调用Object.freeze()

## 获取对象深层元素
```javascript
const get = (p, o) =>
    p.reduce((xs, x) =>
        (xs && xs[x]) ? xs[x] : null, o)
```

## JS函数传参是按值传递还是按引用传递
是按值传递，传递的是内存地址，也就是说在函数内重新给他赋值并不会影响本身，而是会给赋值后的对象重新给个内存地址
```javascript
function hello(obj) {
    obj.name = 'lucy';
    obj = new Object(); // 新赋值了一个地址
    obj.name = 'lili';
    return obj;
}
```