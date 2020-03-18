/**
 * 为串行同步执行，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数，依次类推，正因如此，只有第一个事件处理函数的参数可以通过 call 传递，而 call 的返回值为最后一个事件处理函数的返回值
 */
class SyncWaterfallHook {
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

    // 依次执行事件处理函数，事件处理函数的返回值作为下一个事件处理函数的参数
    let [first, ...others] = this.tasks;
    return reduce((ret, task) => task(ret), first(...args));
  }
}

// SyncWaterfallHook 钩子的使用
const { SyncWaterfallHook } = require('tapable');

// 创建实例
let syncWaterfallHook = new SyncWaterfallHook(['name', 'age']);

// 注册事件
syncWaterfallHook.tap('1', (name, age) => {
  console.log('1', name, age);
  return '1';
});

syncWaterfallHook.tap('2', data => {
  console.log('2', data);
  return '2';
});

syncWaterfallHook.tap('3', data => {
  console.log('3', data);
  return '3';
});

// 触发事件，让监听函数执行
let ret = syncWaterfallHook.call('panda', 18);
console.log('call', ret);

// 1 panda 18
// 2 1
// 3 2
// call 3
