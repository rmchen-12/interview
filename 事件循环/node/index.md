┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     io callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘

定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
待定回调：执行网络，流，TCP错误的回调。
idle, prepare：仅系统内部使用。
轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞，检查定时器是否到时。
检测：setImmediate() 回调函数在这里执行。
关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

### setImmediate() 对比 setTimeout()
1. 运行以下不在 I/O 周期（即主模块）内的脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束
2. 如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用

### process.nextTick()
从技术上讲不是事件循环的一部分。相反，它都将在当前操作完成后处理 nextTickQueue， 而不管事件循环的当前阶段如何
1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求
2. 有时有让回调在栈展开后，但在事件循环继续之前运行的必要

### process.nextTick() 对比 setImmediate()
1. process.nextTick() 在同一个阶段立即执行
2. setImmediate() 在事件循环的接下来的迭代或 'tick' 上触发
