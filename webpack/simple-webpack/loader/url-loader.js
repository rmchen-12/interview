let loaderUtils = require('loader-utils');
let mime = require('mime'); // 这个插件可以拿到文件类型（不是后缀）
function loader(source) {
  let { limit } = loaderUtils.getOptions(this); //拿到用户设置的最小值
  if (limit && limit > source.length) {
    // 比大小
    return `module.exports="data:${mime.getType(
      //这里data:${mime.getType(这里传的是文件绝对路径)}是base64固定写法，常见的比如“data:image/png,data:image/jpeg”...
      this.resourcePath
    )};base64,${source.toString('base64')}"`; //转换为base64
  } else {
    return require('./file-loader').call(this, source); // 不在范围内的话，就执行file-loader，并且将源码传入
  }
  return source;
}
loader.raw = true; //字符串转二进制
module.exports = loader;
