let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
function loader(source) {
  //参数“this”,指代loader的上下文--loaderContext
  // console.log(Object.keys(this));
  let options = loaderUtils.getOptions(this);
  let cb = this.async(); //原生的函数，有一个flag，如果是同步，那么loader中会自动调用这个函数，异步的话，需要自己手动调用
  console.log(this.resourcePath); // 打印查看绝对路径
  babel.transform(
    source,
    {
      ...options, // presets: options.presets
      sourceMap: true, //但是，如果要真正有sourceMap的效果，webpack中也必须配置devtool字段
      filename: this.resourcePath.split('/').pop() //文件名
    },
    function(err, result) {
      // 转换是个异步的过程，因此像下边“return source”这种是不行的
      cb(err, result.code, result.map); //固定参数
    }
  );
}
module.exports = loader;
