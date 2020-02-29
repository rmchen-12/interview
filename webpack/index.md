### tree-shaking
- 适用于用rollup开发库，导出umd,esm两种模式的代码
- 业务代码区别不大，反正都是有用的代码，不会摇掉
- 只要你的包不是用来做 polyfill 或 shim 之类的事情，就尽管放心的给他加上 sideEffects: false 吧！

### webpack4废弃了CommonsChunkPlugin，引入了optimization.splitChunks和optimization.runtimeChunk
- CommonsChunkPlugin问题(多入口时)(父子关系)(只生成一个)
  - 产出的chunk在引入的时候，会包含重复的代码；
  - 无法优化异步chunk，异步模块无法处理；
  - 高优的chunk产出需要的minchunks配置比较复杂。
- splitChunks(chunkGroup)(生成多个)
  - 新产出的vendor-chunk是要被共享的，或者模块来自npm包；
  - 新产出的vendor-chunk的大小得大于30kb；
  - 并行请求vendor-chunk的数量不能超出5个；
  - 对于entry-chunk而言，并行加载的vendor-chunk不能超出3个。
- runtimeChunk 
  - 可以将每个entry chunk中的runtime部分的函数分离出来，只需要一个简单的配置`optimization.runtimeChunk: true`

### 

### hash,chunkhash,contenthash区别
- hash(工程级别)
  即每次修改任何一个文件，所有文件名的hash至都将改变
- chunkhash(作用于模块)
  根据据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
  但是，因为依赖的hash都一致，同一模块css和js的也一致，如果只是css变了，那这整个模块的hash也会变
- contenthash(针对文件)
  只有当文件变了才会变  