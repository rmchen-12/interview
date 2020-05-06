"use strict";

var a = ['a', 'b', 'c', 'd', 'e'];
var b = {
  a: 1,
  b: 3,
  c: function c() {
    return 3;
  }
};

for (var _i = 0, _a = a; _i < _a.length; _i++) {
  var val = _a[_i];
  console.log(val);
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = b[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var iterator = _step.value;
    console.log(iterator);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}