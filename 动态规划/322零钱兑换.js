/**
 *  思路：动态规划
 *  硬币 [x1,x2,x3]
 *  首先初始状态 dp[x1] = 1, dp[x2] = 1, dp[x3] = 1
 *  状态转移方程：
 *  dp[n] = min(dp[n-x1],dp[n-x2],dp[n-x3]) + 1
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount === 0) return 0;
  const dp = [0]; // 0是不用的，dp[i]表示需要多少个硬币换i元
  for (let i = 1; i <= amount; i++) {
    dp[i] = amount + 1; // 初始化特别大
    for (let j = 0, len = coins.length; j < len; j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};

coinChange([2], 3);
