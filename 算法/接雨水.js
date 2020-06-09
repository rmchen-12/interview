var trap = function (height) {
  let l = 0,
    r = 1,
    len = height.length,
    sum = 0,
    tempSum = 0;

  while (r <= len) {
    if (height[r] < height[l]) {
      const a = height[l] - height[r];
      tempSum += a;
    }
    if (height[r] >= height[l]) {
      sum = sum + tempSum;
      tempSum = 0;
      l = r;
    }
    r++;
  }

  return sum;
};

var trap1 = function (height) {
  let sum = 0,
    stack = [],
    len = height.length,
    index = 1;

  while (index < len) {
    if (height[index] < height[index - 1]) {
      stack.push(height[index]);
    } else if (height[index] > height[index - 1] && stack.length > 0) {
      sum += stack[0] - stack[stack.length - 1];
      console.log(stack);
      stack.pop();
    }
    index++;
  }

  return sum;
};

console.log(trap1([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
