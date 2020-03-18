class P {
  // 模拟一个plugin
  apply(complier) {
    complier.hooks.emit.tap('emit', function() {
      // 注册钩子“emit”
      console.log('emit');
    });
  }
}

module.exports = P;
