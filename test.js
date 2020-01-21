setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function() {
    console.log('promise1');
  });
}, 0);
setTimeout(() => {
  console.log('timer2');
  Promise.resolve().then(function() {
    console.log('promise2');
  });
}, 0);

// node 10下
// timer1 timer2 promise1 promise2

// node 11以上
// timer1 promise1 timer2 promise2
