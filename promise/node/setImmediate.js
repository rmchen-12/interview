const fs = require('fs');

fs.readFile('./demo.js', function() {
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B() {
      console.log(2);
    });
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);

  process.nextTick(function a() {
    console.log('nextTick');
  });
});


// 如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行

// 多个setImmediate则需要多次loop才能执行完,加到下一轮循环check阶段执行
