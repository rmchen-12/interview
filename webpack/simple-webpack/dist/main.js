(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      orts: {}
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.l = true;
    return module.exports;
  }
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  // 这里遍历modules,生成key: value形式的文件映射
  './src/index.js': function(module, exports, __webpack_require__) {
    eval(`let {
  say
} = __webpack_require__("./src/hello.js"); // require('./index.less');


document.write(say('webpack'));`);
  }
});
