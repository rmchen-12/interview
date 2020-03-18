```c++
渲染进程专⻔有一个IO线程用来接收其他进程传进来的消息，放到任务队列里
//任务队列
class TaskQueue{
    public:
    Task takeTask(); //取出队列头部的一个任务
    void pushTask(Task task); //添加一个任务到队列尾部 
};
//主线程(Main Thread) 
TaskQueue task_queue; 
void ProcessTask(); 
bool keep_running = true;
void MainThread(){
    for(;;){
        Task task = task_queue.takeTask(); 
        ProcessTask(task);
        if(!keep_running) //如果设置了退出标志，那么直接退出线程循环
            break;
    } 
}
```
1. 事件循环
2. 消息队列

### 使用单线程的缺点：
1. 如何处理高优先级的任务 - 引入微任务
2. 如何解决单个任务执行时⻓过久的问题 - 通过回调处理

### 宏任务
- 渲染事件(如解析DOM、计算布局、绘制); 
- 用戶交互事件(如鼠标点击、滚动⻚面、放大缩小等); 
- JavaScript脚本执行事件; 
- 网络请求完成、文件读写完成事件。

### 微任务
- MutationObserver
- Promise
在全局执行上下文里创建一个微任务队列，存放当前宏任务中产生的微任务，当前宏任务中的JavaScript快执行完成时，也就在JavaScript引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务，产生的新的微任务也是继续放在当前队列中继续执行

MutationObserver是取代原来的MutationEvent的`同步轮询`模式，用了`异步微任务`模式解决性能和实时性的问题


