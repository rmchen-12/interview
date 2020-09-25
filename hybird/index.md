### 目前的 hybrid 方案

1. RN 渲染层是直接编译成 native 语言
2. js sdk 方案
3. 小程序方案 双线程模型，js 运行在 jscore 中，页面在 webview 中运行，js 执行不堵塞页面渲染，中间通过 native 通信
   1. 缺点天生的延迟，因为涉及到线程间异步通信，框架层面可以排序好时序，
   2. 当然在实时性要求高的情况下微信用了原生来渲染实现，但是原生的话无法通过 css 样式来控制，而且层级最高

### 背景

保证性能的同时，经常性更改的页面改用 web 开发，保证一定程度的灵活性，可以减少新包上架的频率

### 数据通信

1. 直接 URL 上传参
2. 往 window 对象上注入 API，拦截 URL Scheme 、重写 prompt
3. JSBridge 由 native 注入，进来时先判断是否注入成功

### 兼容性问题

1. iPhone 全面屏的底部安全区域，`viewport-fit=cover` `env(safe-area-inset-bottom)`
2. 视频播放问题
   1. 直播流已经拿到了但是还在加载视频文件，但播放器 loading 是已经消失了的，这段黑屏时间可能很久，自写 loading，监听`timeupdate`，不为 0 的时候再隐藏 loading
   2. 切换高清非高清也加一个，理由同上
   3. x5-video-player-type：h5/x5, h5 播放不能切全屏，安卓不支持自动播放，但是微信内是支持的；IOS 不支持自动播放，后来发现是容器问题，要加个属性
3. fastClick 在 IOS 上不能 focus 的问题
4. 微信里底部出现导航栏遮挡页面的问题
   1. 在加载数据的位置加上 setTimeout，等微信底部返回栏加载后再加载页面；
   2. 隐藏微信底部返回栏，在跳转链接的位置使用 window.location.replace()。
   3. document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      WeixinJSBridge.call('hideToolbar');
      });
5. antd-mobile
   1. popover 会发生点击穿透，中间加一层隔断，在这里阻止事件传递
6. 少用`position:fixed`，键盘弹起时会错位，尽量用 flex
7. 调用键盘时弹起底部提交按钮
   1. 监听屏幕 resize，改变时隐藏底部按钮
   2. flex 布局
