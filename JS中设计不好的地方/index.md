1. 没有块级作用域
2. this 困惑
   1. 函数中包着函数，包着的函数 this 不会和外层 this 相同
3. eval,with 造成的性能问题，不知道浏览器优化如何
4. typeof null === Object
5. 奇怪的内存泄漏
   1. 定时器不手动清除的话会内存泄漏(null 手动清除)
   2. dom 引用不会自动清除(可以用 weakMap 存)
6. 变量提升，与逻辑不符
