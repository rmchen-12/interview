### 动态规划
在于找到状态转移方程和最优子结构

#### 如何列出正确的状态转移方程 以找硬币为例子，1，2，5面额总数11的最少硬币数
1. 先确定「状态」，也就是原问题和子问题中变化的变量。（由于硬币数量无限，所以唯一的状态就是目标金额 amount。）
2. 然后确定 dp 函数的定义。 （当前的目标金额是 n，至少需要 dp(n) 个硬币凑出该金额）
3. 然后确定「选择」并择优，也就是对于每个状态，可以做出什么选择改变当前状态。 （无论当的目标金额是多少，选择就是从面额列表 coins 中选择一个硬币，然后目标金额就会减少）
4. 最后明确 base case。（显然目标金额为 0 时，所需硬币数量为 0；当目标金额小于 0 时，无解，返回 -1）

#### 框架
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 择优(选择1，选择2...)

```javascript
function(coins, amount){
    // 数组大小为 amount + 1，初始值也为 amount + 1
    let dp = new Array(amount + 1).fill(amount + 1)
     // base case
    dp[0] = 0;
    for(let i = 0; i < amount; i++){
        // 内层 for 在求所有子问题 + 1 的最小值
        for(let coin of coins){
            // 子问题无解，跳过
            if (i < coin) continue;
            dp[i] = Math.min(dp[i], 1 + dp[i - coin])
        }
    }
    return (dp[amount] === amount + 1) ? -1 : dp[amount];
}
```