function* foo() {
  let response1 = yield fetch('https://www.geekbang.org');
  console.log('response1');
  console.log(response1);
  let response2 = yield fetch('https://www.geekbang.org/test');
  console.log('response2');
  console.log(response2);
}
//执行foo函数的代码
let gen = foo();
function getGenPromise(gen) {
  return gen.next().value;
}
getGenPromise(gen)
  .then(response => {
    console.log('response1');
    console.log(response);
    return getGenPromise(gen);
  })
  .then(response => {
    console.log('response2');
    console.log(response);
  });
