## 旧reconciliation算法给人卡顿的感觉：
在setState后，react会立即开始reconciliation过程，从父节点（Virtual DOM）开始遍历，以找出不同。将所有的Virtual DOM遍历完成后，reconciler才能给出当前需要修改真实DOM的信息，并传递给renderer，进行渲染，然后屏幕上才会显示此次更新内容,对于特别庞大的vDOM树来说，reconciliation过程会很长(x00ms)，在这期间，主线程是被js占用的，因此任何交互、布局、渲染都会停止，给用户的感觉就是页面被卡住了。一气呵成。
    - 并不是所有的state更新都需要立即显示出来，比如屏幕之外的部分的更新
    - 并不是所有的更新优先级都是一样的，比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高
    - 理想情况下，对于某些高优先级的操作，应该是可以打断低优先级的操作执行的，比如用户输入时，页面的某个评论还在reconciliation，应该优先响应用户输入

## 用了fiber后有些生命周期会执行两次？
优先级的问题，因为即使用了fiber方案，但是某些耗时的渲染任务仍然会堵塞渲染
所以增加了优先级策略，高优先级允许打断低优先级，但重新执行低优先级任务的时候不会继续，而是重新开始，这样就会导致两个问题
    - 饿死：正在实验中的方案是重用，也就是说高优先级的操作如果没有修改低优先级操作已经完成的节点，那么这部分工作是可以重用的。
    - 一次渲染可能会调用多次声明周期函数，如果其中有副作用的话，会导致再执行一次，最终结果可能不一致
所以就直接删了有副作用的生命周期

何为fiber
## 一种流程控制原语
Fiber 也称协程、或者纤程, React Fiber 的思想和协程的概念是契合的: React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。
- js执行和GUI渲染互斥，浏览器无法抢占资源，只能js主动让出，这是一种’契约‘调度，要求我们的程序和浏览器紧密结合，互相信任。比如可以由浏览器给我们分配执行时间片(通过requestIdleCallback实现, 下文会介绍)，我们要按照约定在这个时间内执行完毕，并将控制权还给浏览器。
- 不用Generator，因为改造麻烦，恢复状态也麻烦
- requestIdleCallback(callback,options)通过这个sheduler的调度，有理有节有据的的实现了在每一帧（时间充足就调用，时间不充足就下一帧）的缝隙中插入任务执行。
  - 超时检查的机制来让出控制权，确定一个合理的运行时长，然后在合适的检查点检测是否超时(比如每执行一个小任务)，如果超时就停止执行，将控制权交换给浏览器。
  - options提供了超时时间，避免饿死
  - 超时时间，低优先级的可以慢慢等待, 高优先级的任务应该率先被执行.
    - Immediate(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断
    - UserBlocking(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈
    - Normal (5s) 应对哪些不需要立即感受到的任务，例如网络请求
    - Low (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知
    - Idle (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死
  - 兼容性差，兼容代码如下
```
const el = document.getElementById('root')
const btn = document.getElementById('btn')
const ch = new MessageChannel()
let pendingCallback
let startTime
let timeout

ch.port2.onmessage = function work()  {
  // 在绘制之后被执行
  if (pendingCallback) {
    const now = performance.now()
    // 通过now - startTime可以计算出requestAnimationFrame到绘制结束的执行时间
    // 通过这些数据来计算剩余时间
    // 另外还要处理超时(timeout)，避免任务被饿死
    // ...
    if (hasRemain && noTimeout) {
      pendingCallback(deadline)
    }
  }
}

// ...

function simpleRequestIdleCallback(callback, timeout) {
  requestAnimationFrame(function animation() {
    // 在绘制之前被执行
    // 记录开始时间
    startTime = performance.now()
    timeout = timeout
    dosomething()
    // 调度回调到绘制结束后执行
    pendingCallback = callback
    ch.port1.postMessage('hello')
  })
}
```

## 一个执行单元
 这是一种数据结构或者说执行单元。我们暂且不管这个数据结构长什么样，🔴将它视作一个执行单元，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去.

## 基于fiber的改造
- 数据结构的调整
  -  React 16 之前，Reconcilation 是同步的、递归执行的。也就是说这是基于函数’调用栈‘的Reconcilation算法，因此通常也称它为Stack Reconcilation（不能随意中断、也很难被恢复, 不利于异步处理）
  -  对React现有的数据结构进行调整为双向链表，深度优先遍历，模拟函数调用栈, 将之前需要递归进行处理的事情分解成增量的执行单元，将递归转换成迭代
- 两个阶段的拆分（之前都是一边Diff一边提交的）
  - Reconciliation(协调阶段) 协调阶段可能被中断、恢复，甚至重做，生命周期钩子可能会被调用多次，所以该阶段生命周期不能包含副作用
    - 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'副作用(Effect)' . 以下生命周期钩子会在协调阶段被调用
      - constructor
      - componentWillMount 废弃
      - componentWillReceiveProps 废弃
      - static getDerivedStateFromProps
      - shouldComponentUpdate
      - componentWillUpdate 废弃
      - render
  - Commit(提交阶段) 提交阶段必须同步执行，不能中断，因为我们要正确地处理各种副作用，包括DOM变更、还有你在componentDidMount中发起的异步请求、useEffect 中定义的副作用... 因为有副作用，所以必须保证按照次序只调用一次，况且会有用户可以察觉到的变更, 不容差池。
    - 将上一个阶段计算出来的需要处理的**副作用(sideEffects)**一次性执行了。这个阶段必须同步执行，不能被打断. 这些生命周期钩子在提交阶段被执行
      - getSnapshotBeforeUpdate() 严格来说，这个是在进入 commit 阶段前调用
      - componentDidMount
      - componentDidUpdate
      - componentWillUnmount
- Reconcilation 生成WIP树，对于需要变更的节点，都打上了'标签'（effectTag）。 在提交阶段，React 就会将这些打上标签的节点应用变更

- 双缓冲（WIP树）一边是旧树，一边是WIP树，全称workinprogress
  - WIP树就是一个缓冲，它在Reconciliation 完毕后一次性提交给浏览器进行渲染。它可以减少内存分配和垃圾回收，WIP 的节点不完全是新的，比如某颗子树不需要变动，React会克隆复用旧树中的子树。
  - 双缓存技术还有另外一个重要的场景就是异常的处理，比如当一个节点抛出异常，仍然可以继续沿用旧树的节点，避免整棵树挂掉。
- 副作用的收集和提交 通过nextEffect来找一个所有需要提交的节点，一并提交了


一个Fiber的结构
```
interface Fiber {
  /**
   * ⚛️ 节点的类型信息
   */
  // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
  tag: WorkTag,
  // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
  type: any,

  /**
   * ⚛️ 结构信息
   */ 
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  // 子节点的唯一键, 即我们渲染列表传入的key属性
  key: null | string,

  /**
   * ⚛️ 节点的状态
   */
  // 节点实例(状态)：
  //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
  //        对于类组件来说，这里保存类组件的实例
  //        对于函数组件说，这里为空，因为函数组件没有实例
  stateNode: any,
  // 新的、待处理的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any, // The props used to create the output.
  // 上一次渲染的组件状态
  memoizedState: any,


  /**
   * ⚛️ 副作用
   */
  // 当前节点的副作用类型，例如节点更新、删除、移动
  effectTag: SideEffectTag,
  // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
  nextEffect: Fiber | null,

  /**
   * ⚛️ 替身
   * 指向旧树中的节点
   */
  alternate: Fiber | null,
}
```

fiber是深度优先双向循环链表结构，支持中断回溯
## 链表与数组优劣
### 数组
随机访问性比较强，可以通过下标进行快速定位。
查找速度快

插入和删除的效率低，需要移动其他元素。
会造成内存的浪费，因为内存是连续的，所以在申请数组的时候就必须规定七内存的大小，如果不合适，就会造成内存的浪费。
内存空间要求高，创建一个数组，必须要有足够的连续内存空间。
数组的大小是固定的，在创建数组的时候就已经规定好，不能动态拓展。

### 链表
插入和删除的效率高，只需要改变指针的指向就可以进行插入和删除。
内存利用率高，不会浪费内存，可以使用内存中细小的不连续的空间，只有在需要的时候才去创建空间。大小不固定，拓展很灵活。
双向链表还能回溯，react fiber需要

查找的效率低，因为链表是从第一个节点向后遍历查找。

## 为什么用深度优先
如果树结构使用广度优先遍历，那么组件的生命周期将会乱套，因为生命周期的顺序是父componentWillMount-子componentWillMount-子componentDidMount-父componentDidMount，深度优先遍历可完美复现 react 15 的生命周期顺序；且一个虚拟 dom 的渲染要暂停，一般是得把最底层的虚拟 dom 给渲染完之后再暂停，没有道理先渲染组件的 sibling 组件

## 副作用
将 React 中的一个组件视为一个使用 state 和 props 来计算 UI 表示的函数。其他所有活动，如改变 DOM 或调用生命周期方法，都应该被视为副作用。为了加速更新，只对更新的元素进行处理，react 实现了一个副作用列表，能够快速跳过未更新的元素，对副作用列表的元素进行处理，应用副作用。
