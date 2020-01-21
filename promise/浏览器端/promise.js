function Bromise(executor) {
  var onResolve_ = null;
  var onReject_ = null;
  //模拟实现resolve和then，暂不支持rejcet
  this.then = function(onResolve, onReject) {
    onResolve_ = onResolve;
  };
  function resolve(value) {
    // 用setTimeout延迟队列来延迟方法的调用，放到宏任务的后头执行,延迟绑定函数
    setTimeout(() => {
      onResolve_(value);
    }, 0);
  }
  executor(resolve, null);
}

let demo = new Bromise((resolve, reject) => resolve(100));
demo.then(value => {
  console.log(value);
});
