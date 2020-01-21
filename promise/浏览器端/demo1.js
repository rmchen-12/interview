async function foo() {
  console.log('foo');
}
async function bar() {
  console.log('bar start');
  await foo();
  console.log('bar end');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
bar();
new Promise(function(resolve) {
  console.log('promise executor');
  resolve();
}).then(function() {
  console.log('promise then');
});
console.log('script end');
