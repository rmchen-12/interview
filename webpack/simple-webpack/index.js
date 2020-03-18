let path = require('path');

// config配置文件
let config = require('./webpack.config.js'); // 首先拿到用户的webpack配置
let Compiler = require('./lib/Compiler.js');

let compiler = new Compiler(config); // 编译配置
// 标识运行编译
compiler.run();
