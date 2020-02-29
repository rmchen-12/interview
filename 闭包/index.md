闭包：在JavaScript中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。

访问顺序： local,closure,global

回收：
- 引用闭包的函数是一个全局变量，没有手动回收那就一直存在
- 引用闭包的函数是个局部变量，等函数销毁后，会在下次垃圾回收中清除

应用：
1. 设计私有的方法和变量，像什么节流防抖里保存timer，redux保存全局state
2. 单例模式
```
var singleton = (function(){
  
  // 私有变量
  var age = 22;
  var speak = function(){
    console.log("speaking!!!");
  };
  
  // 特权（或公有）属性和方法
  return {
    name: "percy",
    getAge: function(){
      return age;
    }
  };
})();
```
3. 匿名函数最大的用途是创建闭包,构建命名空间，以减少全局变量的使用
```
var objEvent = objEvent || {};
(function(){ 
    var addEvent = function(){ 
      // some code
    };
    function removeEvent(){
      // some code
    }

    objEvent.addEvent = addEvent;
    objEvent.removeEvent = removeEvent;
})();
```
4. redux，redux的目的就是提供一个全局state，同时又想state不被修改，闭包就完美满足这种情况
