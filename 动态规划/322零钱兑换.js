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

/** 思路：贪心回溯 + dfs https://leetcode-cn.com/problems/coin-change/solution/322-by-ikaruga/ */
var change = (coins, amount, coinIndex, count, ans) => {
  if (amount === 0) { // 符合条件
    ans[0] = Math.min(ans[0], count);
    return;
  }
  if (coinIndex == coins.length) return;
  // 计算最大能投几个
  let t = Math.floor(amount / coins[coinIndex]);
  // k + count < ans[0]: 如果此时的硬币数就已经大于ans了，那么接下来的比较都是多余的
  for (let k = t; k >= 0 && k + count < ans[0]; k--) {
    change(coins, amount - k * coins[coinIndex], coinIndex + 1, count + k, ans);
  }
};

var coinChange2 = function (coins, amount) {
  if (!amount) return 0;
  coins.sort((a, b) => b - a);
  let ans = [Number.MAX_SAFE_INTEGER];
  change(coins, amount, 0, 0, ans);
  return ans[0] == Number.MAX_SAFE_INTEGER ? -1 : ans[0];
};

coinChange([2], 3);
const a = coinChange2([1,2,3,4,5,6,7,8,9,10,12,3131,12312,4234454,6452],42344541244)
console.log(a)
