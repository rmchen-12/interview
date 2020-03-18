CSRF 跨站请求伪造
假设有一个 bbs 站点：http://www.c.com，当登录后的用户发起如下 GET 请求时，会删除 ID 指定的帖子：
`http://www.c.com:8002/content/delete/:id`
如发起 http://www.c.com:8002/content/delete/87343 请求时，会删除 id 为 87343 的帖子。当用户登录之后，会设置如下 cookie：
`res.setHeader('Set-Cookie', ['user=22333; expires=Sat, 21 Jul 2018 00:00:00 GMT;']);`
user 对应的值是用户 ID。然后构造一个页面 A：
`<p>CSRF 攻击者准备的网站：</p>
<img src="http://www.c.com:8002/content/delete/87343">`
页面 A 使用了一个 img 标签，其地址指向了删除用户帖子的链接
当登录用户访问攻击者的网站时，会向 www.c.com 发起一个删除用户帖子的请求。此时若用户在切换到 www.c.com 的帖子页面刷新，会发现ID 为 87343 的帖子已经被删除

防范：
- 验证码, CSRF 攻击往往是在用户不知情的情况下构造了网络请求。而验证码会强制用户必须与应用进行交互，才能完成最终请求
- Referer Check，根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。通过 Referer Check，可以检查请求是否来自合法的"源"
- 添加 token 验证，可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求