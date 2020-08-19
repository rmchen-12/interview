### 强缓存阶段： 200 (from disk cache)或是 200 OK (from memory cache) ，由浏览器内存占用率决定

- Expires http1.0 ,一个时间点，可能服务器和客户端时间不一致
- Cache-Control http1.1 一个 max-age，服务器 http 版本决定，1.1 优先用这个

### 协商缓存： 304

- Last-Midified ：If-Modified-Since 上次修改的时间点，某个文件在 1 秒内频繁更改了多次，根据 Last-Modified 的时间(单位是秒)是判断不出来的，这个判断不出来，推荐 etag
- ETag : If-None-Match nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成
  ETag 改变文件不一定变，因为 Last-Modified 基于文件 mtime 生成，mtime 可能修改后文件内容没变，但 mtime 也变了

### 启发式缓存阶段，浏览器用来确定缓存过期时间的字段一个都没有时

- Date + Last-Modified 时间差值，取其值的 10%作为缓存时间周期
  - Date 是创建报文的日期

### 其他：

响应中的 Age 是资源在缓存代理中存贮的时长，最大时是 max-age
Cache-Control 中的 no-cache 和 no-store 区别

- no-cache 意思是可以缓存，但每次用应该去想服务器验证缓存是否可用
- no-store 不缓存请求或响应的任何内容

atime access time 访问时间 文件中的数据库最后被访问的时间
mtime modify time 修改时间 文件内容被修改的最后时间
ctime change time 变化时间 文件的元数据发生变化。比如权限，所有者等

#### vary（多样化） 内容协商

1. 有时候，同一个 URL 可以提供多份不同的文档，可能在客户端服务端之间存在缓存服务器之类的中间实体，导致返回不正确
   - 如果服务端提供的内容取决于 User-Agent 这样「常规 Accept 协商字段之外」的请求头字段，那么响应头中必须包含 Vary 字段，且 Vary 的内容必须包含 User-Agent
   - Vary 字段用于列出一个响应字段列表，告诉缓存服务器遇到同一个 URL 对应着不同版本文档的情况时，如何缓存和筛选合适的版本
2. 有 BUG 的缓存服务，会忽略响应头中的 Content-Encoding，从而可能给不支持压缩的客户端返回缓存的压缩版本
   1. 将响应头中的 Cache-Control 字段设为 private，告诉中间实体不要缓存它；
   2. 推荐增加 Vary: Accept-Encoding 响应头，明确告知缓存服务器按照 Accept-Encoding 字段的内容，分别缓存不同的版本；
