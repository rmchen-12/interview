1. 使用PureComponent
   - 当props或者state改变时，PureComponent将对props和state进行浅比较,检查原始值是否有相同的值，引用是否相同
   - 不要在props和state中改变对象和数组，因为浅比较比较的是引用，PureComponent不会更新，应该使用assign方法或者数组的扩展运算符或第三方库
2. 不要在render的函数中绑定值
   `<CommentItem likeComment={() => this.likeComment(user.id)} />`
   导致每次父组件render方法被调用时，一个新的函数被创建，已将其传入likeComment。这会有一个改变每个子组件props的副作用，它将会造成他们全部重新渲染，即使数据本身没有发生变化
   `<CommentItem likeComment={this.likeComment} userID={user.id} />`
3. 不要在render方法里派生数据
   ```
   render() {
      const { posts } = this.props
      const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
      return //...
    }
   ```
   每次组件重新渲染时topTen都将有一个新的引用，即使posts没有改变并且派生数据也是相同的。这将造成列表不必要的重新渲染
   ```
    componentWillMount() {
      this.setTopTenPosts(this.props.posts)
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.posts !== nextProps.posts) {
        this.setTopTenPosts(nextProps)
      }
    }
    setTopTenPosts(posts) {
      this.setState({
        topTen: posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
      })
    }
   ```
4. 合成事件和原生事件不要混用(如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层)
   1. 合成事件是统一冒泡到document上(video等除外，因为document没有相应的属性)，由合成事件层统一分发管理，只有`冒泡阶段`
   2. 原生总是早与合成触发
   3. 在合成中阻止冒泡，并不能阻止原生事件冒泡，因为合成中都是在document中，通过一个`event.isPropagationStopped()`判断来break循环，所有`stopImmediatePropagation`也没比较实现了
   4. 阻止原生事件的冒泡后，会阻止合成事件的监听器执行

### 组件拆分
- 函数型
  ```
      <div>
        {this.renderHeading()}
        {this.renderBody()}
      </div>
  ```
- 函数式组件/无状态组件
  ```
      <div>
        // Nice and explicit about which props are used
        <PanelHeader title={this.props.title}/>
        <PanelBody content={this.props.content}/>
      </div>
  ```
- 模版化组件
  ```
      <div>
        <CommentHeading>
          <Avatar user={...}/>
          // Slot for metadata
          <span>{this.props.metadata}</span>
        </CommentHeading>
        <CommentBody/>
        <CommentFooter>
          <Timestamp time={...}/>
          // Slot for actions
          <span>{this.props.actions}</span>
        </CommentFooter>
      </div>
  ```
- 高阶组件

### React 处理 this 上下文环境
1. React.createClass 自动绑定
2. 渲染时绑定(当组件每次重新渲染时，都会有一个新的函数创建)
   ```
   onChange = {this.handleChange.bind(this)}
   ```
3. 箭头函数绑定(同上)
   ```
   onChange = {e => this.handleChange(e)}
   ```
4. Constructor 内绑定(可读性和可维护性上也许有些欠缺，因为是实例属性所以会有组件实例重复问题，但是重新渲染时不会重新创建)
   ```
   constructor(props) {
     super(props);
     this.handleChange = this.handleChange.bind(this);
   }
   ```
5. Class 属性中使用 = 和箭头函数(目前还是编译到es5，变成4的形式，如果将来支持到的话那就不会有以上缺点)
   ```
   handleChange = () => {
     // call this function from render 
     // and this.whatever in here works fine.
   };
   ```
  
### 按需加载
```
class ObserverOnce extends Component {
  constructor() {
    super();
    this.state = { hasBeenVisible: false };
    this.io = null;
    this.container = null;
  }
  componentDidMount() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({ hasBeenVisible: true });
          this.io.disconnect();
        }
      });
    }, {});
    this.io.observe(this.container);
  }
  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect();
    }
  }
  render() {
    return (
      <div
        ref={div => {
          this.container = div;
        }}
      >
        {Array.isArray(this.props.children)
          ? this.props.children.map(child => child(this.state.hasBeenVisible))
          : this.props.children(this.state.hasBeenVisible)}
      </div>
    );
  }
}
```