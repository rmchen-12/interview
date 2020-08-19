// 两数之和
var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complete = target - nums[i];
    if (map.has(nums[i])) {
      return [i, map.get(nums[i])];
    }
    map.set(complete, i);
  }
};

// 最长回文字符串
var longestPalindrome = function (s) {
  if (s == null || s.length < 1) return '';
  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    const len1 = expandCenter(s, i, i);
    const len2 = expandCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = Math.round(i - (len - 1) / 2);
      end = i + len / 2;
      console.log(start, end);
    }
  }
  return s.slice(start, end + 1);
};

function expandCenter(s, left, right) {
  let L = left,
    R = right;
  while (L >= 0 && R < s.length && s.charAt(L) === s.charAt(R)) {
    L--;
    R++;
  }
  return R - L - 1;
}

console.log(longestPalindrome('cbbd'));

var threeSum = function (nums) {
  let res = [];
  nums = nums.sort();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) continue;
    let L = i + 1,
      R = nums.length - 1;
    while (L < R) {
      let sum = nums[L] + nums[R] + nums[i];
      if (sum === 0) {
        res.push([nums[L], nums[i], nums[R]]);
        while (L < R && nums[L] === nums[L + 1]) L++; // 去重
        while (L < R && nums[R] === nums[R - 1]) R--; // 去重
        L++;
        R--;
      }

      if (sum > 0) {
        R--;
      }
      if (sum < 0) {
        L++;
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
