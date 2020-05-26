/**
 *  思路：动态规划
 *  硬币 [x1,x2,x3]
 *  首先初始状态 dp[x1] = 1, dp[x2] = 1, dp[x3] = 1
 *  状态转移方程：
 *  dp[n] = min(dp[n-x1],dp[n-x2],dp[n-x3]) + 1
 */


// 击败百分之5js选手....
/**
* @param {number[]} coins
* @param {number} amount
* @return {number}
*/
var coinChange = function (coins, amount) {
  if (amount === 0) return 0
  const dp = {}
  coins.forEach((val) => {
    dp[val] = 1
  })
  let i = Math.min(...coins)
  for (; i <= amount; i++) {
    if (dp[i]) {
      continue
    } else {
      // dp[i] = Math.min()
      const tmpCoins = coins.map((val) => {
        return (dp[i - val] === -1 || dp[i - val] === undefined) ? Infinity : dp[i - val]
      }
      )
      const res = Math.min(...tmpCoins)
      dp[i] = res !== Infinity ? res + 1 : -1;
    }
  }
  return dp[amount] || -1
};

coinChange([2], 4)