var removeDuplicates = function (S) {
  let stack = [];
  for (c of S) {
    let prev = stack.pop();
    if (prev !== c) {
      stack.push(prev);
      stack.push(c);
    }
  }
  return stack.join('');
};

removeDuplicates('abbaca');
