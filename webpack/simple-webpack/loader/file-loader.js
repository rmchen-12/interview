let loaderUtils = require('loader-utils');
function loader(source) {
  //
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content: source
  }); // 根据内容生成一个[hash].[ext]的文件
  this.emitFile(filename, source); // 发射文件
  return `module.exports="./dist/${filename}"`; //因为生成的图片在dist目录下
}
loader.raw = true; // 转二进制处理
module.exports = loader;
