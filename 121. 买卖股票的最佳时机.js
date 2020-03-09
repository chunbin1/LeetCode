// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
// 思路：从左往右遍历 记录最小值  出现最小值 重新设置最小值  如果第i个减最小值 大于profit 则重新设置

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0
  }
  let profit = 0
  let min = 0 // min指针
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] < prices[min]) {
      min = i + 1
    } else if (prices[i + 1] - prices[min] > profit) {
      profit = prices[i + 1] - prices[min]
    }
  }
  return profit
};