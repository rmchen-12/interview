1. 没有块级作用域
2. this困惑
   1. 函数中包着函数，包着的函数this不会和外层this相同
3. eval,with造成的性能问题，不知道浏览器优化如何
4. typeof null === Object 
5. 奇怪的内存泄漏
   1. 定时器不手动清除的话会内存泄漏(null手动清除)
   2. dom引用不会自动清除(可以用weakMap存)
