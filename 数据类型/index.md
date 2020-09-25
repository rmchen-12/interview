- 基本数据类型 null undefined boolean string number symbol bigInt
- 引用数据类型 object

### 判断数据类型的方法

1. typeof

   - 基础数据类型基本正确，但是 null 是 object
   - 引用类型中除了 function 可判断，其他都是 object
     问题： 能力有限

2. instanceof

   - ary instanceof Array // true
   - ary instanceof Object // true
     问题： 只能是原型链上的都是 true，处理不了基础类型

3. constructor

   - obj.constructor === Array // true
     问题：
     - 把类的原型进行重写，在重写的过程中，很有可能把之前的 constructor 给覆盖了，这样检测出来的结果就是不准确的
     - 特殊的数据类型 null 和 undefined，它们的所属类型是 Null 和 Undefined，但是浏览器把这两个类保护起来了，不允许在外面访问使用

4. Object.prototype.toString
   - 返回形如`[object Boolean]`的值
     原理：

- 对于 Number、String、Boolean、Array、RegExp、Date、Function 原型上的 toString 方法都是把当前的数据类转换为字符串的类型（它们的作用仅仅是用来转换为字符串的）
- Object.prototype.toString 并不是用来转换为字符串的
  1. 先获取 Object 原型上的 toString 方法，让方法执行，并且改变方法中的 this 关键字的指向；
  2. Object.prototype.toString 它的作用是返回当前方法的执行主体（方法中 this）所属类的详细信息；
