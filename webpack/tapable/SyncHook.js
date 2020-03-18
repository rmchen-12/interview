/**
 * 为串行同步执行，不关心事件处理函数的返回值，在触发事件之后，会按照事件注册的先后顺序执行所有的事件处理函数。
 */
class SyncHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    // 也可在参数不足时抛出异常
    if (args.length < this.args.length) throw new Error('参数不足');

    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 依次执行事件处理函数
    this.tasks.forEach(task => task(...args));
  }
}

// 创建实例
let syncHook = new SyncHook(["name", "age"]);

// 注册事件
syncHook.tap("1", (name, age) => console.log("1", name, age));
syncHook.tap("2", (name, age) => console.log("2", name, age));
syncHook.tap("3", (name, age) => console.log("3", name, age));

// 触发事件，让监听函数执行
syncHook.call("panda", 18);

// 1 panda 18
// 2 panda 18
// 3 panda 18
复制代码