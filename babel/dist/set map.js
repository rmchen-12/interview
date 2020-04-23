"use strict";

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