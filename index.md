## 使用 JSON.stringify 将对象转为 JSON 字符串时，一些非法的数据类型会失真，主要表现如下
- 如果对象含有 toJSON 方法会调用 toJSON
- 在数组中
   1.存在 Undefined/Symbol/Function 数据类型时会变为 null
   2.存在 Infinity/NaN 也会变成 null
- 在对象中
   1.属性值为 Undefined/Symbol/Function 数据类型时，属性和值都不会转为字符串
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
  3. 不能被作为构造函数
  4. 在对象{}中无法作为属性添加，因为无法访问this即对象本身