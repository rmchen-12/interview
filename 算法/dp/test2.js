/**
 * 完全背包问题
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 
 * 示例:
 
输入: amount = 5, coins = [1, 2, 5]
输出: 4
解释: 有四种方式可以凑成总金额:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

 */

/**
 * 第一步要明确两点，「状态」和「选择」。
 *     状态有两个，就是「背包的容量」和「可选择的物品」，选择就是「装进背包」或者「不装进背包」
 * 第二步要明确 dp 数组的定义
 *     若只使用 coins 中的前 i 个硬币的面值，若想凑出金额 j，有 dp[i][j] 种凑法,base case 为 dp[0][..] = 0， dp[..][0] = 1
 * 第三步，根据「选择」，思考状态转移的逻辑。
 *
 */

function change(amount, coins) {
  const dp = new Array(coins.length + 1).fill(new Array(amount + 1).fill(1));

  for (let i = 1; i <= coins.length; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][amount];
}
