背景：
- 打包慢，本地就将近10分钟，ci上将近15分钟，已经开启了dll,happyPack
- 集成其他业务繁琐，独立出特色业务繁琐，电商被剥离出去独立，又要整合回来，用了babel转义，但只会导致越来越大
- 风险大，一个地方崩了就整个应用全崩了，采用微前端就可以各个模块承担风险

其他
- 现有目录结构不能做大调整，平滑过渡
- 公共第三方共为cdn，公共组件，公共函数抽离，rollup打包
- 全局唯一的组件通信

目前可用的方案
- 由nginx分发路由的方式，会刷新页面，体验啥的都不好
- iFrame  
  - 可以创建一个全新的独立的宿主环境，iFrame 的页面和父页面是分开的，作为独立区域而不受父页面的 CSS 或者全局的 JavaScript 影响
  - 其会进行资源的重复加载，占用额外的内存；其会阻塞主页面的 onload 事件，和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载，以及滚动条页面缩放等
  - 可通过BroadcastChannel，SharedWorker，Local Storage通信
- Web Components && Shadow DOM
  - Shadow DOM 它允许在文档（document）渲染时插入一棵 DOM 元素子树，但是这棵子树不在主 DOM 树中。因此开发者可利用 Shadow DOM 封装自己的 HTML 标签、CSS 样式和 JavaScript 代码。子树之间可以相互嵌套，对其中的内容进行了封装，有选择性的进行渲染
  - 可惜兼容性很差，基本全红，ie全挂，其他高版本可用
