### 优点

1. 状态逻辑复用
2. 没有生命周期的束缚后，一些相互关联的逻辑不用被强行分割。比如在 componentDidMount 中设置了定时器，需要在 componentWillUnmount 中清除；又或者在 componentDidMount 中获取了初始数据，但要记得在 componentDidUpdate 中进行更新。这些逻辑由于 useEffect hook 的引入而得以写在同一个地方，能有效避免一些常见的 bug。
3. 有效减少与善变的 this 打交道。
4. 预编译能力，class 会使优化措施无效，也不能更好的压缩，热重载不稳定

### 缺点

1. hooks 中的 state 每次 render 都是一个全新的引用值，所以为了获得高性能对依赖项额处理要特别小心
2. 使用 useContext 时无法通过 useMemo 进行优化，因为 useMemo 比较的是 props，不会比较 context，
   1. 可以加一层组件作为 props 传入下层
   2. 也可以对 context 在进行拆分细化
