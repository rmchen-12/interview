var a = ['a', 'b', 'c', 'd', 'e'];
const b = { a: 1, b: 3, c: () => 3 };

for (var val of a) {
  console.log(val);
}

for (const iterator of b) {
  console.log(iterator);
}
