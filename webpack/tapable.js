// 模拟 SyncHook 类
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

