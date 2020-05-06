"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

Point.name = 'point';
var point = new Point(2, 3);