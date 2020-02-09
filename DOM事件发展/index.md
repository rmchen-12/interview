# 发展
    - DOM0 混沌时期，各家浏览器自己一套规则
    - DOM1 W3C结合大家的优点推出了一个标准化的DOM
        - DOM Core 规定了基于XML的文档结构标准，通过这个标准简化了对文档中任意部分的访问和操作。
        - DOM HTML 在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法
    - DOM2
        - DOM视图（DOM Views）：定义了跟踪不同文档视图的接口
        - DOM事件（DOM Events）：定义了事件和事件处理的接口
        - DOM样式（DOM Style）：定义了基于CSS为元素应用样式的接口
        - DOM遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口
    - DOM3
        - DOM加载和保存模块（DOM Load and Save）：引入了以统一方式加载和保存文档的方法
        - DOM验证模块（DOM Validation）：定义了验证文档的方法
        - DOM核心的扩展（DOM Style）：支持XML 1.0规范，涉及XML Infoset、XPath和XML Base

# 事件的处理
## 0级DOM
    原始事件模型（0级DOM事件模型处理没有capturing阶段）
    只能作为属性添加，这样，当监听多个事件的时候会被覆盖
    
    ```
    // 一开始浏览器处理事件的时候只有原始事件模型，事件处理程序被设置为js代码串作为html的性质值
    <input id="myButton" type="button" value="Press Me" onclick="alert('thanks');">

    // 在js中html元素都有一个对应的对象，这个对象的属性对应那个html元素的性质，所以可以用js代码添加事件监听函数
    document.getElementById("myButton").onclick = function () {
        alert('thanks');
        console.log(this) // 这里的this值得就是目标元素对象
    }
    ```

## 2级DOM
    2级DOM事件模型，类似eventBus，可监听多个，不会被覆盖，可以用stopImmediatePropagation（DOM3）禁止向下传递
    分三个阶段触发
    - 在capturing阶段，事件从Document对象沿着文档树向下传播给节点。如果目标的任何一个祖先专门注册了事件监听函数，那么在事件传播的过程中就会运行这些函数。
    - 阶段发生在目标节点自身，直接注册在目标上的适合的事件监听函数将运行。
    - 阶段是bubbling阶段，这个阶段事件将从目标元素向上传播回Document对象（与capturing相反的阶段）。虽然所有事件都受capturing阶段的支配，但并不是所有类型的事件都bubbling。（0级DOM事件模型处理没有capturing阶段）

    ```
     var p = document.getElementById('p'); 
     p.addEventListener("click",function(){
         // cancelBubble: 布尔值，设为true同调用stopPropagation()
         // returnValue: 布尔值，设为false同调用preventDefault()
         console.log(arguments[0]);  // event对象
         console.log(event.currentTarget) // this === e.currentTarget
     })
    ```

## 事件绑定还有一种
// 创建事件
var event = document.createEvent('Event');

// 定义事件名为'build'.
event.initEvent('build', true, true);

// 监听事件
elem.addEventListener('build', function (e) {
  // e.target matches elem
}, false);

// 触发对象可以是任何元素或其他事件目标
elem.dispatchEvent(event);




