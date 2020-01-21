process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B() {
    console.log(2);
  });
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0);
// 1
// 2
// TIMEOUT FIRED

// nextTick总是在当前"执行栈"的尾部触发
// 多个process.nextTick语句总是在当前"执行栈"一次执行完
