1. xss  Cross Site Script(攻击者对客户端网页注入的恶意脚本一般包括 JavaScript，有时也会包含 HTML 和 Flash。有很多种方式进行 XSS 攻击)
   - 将一些隐私数据像 cookie、session 发送给攻击者
   - 将受害者重定向到一个由攻击者控制的网站
   - 在受害者的机器上进行一些恶意操作
 - 反射型（非持久型）、存储型（持久型）、基于DOM

防范
- 主流的浏览器内置了防范 XSS 的措施，例如 CSP
- HttpOnly 防止劫取 Cookie，使其无法通过js脚本获取
- 输入检查，转义script标签
  ```
    // vuejs 中的 decodingMap
    // 在 vuejs 中，如果输入带 script 标签的内容，会直接过滤掉
    const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n'
    }
  ```
- 输出检查，在变量输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击
   