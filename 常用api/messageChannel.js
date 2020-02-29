/**
 * 兼容性在PC还好，移动端不行
 * 属于宏任务，vue的nextTick兼容写法就是先调setImmediate -> MessageChannel -> setTimeout
 * */

var channel = new MessageChannel();
var port1 = channel.port1;
var port2 = channel.port2;
port1.onmessage = function(event) {
  console.log('port1收到来自port2的数据：' + event.data);
};
port2.onmessage = function(event) {
  console.log('port2收到来自port1的数据：' + event.data);
};

port1.postMessage('发送给port2');
port2.postMessage('发送给port1');
