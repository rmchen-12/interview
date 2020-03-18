- 基本数据类型 null undefined boolean string number symbol bigInt 
- 引用数据类型 object

### 判断数据类型的方法
1. typeof
   - 基础数据类型基本正确，但是null是object
   - 引用类型中除了function可判断，其他都是object
问题： 能力有限 

2. instanceof
   - ary instanceof Array // true
   - ary instanceof Object // true
问题： 只能是原型链上的都是true，处理不了基础类型

3. constructor
   - obj.constructor === Array // true
问题： 
- 把类的原型进行重写，在重写的过程中，很有可能把之前的constructor给覆盖了，这样检测出来的结果就是不准确的
- 特殊的数据类型null和undefined，它们的所属类型是Null和Undefined，但是浏览器把这两个类保护起来了，不允许在外面访问使用

4. Object.prototype.toString
   - 返回形如`[object Boolean]`的值
原理：
- 对于Number、String、Boolean、Array、RegExp、Date、Function原型上的toString方法都是把当前的数据类转换为字符串的类型（它们的作用仅仅是用来转换为字符串的）
- Object.prototype.toString并不是用来转换为字符串的
    1. 先获取Object原型上的toString方法，让方法执行，并且改变方法中的this关键字的指向；
    2. Object.prototype.toString 它的作用是返回当前方法的执行主体（方法中this）所属类的详细信息；
