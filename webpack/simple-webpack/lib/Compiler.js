let path = require('path');
let fs = require('fs');
let babylon = require('babylon');
let traverse = require('@babel/traverse').default; // (遍历到对应节点)通过AST生成一个便于操作、转换的path对象，供我们的babel插件处理
let generator = require('@babel/generator').default; // 读取AST并将其转换为代码和源码映射
let t = require('@babel/types'); // 替换节点
let ejs = require('ejs');
let { SyncHook } = require('tapable');

class Compiler {
  constructor(config) {
    //entry，output。。。也就是webpack.config.js
    this.config = config;
    // 需要保存入口文件的路径
    this.entryId; // './src/index.js',这个留到后边补充
    // 需要保存所有的模块依赖
    this.modules = {};
    this.entry = config.entry; // 入口路径
    // 工作路径(运行命令的路径)
    this.root = process.cwd();
    
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    };
    // 如果传递了plugins参数
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this);  //插件内部都由apply方法
      });
    }
    // 插件装载完成
    this.hooks.afterPlugins.call();  //调用钩子
  }
  getSource(modulePath) {
    // 拿到匹配规则
    let rules = this.config.module.rules;
    // 拿到文件内容
    let content = fs.readFileSync(modulePath, 'utf8');
    // 分别处理不同规则
    rules.forEach((rule, index) => {
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) {
        // 如果匹配到了，也就是说这个模块需要用loader来转换
        function normalLoader() {
          let loader = require(use[len--]); // 因为loader规则是从下至上，从右至左的
          // 递归调用loader,实现转化功能
          // loader获取对应的loader函数
          content = loader(content);
          if (len >= 0) {
            normalLoader(); // 如果还有loader，继续执行
          }
        }
        normalLoader();
      }
    });
    return content;
  }

  // 解析源码
  parse(source, parentPath) {
    // AST解析语法树
    let ast = babylon.parse(source); //转换成ast
    let dependencies = []; //依赖的数组

    traverse(ast, {
      // 遍历ast
      CallExpression(p) {
        // 调用表达式, 即functionName()这种形式的
        // 以下内容，详见  https://astexplorer.net/
        let node = p.node; //对应的节点
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value; // 这里就取到了模块引用的名字
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); //  加文件后缀 -> ./a.js
          moduleName = './' + path.join(parentPath, moduleName); //改造路径 -> './src/a.js'
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)]; //重写节点的arguments -> 改写源码
        }
      }
    });

    let sourceCode = generator(ast).code;
    return {
      // 解析后的源码和依赖return出去
      sourceCode,
      dependencies
    };
  }

  // 构建模块
  buildModules(modulePath, isEntry) {
    let source = this.getSource(modulePath); //“绝对路径”， 编码utf-8
    // 模块ID（查看webpack打包后的文件，文件key值为相对路径，而我们此处拿到的是绝对路径，因此需要减去这些前置路径）
    // modulePath = modulePath - this.root
    let moduleName = './' + path.relative(this.root, modulePath); //这样，就解析出了一个相对路径

    if (isEntry) {
      this.entryId = moduleName; // 保存入口的名字
    }
    // 解析，需要把source源码进行改造，返回一个依赖列表
    // 还进行一些别的工作，比如将"./a.js"解析为"./src/a.js"
    // 这些工作都由parse方法来完成，此处的parse函数接下来详细解释
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );
    // 把相对路径和模块中的内容对应起来（{文件名：解析后的文件内容}
    this.modules[moduleName] = sourceCode;
  }
  emitFile() {
    // 发射文件
    //用数据渲染ejs
    //拿到配置的出口
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    let code = ejs.render(templateStr, {
      // 用entryId和modules渲染ejs模板
      entryId: this.entryId,
      modules: this.modules
    });
    this.assets = {}; // 因为输出的文件可能不止一个js
    // 资源中路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }
  run() {
    // 执行
    // 创建模块的依赖关系
    this.buildModules(path.resolve(this.root, this.entry), true); // 入口路径， 是否主模块
    // 发射一个文件 -> 打包后的文件
    this.emitFile();
  }
}

module.exports = Compiler;
