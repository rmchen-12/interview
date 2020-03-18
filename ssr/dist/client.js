"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRouterDom = require("react-router-dom");

var _routesConfig = _interopRequireDefault(require("./routes-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function App() {
  return React.createElement(Layout, null, React.createElement(_reactRouterDom.Switch, null, _routesConfig["default"].map(function (item, index) {
    return React.createElement(_reactRouterDom.Route, {
      path: item.path,
      key: index,
      exact: item.exact,
      render: item.component
    });
  })));
}

var _default = App;
exports["default"] = _default;