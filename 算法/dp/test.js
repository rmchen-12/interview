/**
 * 最长递增子序列
 * 输入： [10,9,2,3,4,5,1,2,5]
 * 输出： 4
 * 子序列是： [2,3,4,5]
 */

// 动态规划解法 时间复杂度为n^2
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return dp.sort()[0];
}

// 二分 时间服务度为nlgn

