(深入浅出 Babel 上篇：架构和原理 + 实战)["https://juejin.im/post/5d94bfbf5188256db95589be"]
(关于 Babel 你必须知道的)["https://juejin.im/post/5d2b1df66fb9a07ef161b208#heading-5"]

### 核心包
- babel-core babel的编译器，分词，语法分析转为AST，遍历转换，AST转回代码
- babel-cli 命令行工具
- babel-external-helpers babel有很多辅助函数，例如toArray函数，jsx转化函数。这些函数是babel transform的时候用的，放在代码顶部，多了会有很多重复helper，
  所以就提供这个来帮助生成独立的helpers
- babel-node `babel-node --presets react test.js`
- babel-register 实时编译，不需要输出文件，执行的时候再去编译，比如文件首部`require('babel-register')({ presets: ['react'] })`，就可以直接执行了;
- babel-runtime 
- babel-polyfill

### babel-runtime和babel-polyfill区别
- 都是为了引入垫片
- babel-polyfill是全局下的包，会污染了全局环境，而且不管用没用到都是一次全部引入(babel7中可用useBuiltIns解决,而且全局污染也没了)，编译后的代码体积变大(ES6 语法（E.g: arrow func，esModules）还是要加入 plugins 去 transform 的)，
- babel-polyfill是一次性引入你的项目中的，就像是 React 包一样，同项目代码一起编译到生产环境
- babel-runtime转译非实例方法，实例方法没法转义(因为这里是require函数修改局部变量，只能改非实例的方法，不能去污染全局变量)，只能通过plugin引入，优点是不影响全局，在babel编译过程中按需引用babel-runtime中的js，重复多了，可能编译比较慢
- babel-runtime适合在组件，类库项目中使用，而babel-polyfill适合在业务项目中使用

### preset-env
- modules:false 为了使用js摇树
- targets:{"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} 目标浏览器，新版可以和postcss那个browserlist配置共用，不用特别配置
- useBuiltIns:
  - false 不对polyfills做任何操作
  - entry 根据target中浏览器版本的支持，将polyfills拆分引入，仅引入有浏览器不支持的polyfill
  - usage 检测代码中ES6/7/8等的使用情况，仅仅加载代码中用到的polyfill
> 注意： 因为在项目中都会排除node_modules里面的js文件，加快项目的编译速度。出于这个考虑，不建议使用把env的useBuiltIns设置为usage，这样可能会导致node_modules里面的库使用了某些需要polyfill的api，但是我们又没有引入对应的polyfill文件，在某些环境会出现bug。
> 在项目里，建议使用entry这个配置，并配合browserslist，对于某些已经被目标环境支持的api不用引入对应的polyfill文件，减少项目的文件体积。

### plugin-transform-runtime
- corejs
  - false 或 不设置 : 用的corejs 只改语法，不改api
  - 2 : 用的corejs2，改语法，api(不修改原型链上的那种api)
- helpers: 默认值是true，用来开启是否使用helper函数来重写语法转换的函数。
- 是否对文件使用ES的模块语法，使用ES的模块语法可以减少文件的大小