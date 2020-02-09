背景：http是无状态的，无法保存状态

1. cookie，客户端策略
   服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上 
   作用
     1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
     2. 个性化设置（如用户自定义设置、主题等）
     3. 浏览器行为跟踪（如跟踪分析用户行为等）
   不可跨域，一级域名和二级域名之间是允许共享使用的（靠的是 domain） 
   一些属性
     - name=value domain path maxAge expires secure httpOnly
    
2. session，服务器保存的策略，比如如果cookie被禁了,还可以通过url传参的形式访问等等，只要能把sessionID传过去就行了
   Session 对象存储特定用户会话所需的属性及配置信息，当客户端关闭会话，或者 Session 超时失效时会话结束
   作用
     1. 存储特定用户会话所需的属性及配置信息，通过sessionID来和cookie保持连接
   如果浏览器中禁止了 Cookie，怎么保证机制可用
     1. get:`url?SessionID=123456`,post:带参数传过去就可以
     2. Token 机制
   分布式session
     1. Nginx ip_hash，每个请求按访问 IP 的 hash 分配，这样来自同一 IP 固定访问一个后台服务器
     2. Session 复制，任何一个服务器上的 Session 发生改变（增删改），该节点会把这个 Session 的所有内容序列化，然后广播给所有其它节点
     3. 共享 Session，比如存在集群redis中，服务端无状态化，将用户的 Session 等信息使用缓存中间件来统一管理，保障分发到每一个服务器的响应结果都一致

3. sessionStorage，localStorage
   1. 可以存5M
   2. 本地化存储，不与服务器交互，更安全
   3. local永久存，session会话中保存
   4. localStorage在所有同源窗口中都是共享的，sessionStorage不在不同的浏览器窗口中共享
   5. 支持事件通知机制，改变后可以广播监听
   6. 接口人性化