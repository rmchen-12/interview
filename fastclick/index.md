##  原理
移动端，当用户点击屏幕时，会依次触发 touchstart，touchmove(0 次或多次)，touchend，mousemove，mousedown，mouseup，click。 touchmove 。只有当手指在屏幕发生移动的时候才会触发 touchmove 事件。在 touchstart ，touchmove 或者 touchend 事件中的任意一个调用 event.preventDefault，mouse 事件 以及 click 事件将不会触发。
fastClick 在 touchend 阶段 调用 event.preventDefault，然后通过 document.createEvent 创建一个 MouseEvents，然后 通过 event​Target​.dispatch​Event 触发对应目标元素上绑定的 click 事件。

## 现况
现在移动端基本都不存在设置了不允许缩放时还有300ms延迟的问题，
但是IOS中 UIWebView一直有这个问题，WKWebView 在 iOS 9.3 的时候将这个问题给修复了