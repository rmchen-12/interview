"use strict";

var _reactRouterConfig = require("react-router-config");

var _server = require("react-dom/server");

var _routesConfig = _interopRequireDefault(require("./routes-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入官方库
//node server
http.createServer(function (req, res) {
  var url = req.url; //简单容错，排除图片等资源文件的请求

  if (url.indexOf('.') > -1) {
    res.end('');
    return false;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  }); //查找组件

  var branch = (0, _reactRouterConfig.matchRoutes)(_routesConfig["default"], url); //得到组件

  var Component = branch[0].route.component; // 数据预取

  var data = Component.getInitialProps(branch[0].match.params); //将组件渲染为 html 字符串

  var html = (0, _server.renderToString)(React.createElement(Component, {
    data: data
  }));
  res.end(html);
}).listen(8080);