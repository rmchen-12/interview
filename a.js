const asd = (str) => {
  let ans = 0;
  let first = 0;
  let end = 0;
  let len = str.length;
  let set = new Set();

  while (first < len && end < len) {
    if (!set.has(str[end])) {
      set.add(str[end++]);
      ans = Math.max(end - first, ans);
    } else {
      set.delete(str[first++]);
    }
  }

  return ans;
};

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
const a = (str) => {
  let start = 0,
    end = 0;

  for (let index = 0; index < str.length; index++) {
    var len1 = expendCenter(str, i, i);
    var len2 = expendCenter(str, i, i + 1);
    var len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - (len - 1) / 2;
      end = i + len / 2;
    }
  }

  return s.slice(start, end);
};

const expendCenter = (str, i, i) => {
  let L = i,
    R = i;
  while (L > 0 && R < str.length && str[L] === str[R]) {
    L--;
    R++;
  }
  return R - L + 1;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let ans = 0,
    l = 0,
    r = height.length - 1;
  while (l < r) {
    ans = Math.max(maxArea, Math.min(height[l], height[r]) * (r - 1));
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
    return ans;
  }
};

// 输入: "()[]{}"
// 输出: true
const a = (str) => {
  let stack = [];
  let map = {
    '[': ']',
    '{': '}',
    '(': ')',
  };
  for (let index = 0; index < str.length; index++) {
    const stackLen = stack.length;
    if (map[stack[stackLen - 1]] === str[index]) {
      stack.pop();
    } else {
      stack.push(str[index]);
    }
  }

  return stack.length === 0;
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let i = 0;
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] !== val) {
      nums[i] = nums[index];
      i++;
    }
  }
  return i;
};

var search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + (right - left) / 2;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target >= nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
