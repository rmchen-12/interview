### 强缓存阶段： 200 (from disk cache)或是200 OK (from memory cache) ，由浏览器内存占用率决定
 - Expires http1.0 ,一个时间点，可能服务器和客户端时间不一致
 - Cache-Control http1.1 一个max-age，服务器http版本决定，1.1优先用这个
### 协商缓存： 304
 - Last-Midified ：If-Modified-Since 上次修改的时间点，某个文件在1秒内频繁更改了多次，根据Last-Modified的时间(单位是秒)是判断不出来的，这个判断不出来，推荐etag
 - ETag : If-None-Match nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成
          ETag改变文件不一定变，因为Last-Modified基于文件mtime生成，mtime可能修改后文件内容没变，但mtime也变了
### 启发式缓存阶段，浏览器用来确定缓存过期时间的字段一个都没有时
 - Date + Last-Modified 时间差值，取其值的10%作为缓存时间周期
   - Date 是创建报文的日期

### 其他：
响应中的Age是资源在缓存代理中存贮的时长，最大时是max-age
Cache-Control中的no-cache和no-store区别
- no-cache 意思是可以缓存，但每次用应该去想服务器验证缓存是否可用
- no-store 不缓存请求或响应的任何内容

atime	access time	访问时间	文件中的数据库最后被访问的时间
mtime	modify time	修改时间	文件内容被修改的最后时间
ctime	change time	变化时间	文件的元数据发生变化。比如权限，所有者等