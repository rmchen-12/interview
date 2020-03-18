/**
 * 为异步串行执行 tapAsync/callAsync
 */
class AsyncSeriesHook {
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

    // 定义一个 i 变量和 next 函数，每次取出一个事件处理函数执行，并维护 i 的值
    // 直到所有事件处理函数都执行完，调用 callAsync 的回调
    // 如果事件处理函数中没有调用 next，则无法继续
    let i = 0;
    let next = () => {
      let task = this.tasks[i++];
      task ? task(...args, next) : finalCallback();
    };
    next();
  }
}

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
console.time("time");
asyncSeriesHook.tapAsync("1", (name, age, next) => {
    settimeout(() => {
        console.log("1", name, age, new Date());
        next();
    }, 1000);
});

asyncSeriesHook.tapAsync("2", (name, age, next) => {
    settimeout(() => {
        console.log("2", name, age, new Date());
        next();
    }, 2000);
});

asyncSeriesHook.tapAsync("3", (name, age, next) => {
    settimeout(() => {
        console.log("3", name, age, new Date());
        next();
        console.timeEnd("time");
    }, 3000);
});

// 触发事件，让监听函数执行
asyncSeriesHook.callAsync("panda", 18, () => {
    console.log("complete");
});

// 1 panda 18 2018-08-07T14:40:52.896Z
// 2 panda 18 2018-08-07T14:40:54.901Z
// 3 panda 18 2018-08-07T14:40:57.901Z
// complete
// time: 6008.790ms

// 模拟 AsyncSeriesHook 类 tapPromise/promise
class AsyncSeriesHook {
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

        // 将每个事件处理函数执行并调用返回 Promise 实例的 then 方法
        // 让下一个事件处理函数在 then 方法成功的回调中执行
        let [first, ...others] = this.tasks;
        return others.reduce((promise, task) => {
            return promise.then(() => task(...args));
        }, first(...args));
    }
}

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
console.time("time");
asyncSeriesHook.tapPromise("1", (name, age) => {
    return new Promise((resolve, reject) => {
        settimeout(() => {
            console.log("1", name, age, new Date());
            resolve("1");
        }, 1000);
    });
});

asyncSeriesHook.tapPromise("2", (name, age) => {
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
asyncSeriesHook.promise("panda", 18).then(ret => {
    console.log(ret);
});

// 1 panda 18 2018-08-07T14:45:52.896Z
// 2 panda 18 2018-08-07T14:45:54.901Z
// 3 panda 18 2018-08-07T14:45:57.901Z
// time: 6014.291ms
// [ '1', '2', '3' ]

