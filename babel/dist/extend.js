"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Point =
/*#__PURE__*/
function () {
  function Point(x, y) {
    (0, _classCallCheck2["default"])(this, Point);
    this.x = x;
    this.y = y;
  }

  (0, _createClass2["default"])(Point, null, [{
    key: "toString",
    value: function toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }]);
  return Point;
}();

var ColorPoint =
/*#__PURE__*/
function (_Point) {
  (0, _inherits2["default"])(ColorPoint, _Point);

  function ColorPoint(x, y, color) {
    var _this;

    (0, _classCallCheck2["default"])(this, ColorPoint);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ColorPoint).call(this, x, y)); // 调用父类的constructor(x, y)

    _this.color = color;
    return _this;
  }

  (0, _createClass2["default"])(ColorPoint, [{
    key: "toString",
    value: function toString() {
      return this.color + ' ' + (0, _get2["default"])((0, _getPrototypeOf2["default"])(ColorPoint.prototype), "toString", this).call(this); // 调用父类的toString()
    }
  }]);
  return ColorPoint;
}(Point);

new ColorPoint(1, 2, 'AS');