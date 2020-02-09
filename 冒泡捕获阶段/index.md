## 冒泡和补货
 在页面中点击一个元素，事件是从这个元素的祖先元素中逐层传递下来的，这个阶段为事件的捕获阶段。
 当事件传递到这个元素之后，又会把事件逐成传递回去，直到根元素为止，这个阶段是事件的冒泡阶段。

## useCapture
 element.addEventListener(event, function, useCapture)
 true - 事件句柄在捕获阶段执行
 false- false- 默认。事件句柄在冒泡阶段执行，默认为false

## event.target event.currentTarget
 event.target指向引起触发事件的元素，
 event.currentTarget则是事件绑定的元素，
 只有被点击的那个目标元素的event.target才会等于event.currentTarget。