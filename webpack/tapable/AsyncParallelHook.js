/**
 * 为异步并行执行，通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）
 */
class AsyncParallelHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tabAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    // 先取出最后传入的回调函数
    let finalCallback = args.pop();

    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 定义一个 i 变量和 done 函数，每次执行检测 i 值和队列长度，决定是否执行 callAsync 的回调函数
    let i = 0;
    let done = () => {
      if (++i === this.tasks.length) {
        finalCallback();
      }
    };

    // 依次执行事件处理函数
    this.tasks.forEach(task => task(...args, done));
  }
}

// 创建实例
let asyncParallelHook = new AsyncParallelHook(['name', 'age']);

// 注册事件
console.time('time');
asyncParallelHook.tapAsync('1', (name, age, done) => {
  settimeout(() => {
    console.log('1', name, age, new Date());
    done();
  }, 1000);
});

asyncParallelHook.tapAsync('2', (name, age, done) => {
  settimeout(() => {
    console.log('2', name, age, new Date());
    done();
  }, 2000);
});

asyncParallelHook.tapAsync('3', (name, age, done) => {
  settimeout(() => {
    console.log('3', name, age, new Date());
    done();
    console.timeEnd('time');
  }, 3000);
});

// 触发事件，让监听函数执行
asyncParallelHook.callAsync('panda', 18, () => {
  console.log('complete');
});

// 1 panda 18 2018-08-07T10:38:32.675Z
// 2 panda 18 2018-08-07T10:38:33.674Z
// 3 panda 18 2018-08-07T10:38:34.674Z
// complete
// time: 3005.060ms

// 模拟 AsyncParallelHook 类 tapPromise/promise
class AsyncParallelHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
        args = args.slice(0, this.args.length);

        // 将所有事件处理函数转换成 Promise 实例，并发执行所有的 Promise
        return Promise.all(this.tasks.map(task => task(...args)));
    }
}

// 创建实例
let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

// 注册事件
console.time("time");
asyncParallelHook.tapPromise("1", (name, age) => {
    return new Promise((resolve, reject) => {
        settimeout(() => {
            console.log("1", name, age, new Date());
            resolve("1");
        }, 1000);
    });
});

asyncParallelHook.tapPromise("2", (name, age) => {
    return new Promise((resolve, reject) => {
        settimeout(() => {
            console.log("2", name, age, new Date());
            resolve("2");
        }, 2000);
    });
});

asyncParallelHook.tapPromise("3", (name, age) => {
    return new Promise((resolve, reject) => {
        settimeout(() => {
            console.log("3", name, age, new Date());
            resolve("3");
            console.timeEnd("time");
        }, 3000);
    });
});

// 触发事件，让监听函数执行
asyncParallelHook.promise("panda", 18).then(ret => {
    console.log(ret);
});

// 1 panda 18 2018-08-07T12:17:21.741Z
// 2 panda 18 2018-08-07T12:17:22.736Z
// 3 panda 18 2018-08-07T12:17:23.739Z
// time: 3006.542ms
// [ '1', '2', '3' ]