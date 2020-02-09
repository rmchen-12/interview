let less = require('less');
function loader(source) {
  let css = '';
  less.render(source, function(err, c) {
    // 这是less插件提供的解析方法
    css = c.css;
  });
  css = css.replace(/\n/g, '\\n'); // 这里\n是换行，但转换成字符串后，不能正确解析
  return css;
}
module.exports = loader;
