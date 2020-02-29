/**
 * 为串行同步执行，事件处理函数返回 true 表示继续循环，即循环执行当前事件处理函数，返回 undefined 表示结束循环，
 * SyncLoopHook 与 SyncBailHook 的循环不同，SyncBailHook 只决定是否继续向下执行后面的事件处理函数，
 * 而 SyncLoopHook 的循环是指循环执行每一个事件处理函数，直到返回 undefined 为止，才会继续向下执行其他事件处理函数，执行机制同理。
 */
class SyncLoopHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 依次执行事件处理函数，如果返回值为 true，则继续执行当前事件处理函数
    // 直到返回 undefined，则继续向下执行其他事件处理函数
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = this.task(...args);
      } while (ret === true || !(ret === undefined));
    });
  }
}

// 创建实例
let syncLoopHook = new SyncLoopHook(["name", "age"]);

// 定义辅助变量
let total1 = 0;
let total2 = 0;

// 注册事件
syncLoopHook.tap("1", (name, age) => {
    console.log("1", name, age, total1);
    return total1++ < 2 ? true : undefined;
});

syncLoopHook.tap("2", (name, age) => {
    console.log("2", name, age, total2);
    return total2++ < 2 ? true : undefined;
});

syncLoopHook.tap("3", (name, age) => console.log("3", name, age));

// 触发事件，让监听函数执行
syncLoopHook.call("panda", 18);

// 1 panda 18 0
// 1 panda 18 1
// 1 panda 18 2
// 2 panda 18 0
// 2 panda 18 1
// 2 panda 18 2
// 3 panda 18