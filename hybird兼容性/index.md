### 背景
保证性能的同时，经常性更改的页面改用web开发，保证一定程度的灵活性，可以减少新包上架的频率

### 数据通信
1. 直接URL上传参
2. 往window对象上注入API，拦截 URL Scheme 、重写 prompt
3. JSBridge由native注入，进来时先判断是否注入成功

### 兼容性问题
1. iPhone全面屏的底部安全区域，`viewport-fit=cover` `env(safe-area-inset-bottom)`
2. 视频播放问题
   1. 直播流已经拿到了但是还在加载视频文件，但播放器loading是已经消失了的，这段黑屏时间可能很久，自写loading，监听`timeupdate`，不为0的时候再隐藏loading
   2. 切换高清非高清也加一个，理由同上
   3. x5-video-player-type：h5/x5, h5播放不能切全屏，安卓不支持自动播放，但是微信内是支持的；IOS不支持自动播放，后来发现是容器问题，要加个属性
3. fastClick在IOS上不能focus的问题
4. 微信里底部出现导航栏遮挡页面的问题
   1. 在加载数据的位置加上setTimeout，等微信底部返回栏加载后再加载页面；
   2. 隐藏微信底部返回栏，在跳转链接的位置使用window.location.replace()。
   3. document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideToolbar');
      });
5. antd-mobile
   1. popover会发生点击穿透，中间加一层隔断，在这里阻止事件传递
6. 少用`position:fixed`，键盘弹起时会错位，尽量用flex
7. 调用键盘时弹起底部提交按钮
   1. 监听屏幕resize，改变时隐藏底部按钮
   2. flex布局
