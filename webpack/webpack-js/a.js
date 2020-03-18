const fs = require('fs');
const parser = require('@babel/parser');
const options = require('./webpack.config');
const path = require('path');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

const Parser = {
  getAst: path => {
    // 读取入口文件
    const content = fs.readFileSync(path, 'utf-8');
    // 将文件内容转为AST抽象语法树
    return parser.parse(content, {
      sourceType: 'module'
    });
  },
  getDependencies: (ast, filename) => {
    const dependencies = {};
    // 遍历所有的import模块，存入dependencies
    traverse(ast, {
      // 类型为ImportDeclaration的AST节点（即为import语句）
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        // 保存依赖模块路径，之后生成依赖关系图需要用到
        const filepath = './' + path.join(dirname, node.source.value);
        dependencies[node.source.value] = filepath;
      }
    });
    return dependencies;
  },
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
};

class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 构建启动
  run() {
    // 解析入口文件
    const info = this.build(this.entry);
    this.modules.push(info);
    this.modules.forEach(({ dependencies }) => {
      // 判断有依赖对象，递归解析所有依赖项
      if (dependencies) {
        for (const dependency in dependencies) {
          this.modules.push(this.build(dependencies[dependency]));
        }
      }
    });
    // 生成依赖关系树
    const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        // 使文件路径作为每个模块的唯一标识符，保存对应模块的依赖对象和文件内容
        [item.filename]: {
          dependencies: item.dependencies,
          code: item.code
        }
      }),
      {}
    );
    this.generate(dependencyGraph);
  }
  build(filename) {
    const { getAst, getDependencies, getCode } = Parser;
    const ast = getAst(this.entry);
    const dependencies = getDependencies(ast, this.entry);
    const code = getCode(ast);
    return {
      // 文件路径，可以作为每一个模块的唯一标识符
      filename,
      // 依赖对象，保存着依赖模块路径
      dependencies,
      // 文件内容
      code
    };
  }
  // 重写require函数，输出bundle
  generate(code) {
    // 输出文件路径
    const filePath = path.join(this.output.path, this.output.filename);
    const bundle = `(function(graph) {
          function require(module) {
              function localRequire(relativePath) {
                  return require(graph[module].dependencies[relativePath])
              }
              var exports = {};
              (function(require,exports,code) {
                  eval(code)
              })(localRequire,exports,graph[module].code)
              return exports
          }
          require('${this.entry}')
      })(${JSON.stringify(code)})`;

    // 把文件内容写入到文件系统
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

new Compiler(options).run();
