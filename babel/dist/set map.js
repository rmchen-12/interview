"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var set = new Set([1, 2, 3, 4, 4]);
var a = [[1, 2], [3, 4]];
var ws = new WeakSet(a);
var map = new Map([['name', '张三'], ['title', 'Author']]);
var wm = new WeakMap();
var key = {};
var obj = {
  foo: 1
};
wm.set(key, obj);