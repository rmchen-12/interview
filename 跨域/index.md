协议，域名，端口都必须一致，地址ip也无效

- DOM层面，同源下可用opener访问，同源策略限制了来自不同源的JavaScript脚本对当前DOM对象读和写的操作
- 数据层面，同源策略限制了不同源的站点读取当前站点的Cookie、IndexDB、LocalStorage等数据
- 网络层面，同源策略限制了通过XMLHttpRequest等方式将站点的数据发送给不同源的站点

## document.domain + iframe 跨域
## window.name + iframe 跨域
## location.hash + iframe 跨域
## node代理跨域（服务器端请求是没有同源限制的，请求可以在此转发）
## nginx代理跨域
自定义本地的url请求规则 ，如 www.720ui.com/blog 则对应要nginx服务转发到 blog.720ui.com
```
server
{
    listen 80;
    server_name www.720ui.com;

    location ^~ /blog/ {
        proxy_pass http://blog.720ui.com/;
    }   
}
```

## window.postMessage
```
    // a.html
    window.onload = function() {  
        var ifr = document.getElementById('ifr');  
        var targetOrigin = "http://www.google.com";  
        ifr.contentWindow.postMessage('hello world!', targetOrigin);  
    };
    
    // b.html
    var onmessage = function (event) {  
    var data = event.data;//消息  
        var origin = event.origin;//消息来源地址  
        var source = event.source;//源Window对象  
        if(origin=="http://www.baidu.com"){  
           console.log(data);//hello world!  
        }  
    };  
    if (typeof window.addEventListener != 'undefined') {  
        window.addEventListener('message', onmessage, false);  
    } else if (typeof window.attachEvent != 'undefined') {  
        //for ie  
        window.attachEvent('onmessage', onmessage);  
    }
```

## JSONP跨域（页面资源允许跨域，暴露xss缺陷，导致服务端引入CSP来限制加载域名）
```
    <script type="text/javascript">
       function dosomething(jsondata){
          //处理获得的json数据
      }
    </script>
    <script src="http://example.com/data.php?callback=dosomething"></script>
    
    <?php
      $callback = $_GET['callback'];//得到回调函数名
      $data = array('a','b','c');//要返回的数据
      echo $callback.'('.json_encode($data).')';//返回js函数，将数据作为参数传递过去
    ?>
```
```
    function jsonp({ url, params, callback }) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        window[callback] =  (data) => {
          resolve(data);
          document.body.removeChild(script);
        }
        params = { ...params, callback }; 
        let arrs = [];
        for (let key in params) {
          arrs.push(`${key}=${params[key]}`);
        }
        script.src = `${url}?${arrs.join('&')}`;
        script.type="type/javascript";
        document.body.appendChild(script);
        script.onerror = () => {
          reject(new Error(`fetch ${url} failed`));
          document.body.removeChild(script);
        }
      });
    }
    jsonp({
      url: 'http://localhost:3001/',
      params: { test: 'test' },
      callback: 'show'
    }).then((data) => {
      console.log(data);
    }).catch((e) => { console.log(e) })
```
优点：
- 它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；
- 它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；
- 并且在请求完毕后可以通过调用callback的方式回传结果
缺点
- 它只支持GET请求而不支持POST等其它类型的HTTP请求；
- 它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

## CORS跨域
CORS（Cross-Origin Resource Sharing）跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。
两种请求
- 简单请求（HEAD、POST、GET，http头信息不超出一下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
  - 请求时自动加origin头
  - 如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
  - 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
    - Access-Control-Allow-Origin: http://api.bob.com (必须的，要么是一个域名，要么是*)
    - Access-Control-Allow-Credentials: true (表示是否允许发送Cookie。默认情况下，Cookie不包括在请求中;前端设置是否带cookie,xhr.withCredentials = true;Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名)
    - Access-Control-Expose-Headers: FooBar (默认只有Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，想拿其他字段就在这里添加)
    - Content-Type: text/html; charset=utf-8 
- 非简单请求
  - 预检，浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段
    - origin
    - Access-Control-Request-Method：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，如是PUT。
    - Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，如是X-Custom-Header
  - 服务器响应(如果服务器不通过就不会返回CORS相关字段，触发onError)
    - Access-Control-Allow-Origin
    - Access-Control-Allow-Methods: GET, POST, PUT (该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法)
    - Access-Control-Allow-Headers: X-Custom-Header (如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段)
    - Access-Control-Allow-Credentials: true (该字段与简单请求时的含义相同)
    - Access-Control-Max-Age: 1728000 (该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。)
  - 通过预检后，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
