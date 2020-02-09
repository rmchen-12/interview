const server  = require('./mock-server')

function MockWebpackPlugin({ config, port = 3000 }) {
  // 将config和port放在属性里，方便apply方法调用
  this.config = config;
  this.port = port;
}

MockWebpackPlugin.prototype.apply = function(compiler) {
  // 调用启动express的函数
  server({ config: this.config, port: this.port });

  // 注册一个webpack插件
  compiler.plugin('emit', (compilation, callback) => {
    callback();
  });
};