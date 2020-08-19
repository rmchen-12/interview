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

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let sum = 0;
  for (let index = 1; index < height.length - 1; index++) {
    let leftMax = 0; //找左边最大高度
    for (let i = index - 1; i >= 0; i--) {
      leftMax = height[i] >= leftMax ? height[i] : leftMax;
    }
    let rightMax = 0; //找右边最大高度
    for (let i = index + 1; i < height.length; i++) {
      rightMax = height[i] >= rightMax ? height[i] : rightMax;
    }
    let min = Math.min(leftMax, rightMax); //得到左右两边最大高度中较矮的那个高度
    if (min > height[index]) {
      sum = sum + min - height[index]; //接水量 = 左右两边最大高度中较矮的那个高度 - 当前项的高度
    }
    //console.log(leftMax, rightMax, sum)
  }
  return sum;
};
