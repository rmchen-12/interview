/**
 * 同样为串行同步执行，如果事件处理函数执行时有一个返回值不为空（即返回值为 undefined），则跳过剩下未执行的事件处理函数（如类的名字，意义在于保险
 */
class SyncBailHook {
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

    // 依次执行事件处理函数，如果返回值不为空，则停止向下执行
    let i = 0,
      ret;
    do {
      ret = this.tasks[i++](...args);
    } while (!ret);
  }
}

// 创建实例
let syncBailHook = new SyncBailHook(['name', 'age']);

// 注册事件
syncBailHook.tap('1', (name, age) => console.log('1', name, age));

syncBailHook.tap('2', (name, age) => {
  console.log('2', name, age);
  return '2';
});

syncBailHook.tap('3', (name, age) => console.log('3', name, age));

// 触发事件，让监听函数执行
syncBailHook.call('panda', 18);

// 1 panda 18
// 2 panda 18
