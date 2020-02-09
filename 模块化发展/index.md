## CommonJS(Nodejs)
    有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global
    commonJS用同步的方式加载模块，是值的拷贝。
    在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。
    但是在浏览器端，限于网络原因，更合理的方案是使用异步加载

## AMD和require.js(AMD 推崇依赖前置、提前执行)
    ```
    /** AMD写法 **/
    define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
         // 等于在最前面声明并初始化了要用到的所有模块
        a.doSomething();
        if (false) {
            // 即便没用到某个模块 b，但 b 还是提前执行了
            b.doSomething()
        } 
    });
    ```

## CMD和sea.js(推崇依赖就近、延迟执行)
    ```
    /** CMD写法 **/
    define(function(require, exports, module) {
        var a = require('./a'); //在需要时申明
        a.doSomething();
        if (false) {
            var b = require('./b');
            b.doSomething();
        }
    });
    ```

## UMD(集结了 CommonJs、CMD、AMD 的规范于一身)
```
((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //CommonJS
        var $ = requie('jquery');
        module.exports = factory($);
    } else {
        root.testModule = factory(root.jQuery);
    }
})(this, ($) => {
    //todo
});
```

## ES6 Module
    export和import
    export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能
    ES6的模块不是对象，import命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。

## ES6 模块与 CommonJS 模块的差异
    - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
      - CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
      - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读   引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动     态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
    - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
      - 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”
      - 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整   个模块，这种加载称为“编译时加载”。
    - CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析   阶段就会生成。


