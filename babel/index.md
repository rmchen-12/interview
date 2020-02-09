(深入浅出 Babel 上篇：架构和原理 + 实战)["https://juejin.im/post/5d94bfbf5188256db95589be"]

babel-runtime和babel-polyfill区别
- babel-polyfill可以转义新api,但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大
- babel-runtime转义新语法，但不支持新api,优点是不影响全局，在局部引用babel-runtime中的js
- babel-runtime适合在组件，类库项目中使用，而babel-polyfill适合在业务项目中使用